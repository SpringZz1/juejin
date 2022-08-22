---
highlight: atelier-lakeside-dark
theme: v-green
---

![drew-beamer-Vc1pJfvoQvY-unsplash.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d2eed9a70d448e5a94930bba29a9758~tplv-k3u1fbpfcp-watermark.image?)

现在Spring的开发已经逐渐从繁琐的xml配置进化到了简单的注解驱动，尤其在springboot中，底层大量的使用注解完成高级的功能，今天就来整理下spring提供的常用注解。便于记忆，我将其分成四个部分来整理：组件注册，生命周期，属性赋值，自动装配。

# 1.组件注册
## 1.1 `@Configuration` 搭配` @Bean` 注解
在spring早期开发中，我们都是用xml配置的方式来创建和管理bean,比如建一个applicationContext.xml配置文件：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--一个普通的bean-->
    <bean id="book" class="com.qiuguan.spring.bean.Book"/>
</beans>
```
然后通过 **ClassPathXmlApplicationContext** 容器就可以获取Book对象了
```java
public class Main {

    public static void main(String[] args) {

        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        Book bean = ctx.getBean(Book.class);
        System.out.println(bean);
    }
}
```
那么现在使用注解驱动开发，就不需要xml配置了，它是怎么做的呢？很简单，将**配置文件变成配置类**，**将bean标签变成 `@Bean`注解**,先简单看下
```java
@Configuration //等价于 applicationContext.xml配置文件
public class MainConfig {
    
    @Bean //等价于 <bean> 标签
    public Student student(){
        return new Student();
    }
}    
```
如何获取Student对象呢？
```
public class Main {

    public static void main(String[] args) {
        //注解版的IOC容器是  AnnotationConfigApplicationContext，构造器中传入的是配置类
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig.class);
        Student bean = ctx.getBean(Student.class);
        System.out.println("bean = " + bean);
        
    }
}
```

总结：**@Configuration**注解搭配 **@Bean**注解可以代替xml完成对象的注册和创建。
> 1. **@Bean**注解注册的bean默认的bean name是方法名，可以通过 **@Bean**注解的**name**属性给bean赋予新的name
> 2. **@Bean** 注解的 **initMethod** 属性可以实现对象的初始化操作
> 3. **@Bean** 注解标注的方法的参数都是从IOC容器中获取的


## 1.2 `@ComponetScan` 搭配` @Component` 注解
在使用xml开发的时候，我们也会配置包扫描路径，一般是这样配置：
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 配置包扫描路径 -->
    <context:component-scan base-package="com.qiuguan.spring"/>

    <bean id="book" class="com.qiuguan.spring.bean.Book"/>
</beans>
```
在注解开发中，将使用 `@ComponentScan` 注解代替<<context:component-scan>> 标签

```
@ComponentScan(basePackages = "com.qiuguan.spring")  //代替包扫描标签
@Configuration //等价于 applicationContext.xml配置文件
public class MainConfig {

    @Bean //等价于 <bean> 标签
    public Student student(){
        return new Student();
    }
}    
```
那么在`com.qiuguan.spring` 包下的标注了`@Component`注解的Person类将会纳入到Spring的IOC容器中。
> 注意：`@CompoentScan` 注解会扫描指定包路径下的 `@Component, @Controller, @Service, @Repository` 注解。

### 1.2.1 `@ComponentScan` 指定过滤规则
```
@ComponentScan(basePackages = "com.qiuguan.spring", //指定包扫描路径
               //指定排除规则，不用去扫描
               excludeFilters = {
                     @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Controller.class),
                     @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = HelloService.class)
               //如果想要"只"包含 includeFilters 的规则，需要 useDefaultFilters = false，禁用掉默认的规则
               }, includeFilters = {
                     @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = Person.class)
               }, useDefaultFilters = false
)
@Configuration //等价于 applicationContext.xml配置文件
public class MainConfig {

    //它不受@ComponentScan管理
    @Bean //等价于 <bean> 标签
    public Student student() {
        return new Student();
    }
}
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c13f248b74a4f8a800be534a250ffb0~tplv-k3u1fbpfcp-watermark.image?)

过滤规则说明：
* `FilterType#ANNOTATION`: 按照注解过滤
* `FilterType#ASSIGNABLE_TYPE`: 按照指令的类型过滤
* `FilterType#ASPECTJ`: 按照 AspectJ 规则过滤
* `FilterType#REGEX`: 按照正则过滤
* `FilterType#CUSTOM`: 按照自定义规则过滤

上面的栗子中，先通过 **excludeFilters** 属性指定在扫描的时候按照什么规则排除那些组件，其中包括了要排除 `@Controller`注解，以及我自定义的接口`HelloService`（它的所有实现类都将会排除)；<br>
同时还指定了 **includeFilters** 属性，用来指定扫描的时候需要包含哪些组件，意思是扫描包路径下的 Person类，注意：如果想要"只扫描" Person类，那么需要将 useDefaultFilters = false，不然默认是true, 将使用默认的过滤规则，除了Person类以外，其他符合的(比如`@Component`注解标注了)也将放入容器中。

### 1.2.2 自定义过滤规则
自定义过滤规则需要实现  `TypeFilter`接口
> 如果标注了自定义的`@MyComponent`注解，就返回true, 否则就返回false
```java
public class MyTypeFilter implements TypeFilter {

    /**
     *
     * @param metadataReader: 读取到的当前正在扫描的类的信息
     * @param metadataReaderFactory: 可以获取到其他任何类的信息
     */
    @Override
    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {

        //TODO:获取当前类的所有注解信息
        AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
        //TODO:获取当前类的基本信息，比如实现了哪个接口，修饰符是什么等等
        ClassMetadata classMetadata = metadataReader.getClassMetadata();
        //TODO:获取当前类的资源信息，比如类的磁盘位置
        Resource resource = metadataReader.getResource();

        //TODO:包含了自定义注解的MyComponent 就返回true, 否则就返回false
        return annotationMetadata.hasAnnotation(MyComponent.class.getName());
    }
}
```
使用自定义的过滤规则：
```java
@ComponentScan(basePackages = "com.qiuguan.spring", //指定包扫描路
               //如果想要"只"包含 includeFilters 的规则，需要 useDefaultFilters = false，禁用掉默认的规则
               includeFilters = {
                     @ComponentScan.Filter(type = FilterType.CUSTOM, classes = MyTypeFilter.class)
               }, useDefaultFilters = false
)
@Configuration //等价于 applicationContext.xml配置文件
public class MainConfig {

    //它不受@ComponentScan管理
    @Bean //等价于 <bean> 标签
    public Student student() {
        return new Student();
    }
}
```
那么在`com.qiuguan.spring` 包下的标注了`@MyComponent`注解的类将会纳入到Spring的IOC容器中.
> 我这里为了便于看打印结果，将 `useDefaultFilters = false`，使其只打印标注了`@MyComponent`注解的类


## 1.3 `@Import` 注解导入Bean
使用 `@Import` 注解可以给容器导入bean, bean name 默认是全类名。
```java
@Import({ Water.class, Sun.class})
@Configuration
public class MainConfig2 {

}
```
Water类 和 Sun 类：
```java
public class Water {
}

public class Sun {
}
```

测试：
```java
public class Main {

    public static void main(String[] args) {
        //注解版的IOC容器是  AnnotationConfigApplicationContext
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig2.class);
        for (String beanDefinitionName : ctx.getBeanDefinitionNames()) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }
    }
}

//输出
//beanDefinitionName = com.qiuguan.spring.bean.Water
//beanDefinitionName = com.qiuguan.spring.bean.Sun
```

### 1.3.1 `@Import` 注解搭配 `ImportSelect `接口
定义一个实现了 `org.springframework.context.annotation.ImportSelector` 接口的类：
```java
public class MyImportSelector implements ImportSelector {

    /**
     * @param importingClassMetadata: 当前标注了@Import注解的类上的全部注解信息
     * @return： 返回值就是导入容器中的组件，bean name 是全类名
     */
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{"com.qiuguan.spring.bean.Car", "com.qiuguan.spring.bean.Bus"};
    }
}
```

配置类：
```
@Import({ Water.class, Sun.class, MyImportSelector.class})
@Configuration
public class MainConfig2 {

}
```
> 这个注解在springboot中到处都是

### 1.3.1 `@Import` 注解搭配 `ImportBeanDefinitionRegistrar`接口
> 通过实现 `ImportBeanDefinitionRegistrar`接口，完成手动注册bean

定义一个实现 `ImportBeanDefinitionRegistrar`接口的类：
```java
public class MyImportBeanDefineRegister implements ImportBeanDefinitionRegistrar {

    /**
     * @param importingClassMetadata： 当前类的注解信息
     * @param registry：bean 的注册器
     */
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        BeanDefinition definition = new RootBeanDefinition(Room.class);
        definition.setScope(ConfigurableBeanFactory.SCOPE_SINGLETON);

        //TODO:给容器注册Room类
        registry.registerBeanDefinition("room", definition);
    }
}
```

配置类：
```java
@Import({ Water.class, Sun.class, MyImportSelector.class, MyImportBeanDefineRegister.class})
@Configuration
public class MainConfig2 {

}
```
<br> 

测试：
```java
public class MainApplication {

    public static void main(String[] args) {
        //注解版的IOC容器是  AnnotationConfigApplicationContext
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig2.class);
        for (String beanDefinitionName : ctx.getBeanDefinitionNames()) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }
    }
}
```

## 1.4 `@Conditional` 完成按条件注册
举例：假设只有当容器中包含了 Food类的定义信息，我才会去创建Table对象，否则就不创建。<br>

创建一个实现了` Condition `接口的类：
```java
public class MyCondition implements Condition {

    /**
     * @param context: 判断条件的上下文
     * @param metadata: 当前标注了@Conditional注解的类的上的全部注解信息
     * @return
     */
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        //TODO:如果IOC定义容器中有 food 这个bean, 就返回true, 表示匹配
        return context.getBeanFactory().containsBeanDefinition("food");
    }
}
```

配置类：
```java
@Configuration
public class MainConfig3 {

    @Bean
    public Food food(){
        return new Food();
    }

    /**
     * 当 @Conditional 为true, 才会将 Table 放入到IOC容器中，反之不会
     */
    @Conditional(value = MyCondition.class)
    @Bean
    public Table table(){
        return new Table();
    }
}
```
> 在SpringBoot中会大量使用该注解，并对该注解进行了拓展。比如 `@ConditionalOnBean`, `@ConditionalOnClass` 等等。


## 1.5 `FactoryBean` 注册组件
`FactoryBean`在Spring中最为典型的一个应用就是用来创建AOP的代理对象。熟悉AOP的肯定见到过 `ProxyFactoryBean`, 或者用过mybatis的肯定知道 `SqlSessionFactoryBean`, 我们这里不探究他的底层工作原理，就看如何给容器注册一个工厂Bean.<br>

定义一个实现了 `FactoryBean` 接口的类：
```java
/**
 * @author qiuguan
 * @date 2022/08/15 23:09:06  星期一
 */
public class MyFactoryBean implements FactoryBean<Door> {

    /**
     * 返回一个泛型对象，这个对象将交给spring的 IOC 容器管理
     */
    @Override
    public Door getObject() throws Exception {
        return new Door();
    }

    @Override
    public Class<?> getObjectType() {
        return Door.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

配置类：
```java
@Configuration
public class MainConfig {
    
    @Bean
    public MyFactoryBean myFactoryBean(){
        return new MyFactoryBean();
    }
}
```

运行容器：
```java
public class Main {

    public static void main(String[] args) {

        ApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig.class);
        for (String beanDefinitionName : ctx.getBeanDefinitionNames()) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }

        //TODO: myFactoryBean 是容器中bean的名字
        Object myFactoryBean = ctx.getBean("myFactoryBean");
        //TODO: 类型是：class com.qiuguan.spring.bean.Door 
        //TODO: [getObject()方法返回的对象]
        System.out.println("myFactoryBean = " + myFactoryBean.getClass());

        Object o1 = ctx.getBean("myFactoryBean");
        Object o2 = ctx.getBean("myFactoryBean");
        System.out.println(o1 == o2);
    }
}
```
不难发现，我在配置类中通过`@Bean`注解注册的是 `MyFactoryBean` 对象(bean name 默认是方法名), 但是当我通过bean name 从IOC容器中获取对象时，它实际上返回的是 `MyFactoryBean.getObject()`方法返回的对象，也就是泛型对象。

如果我就想从IOC容器中拿到工厂对象，要怎么办呢？也很简单,只需要添加 **&** 前缀即可。
> `BeanFactory#FACTORY_BEAN_PREFIX`

```java
public class Main {

    public static void main(String[] args) {

        ApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig.class);
        for (String beanDefinitionName : ctx.getBeanDefinitionNames()) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }

        //TODO: myFactoryBean 是容器中bean的名字，添加 & 前缀
        Object myFactoryBean = ctx.getBean("&myFactoryBean");
        //TODO: 类型是：class com.qiuguan.spring.factory.MyFactoryBean 【工厂对象】
        System.out.println("myFactoryBean = " + myFactoryBean.getClass());
    }
}
```


# 2.生命周期
## 2.1 `@Bean` 注解指定初始化和销毁方法
我们还可以为某个bean 指定初始化方法(init)和销毁方法(destroy)；在Spring创建完实例，完成属性赋值后，将会调用`初始化方法`，当容器关闭时，调用`销毁方法`。<br>

以前使用xml配置的时候，如果配置初始化和销毁方法一般是这样配置：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <bean id="pig" class="com.qiuguan.spring.bean.Pig" init-method="init" destroy-method="destroy"/>
</beans>
```
现在我们不使用xml配置，而是使用 `@Bean`注解，同样的，初始化和销毁属性也都位于 `@Bean`注解内。

测试类：
```java
public class Bird {

    public Bird(){
        System.out.println("周命周期: Bird 构造器");
    }

    public void init(){
        System.out.println("生命周期：Bird init");
    }

    public void destroy(){
        System.out.println("生命周期：Bird destroy");
    }
}
```

配置类：
```java
//@ImportResource("classpath:applicationContext.xml")
@Configuration
public class MainConfig4 {

    @Bean(initMethod = "init", destroyMethod = "destroy")
    public Bird bird(){
        return new Bird();
    }
}
```

运行容器：
```java
public class Main4 {

    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig4.class);

        //销毁时调用 destroy 方法
        ctx.close();
    }
}

输出结果：
周命周期: Bird 构造器
生命周期：Bird init
生命周期：Bird destroy
```


> 如果 `Bird`的作用域是`@Scope("prototype")`, 那么容器启动时不会创建对象，只有当获取的时候才会创建对象并调用初始化方法，而且Spring不会管理`@Scope("prototype")`的bean, 所以容器关闭时，不会执行 destroy 方法。


## 2.2 实现 `InitializingBean` 和 `DisposableBean` 接口完成初始化和销毁
测试类：
```java
/**
 * @author qiuguan
 * 实现 InitializingBean 接口完成初始化
 * 实现 DisposableBean 接口完成销毁
 */
public class Bird implements InitializingBean, DisposableBean {

    public Bird(){
        System.out.println("周命周期: Bird 构造器");
    }

    @Override
    public void destroy(){
        System.out.println("生命周期：Bird DisposableBean destroy");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("生命周期：Bird InitializingBean init");
    }
}
```

配置类：
```java
//@ImportResource("classpath:applicationContext.xml")
@Configuration
public class MainConfig4 {

    @Bean
    public Bird bird(){
        return new Bird();
    }
}
```

运行容器：
```java
public class Main4 {

    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig4.class);
        
        //销毁时调用 destroy 方法
        ctx.close();
    }
}

输出结果：
周命周期: Bird 构造器
生命周期：Bird InitializingBean init
生命周期：Bird DisposableBean destroy
```

## 2.3 使用 `@PostConstruct` 和 `@PreDestroy`注解完成初始化和销毁
测试类：
```java
public class Bird {

    public Bird(){
        System.out.println("周命周期: Bird 构造器");
    }

    /**
     * 销毁注解
     */
    @PreDestroy
    public void destroy(){
        System.out.println("生命周期：Bird @PreDestroy destroy");
    }

    /**
     * 初始化注解
     */
    @PostConstruct
    public void init() {
        System.out.println("生命周期：Bird  @PostConstruct init");
    }
}
```

配置类：
```java
//@ImportResource("classpath:applicationContext.xml")
@Configuration
public class MainConfig4 {

    @Bean
    public Bird bird(){
        return new Bird();
    }
}
```

运行容器：
```
public class Main4 {

    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig4.class);

        //销毁时调用 destroy 方法
        ctx.close();
    }
}

输出结果：
周命周期: Bird 构造器
生命周期：Bird  @PostConstruct init
生命周期：Bird @PreDestroy destroy
```

# 3.属性赋值
在使用xml进行开发时，如果需要给某个属性赋一个值，我们可以采用这种方式进行配置：
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 将属性文件导入进来 -->
    <context:property-placeholder location="teacher.properties"/>
    
    <bean id="teacher" class="com.qiuguan.spring.bean.Teacher">
        <property name="name" value="lisi"/>
        <property name="age" value="#{34 - 5}"/>
        <!-- 从环境变量中取值 -->
        <property name="male" value="${teacher.male}"/>
    </bean>

</beans>
```

在注解驱动开发中，可以使用 `@Value` 注解完成属性的赋值。

属性文件：`teacher.properties`

```
teacher.workDate=2022-08-16
teacher.whatTeach=physical
```

测试类：
```
public class Teacher {

    //TODO:直接赋值,"false", "34"
    @Value("张三")
    private String name;

    //TODO:可以写SPEL表达式
    @Value("#{30 - 5}")
    private int age;

    @Value("#{T(Math).random()}")
    private double salary;

    //TODO: $ 表示从环境变量中取值
    @Value("${teacher.workDate}")
    private String workDate;

    //TODO:如果环境变量中没有该配置，则给一个默认值
    @Value("${teacher.whatTeach:english}")
    private String whatTeach;
    
    //TODO: toString()方法略，因为@Value是通过反射进行赋值的，客户忽略set方法

}
```

`@Value("${..}")` 表示从`环境变量`中取值，在xml中是使用`<context:property-placeholder>` 标签将属性文件加载到环境变量中，而注解驱动是通过 `@PropertySource` 注解，将属性文件导入到环境变量中。

配置类：
```
//TODO:将配置文件导入到环境变量中
@PropertySource("classpath:teacher.properties")
@Configuration
public class MainConfig5 {

    @Bean
    public Teacher teacher(){
        return new Teacher();
    }
}
```

运行容器：
```java
public class Main5 {

    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig5.class);

        Teacher bean = ctx.getBean(Teacher.class);
        System.out.println("bean = " + bean);
    }
}

//bean = Teacher{name='白洁', age=25, salary=0.7872463163047259, workDate='2022-08-16', whatTeach='physical'}
//如果 teacher.properties 文件中不配置 teacher.whatTeach，则打印默认值 english
```

# 4.依赖注入
## 4.1 `@Autowired` 按类型注入
> `@Autowired` 默认是按照类型进行装配，如果类型有多个，则按照名字就行装配。

使用过spring的同学肯定都是用过自动装配注解 `@Autowired`，从而完成一个bean 注入到另一个bean中。

先简单看下：
```java
//service
@Service
public class HelloService {
}


//controller
@Controller
public class HelloController {

    @Autowired
    private HelloService helloService;

    public void autowireTest(){
        System.out.println("helloService: " + helloService);
    }
}
```

运行容器：
```java
public class Main6 {

    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig6.class);

        HelloController helloController = ctx.getBean(HelloController.class);
        helloController.autowireTest(); //1

        HelloService helloService = ctx.getBean(HelloService.class);
        System.out.println("helloService = " + helloService); //2
    }
}
```
> 运行容器后，发现1,2两处的内存地址是一样的，所以 `@Autowired` 注解确实导入了。

我们知道，`@Autowired`装配的时候默认是按照`类型进行装配`，如果有多个该如何进行装配呢？<br>

定义一个接口，两个实现类：
```
//定义一个接口
public interface OrderService {

}

//实现类1
@Service
public class OrderServiceImpl implements OrderService {

    @Override
    public String toString() {
        String number = "1号";
        return "OrderServiceImpl{" +
                "number='" + number + ''' +
                '}';
    }
}

//实现类2
@Service
public class OrderServiceImpl2 implements OrderService {

    @Override
    public String toString() {
        String number = "2号";
        return "OrderServiceImpl2{" +
                "number='" + number + ''' +
                '}';
    }
}
```

然后注入进来看下：
```
@Controller
public class HelloController {

    @Autowired
    private OrderService orderService;

    public void test(){
        System.out.println("orderService = " + orderService);
    }
}
```

配置类：
```
@ComponentScan(basePackages = {"com.qiuguan.spring.controller", "com.qiuguan.spring.service"})
@Configuration
public class MainConfig6 {

}
```

运行容器：
```
public class Main6 {

    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig6.class);

        HelloController helloController = ctx.getBean(HelloController.class);
        helloController.test();

    }
}
```

会发现报错：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f3a62d4dfc5442aa76c55b613093fe9~tplv-k3u1fbpfcp-watermark.image?)
意思是需要注入唯一的一个bean,但是却发现了2个匹配的，此时要怎么办？

我们知道 `@Autowired` 注解默认是`按照类型进行装配`的，如果发现有多个，它可以继续`按照名字去匹配`，找到了就注入进来。

所以 **第一种解决办法**：就是修改属性名，使其与bean Nmae 匹配。
```java
@Controller
public class HelloController {

    /**
     * 将 属性名orderService 改成 beanName, 也就是 orderServiceImpl 或者 orderServiceImpl2
     */
    @Autowired
    private OrderService orderServiceImpl;

    public void test(){
        System.out.println("orderService = " + orderServiceImpl);
    }
}
```

**第二种解决办法**：搭配 `@Qualifier`注解
```
@Controller
public class HelloController {

    //TODO:指定某个bean的名字
    @Qualifier("orderServiceImpl2")
    @Autowired
    private OrderService orderService;

    public void test(){
        System.out.println("orderService = " + orderService);
    }
}
```

**第三种解决办法**：搭配 `@Primary` 注解
> 在某个类上标注 `@Primary`注解，那么在有多个的时候，会优先注入标注了该注解的bean

```
//TODO:标注优先级高的注解
@Primary
@Service
public class OrderServiceImpl2 implements OrderService {

    @Override
    public String toString() {
        String number = "2号";
        return "OrderServiceImpl2{" +
                "number='" + number + ''' +
                '}';
    }
}
```
> 注意：如果同时标注了`@Qualifier`注解和 `@Primary` 注解，那么优先以`@Qualifier` 注解为准, 如果找不到`@Qualifier` 注解标注的bean，则直接报错。


**第四种解决办法**： 搭配 `@Priority`注解
> `javax.annotation.Priority` 注解和 `@Primary` 注解的用法是一样的，用来指定一个优先级，值越小，优先级越高，越优先匹配进行注入。

```java
@Priority(0) //值越小，优先级越高
@Service
public class OrderServiceImpl implements OrderService {

    @Override
    public String toString() {
        String number = "1号";
        return "OrderServiceImpl{" +
                "number='" + number + ''' +
                '}';
    }
}
```


注意：`@Autowired` 默认是必须找到某个bean进而完成注入，如果找不到，则将抛出异常，如果在找不到的情况下不抛出异常，只需要将 `@Autowired` 注解的 `required=false` 即可。


问题：如何一次性将多个实现类全部注入进来？比如上面的 `OrderService` 有两个实现类，如何将这两个实现类同时注入进来？
> 其实也很简单，只需要用 `Map`, `Collection`, `数组` 去接收就可以了。

演示：
```
@Controller
public class HelloController {

    @Qualifier("orderServiceImpl2")
    @Autowired
    private OrderService orderService;

    @Autowired
    private Map<String, OrderService> orderServiceMap;

    /**
     * Collection的实现类也可以，比如 List, Set
     */
    @Autowired
    private Collection<OrderService> orderServiceCollection;

    @Autowired
    private OrderService[] orderServices;

    public void test(){
        System.out.println("orderService = " + orderService);
        System.out.println("orderServiceMap = " + orderServiceMap);
        System.out.println("orderServiceCollection = " + orderServiceCollection);
        System.out.println("orderServices = " + Arrays.asList(orderServices));
    }
}
```
> 题外：`@Autowried` 注解可以标注在类，方法，属性，参数位置上，阿里巴巴开发手册建议我们标注在构造器上，如果标注在构造器上，那么构造器中的参数必须是IOC容器中的对象，而且如果只有一个有参构造器，那么构造器上的 @Autowired 注解可以省略。

## 4.2 `@Resource` 按名称注入
> `javax.annotation.Resource` 注解是JSR250提供的注解。<br>
> `javax.annotation.Resource` 注解有两个重要的属性，`name` 和 `type`.<br>
> 
1. 如果指定了name,type，则从Spring容器中找一个名称和类型相当应的一个bean，找不到则报错。<br>
2. 如果只指定了name，则从Spring容器中找一个名称和name一样的bean，找不到则报错。<br>
3. 如果只指定了type，则从Spring容器中找一个类型和type一样的bean，找不到或者找到多个则报错。
4. 如果没有指定参数，则默认找字段名称装配，找不到则按类型装配，找不到则报错。


继续使用上面的代码进行演示：
```java
@Controller
public class HelloController {

    @Resource
    private OrderService orderService;

    public void test() {
        System.out.println("orderService = " + orderService);
    }
}
```
我们知道，`OrderService`有两个实现类，beanName分别是 `orderServiceImpl` 和 `orderServiceImpl2`, 在上面的代码中，Spring 将按照类型找到2个实现类，但是由于没有与之匹配的beanName,所以无法完成匹配，进而抛出错误。
> 注意：如果此时 `OrderService`的实现类中有标注`@Priority`注解或者`@Primary` 注解，则也可以继续完成装配。因为 `@Resource` 没有指定具体的beanName,所以它可以继续按照优先级检索。一旦`@Resource` 注解指定了具体的beanName,如果找到就装配，没有找到则抛出异常。

所以，上面代码中，改成这样就可以完成注入：
```
@Controller
public class HelloController {

    //TODO:指定特定的beanName完成注入，或者直接需改属性名为orderServiceImpl2
    @Resource(name = "orderServiceImpl2")
    private OrderService orderService;

    public void test() {
        System.out.println("orderService = " + orderService);
    }
}
```
> 既然是按照名字注入的，也可以直接修改属性名

同样的，`@Resource` 注解也可以完成多个bean的一次性注入：
```
@Controller
public class HelloController {

    @Resource(name = "orderServiceImpl2")
    private OrderService orderService;
    
    @Resource
    private Map<String, OrderService> orderServiceMap;

    /**
     * Collection的实现类也可以，比如 List, Set
     */
    @Resource
    private Collection<OrderService> orderServiceCollection;

    @Resource
    private OrderService[] orderServices;

    public void test(){
        System.out.println("orderService = " + orderService);
        System.out.println("orderServiceMap = " + orderServiceMap);
        System.out.println("orderServiceCollection = " + orderServiceCollection);
        System.out.println("orderServices = " + Arrays.asList(orderServices));
    }
}
```

## 4.3 `@Inject` 按照类型注入
> `javax.inject.Inject` 是JSR330提供的注解, 它完全就可以当做 `@Autowired` 注解来使用。
> 
使用时要导入依赖：
```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

使用 `@Inject` 注入：
```
@Controller
public class HelloController {

    //@Qualifier("orderServiceImpl")
    @Inject
    private OrderService orderService;

    public void test() {
        System.out.println("orderService = " + orderService);
    }
}
```

> 说明：`@Autowired` 是Spring原生提供的注解，`@Resource` 和 `@Inject `是Java规范提供的。

## 4.4 `@Profile` 按环境注册
> `@Profile` 指定组件在哪个环境下才会被注册到容器中，如果不指定则所有环境都可以注册。
> 
在开发中，我们一般有开发环境，有测试环境，有沙箱环境，有生产环境等等，他们连的数据库都不一样，那么如何在不改动任何代码的情况下，完成数据库与环境的切换呢？就可以使用 `@Profile` 注解标识不同的环境。

举个简单的例子：
假如有三个人，分别是小王，李四，王五，我给他们每个人一个标识，小王对应的标识是dev,李四对应的标识是test, 王五对应的标识是prod, 那么当我指定哪个标识，谁就注册到容器中。<br>
> 加了环境标识的bean,只要这个环境被激活当前bean才会被注册到容器中，默认的`profile`是 `default` 环境。

代码演示：
```
@Configuration
public class MainConfig7 {

    @Profile("dev")
    @Bean
    public XiaoWang xiaoWang(){
        return new XiaoWang();
    }

    @Profile("test")
    @Bean
    public Lisi lisi(){
        return new Lisi();
    }

    @Profile("prod")
    @Bean
    public WangWu wangWu(){
        return new WangWu();
    }

}
```

运行容器：
```java
public class Main7 {

    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MainConfig7.class);

        for (String beanDefinitionName : ctx.getBeanDefinitionNames()) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }
    }
}
```
由于 `XiaoWang`，`Lisi`，`WangWu` 都指定了 `Profile`, 所以此时容器中不会注册他们三个，因为没有与之匹配的 `Profile`.

那假如，我现在想让`XiaoWang`和 `WangWu` 注册到容器中，该怎么办呢？

**方法一**：使用虚拟机参数激活某个`Profile`

```js
-Dspring.profiles.active=dev,prod
```

**方法二**：代码激活某个`Profile`
```
public class Main7 {
    
    public static void main(String[] args) {
        //启动时会创建单实例bean, 进而会调用初始化方法
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
        ctx.getEnvironment().setActiveProfiles("dev", "prod");
        ctx.register(MainConfig7.class);
        ctx.refresh();

        for (String beanDefinitionName : ctx.getBeanDefinitionNames()) {
            System.out.println("beanDefinitionName = " + beanDefinitionName);
        }
    }
}
```

> 说明：@Profile 注解还可以标注在配置类上，如果标注在配置类上，则配置类被激活的时候，配置类里面的组件才会被注册到容器中。


# 5.总结
文章列举了spring的常用注解，其中 `@Import` 注解可以特别关注下，因为在SpringBoot中将会大量使用它。<br>

注册相关：
1. `@Configuration` 搭配 `@Bean`
2. `@ComponentScan` 搭配 `@Component(@Service, @Controller, @Repository)`
3. `@Import` 
4. `@Import` 搭配 `ImportSelector`
5. `@Import` 搭配 `ImportBeanDefinitionRegistrar`
6. `@Condition`

依赖注入相关：<br>

1. `@Autowired`
2. `@Resource`
3. `@Inject`

..................
