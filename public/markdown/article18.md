-   携手创作，共同成长！这是我参与「掘金日新计划 · 8 月更文挑战」的第15天.


</font>



![在这里插入图片描述](https://img-blog.csdnimg.cn/3a9c26893ecc4e3598ab83bf4de41439.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5oiR5piv5LiA5qO15Y235b-D6I-c,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


### 1、什么是游标（或光标）

虽然我们也可以通过筛选条件 WHERE 和 HAVING，或者是限定返回记录的关键字 LIMIT 返回一条记录，但是，却无法在结果集中像指针一样，向前定位一条记录、向后定位一条记录，或者是`随意定位到某一条记录`，并对记录的数据进行处理。

这个时候，就可以用到游标。游标，提供了一种灵活的操作方式，让我们能够对结果集中的每一条记录进行定位，并对指向的记录中的数据进行操作的数据结构。**游标让 SQL 这种面向集合的语言有了面向过程开发的能力。**

SQL 中，游标是一种临时的数据库对象，可以指向存储在数据库表中的数据行指针。这里游标`充当了指针的作用`，我们可以通过操作游标来对数据行进行操作`MySQL中游标可以在存储过程和函数中使用`

比如，我们查询了 employees 数据表中工资高于15000的员工都有哪些：

```sql
SELECT employee_id,last_name,salary FROM employees
WHERE salary > 15000;
```
![请添加图片描述](https://img-blog.csdnimg.cn/36a2034a0d3c4823b14b32c81fadff18.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5oiR5piv5LiA5qO15Y235b-D6I-c,size_10,color_FFFFFF,t_70,g_se,x_16)

这里我们就可以通过游标来操作数据行，如图所示此时游标所在的行是“108”的记录，我们也可以在结果集上滚动游标，指向结果集中的任意一行。

### 2、如何使用游标
游标必须在声明处理程序之前被声明，并且变量和条件还必须在声明游标或处理程序之前被声明。

 - **1、声明游标**
 
**语法格式：**
```sql
DECLARE 游标名 CURSOR FOR 查询语句; 
```
要使用 SELECT 语句来获取数据结果集，而此时还没有开始遍历数据，这里 查询语句代表的是 SELECT 语句，`返回一个用于创建游标的结果集`

**举例：**

```sql
DECLARE emp_cur CURSOR FOR 
SELECT employee_id,salary FROM employees;
```

 - **2、打开游标**

**语法格式：**

```sql
OPEN 游标名;
```

当我们定义好游标之后，如果想要使用游标，必须先打开游标。打开游标的时候 SELECT 语句的查询结果集就会送到游标工作区，为后面游标的`逐条读取`结果集中的记录做准备。

 - **3、使用游标**

**语法格式：**

```sql
FETCH 游标名 INTO var_name [, var_name] ...
```

这句的作用是使用 `游标名`这个游标来读取当前行，并且将数据保存到 var_name 这个变量中，游标指针指到下一行。如果游标读取的数据行有多个列名，则在 INTO 关键字后面赋值给多个变量名即可。

**注意：** var_name必须在声明游标之前就定义好。

**举例：**
```sql
FETCH　emp_cur INTO emp_id, emp_sal ;
```

**注意：** 游标的查询结果集中的字段数，必须跟 INTO 后面的变量数一致

 - **4、关闭游标**

**语法格式：**
```sql
CLOSE 游标名;
```

当我们使用完游标后需要关闭掉该游标。因为游标会`占用系统资源`，如果不及时关闭，**游标会一直保持到存储过程结束**，影响系统运行的效率。而关闭游标的操作，会释放游标占用的系统资源。

关闭游标之后，我们就不能再检索查询结果中的数据行，如果需要检索只能再次打开游标。

### 3、代码举例
```sql
#创建存储过程“get_count_by_limit_total_salary()”，
#声明IN参数 limit_total_salary，DOUBLE类型；声明OUT参数total_count，INT类型。
#函数的功能可以实现累加薪资最高的几个员工的薪资值，
#直到薪资总和达到limit_total_salary参数的值，返回累加的人数给total_count。

DELIMITER $
CREATE PROCEDURE get_count_by_limit_total_salary(IN limit_total_salary DOUBLE,OUT total_count INT)
BEGIN
	DECLARE count_emp INT DEFAULT 0;	#用来记录人数，默认值是0
	DECLARE sum_sal DOUBLE DEFAULT 0;	#记录总薪资
	DECLARE one_sal DOUBLE DEFAULT 0;	#记录一个人的薪资
	
	#声明游标，把查询到的工资结果集从高到低排序
	DECLARE emp_cur CURSOR FOR SELECT salary FROM employees ORDER BY salary DESC;
	
	OPEN emp_cur;	#打开游标
	
	#用循环语句遍历，知道总薪资满足题目要求
	REPEAT
		#开始使用游标
		FETCH emp_cur INTO one_sal;
		
		SET sum_sal = sum_sal + one_sal;
		SET count_emp = count_emp + 1;
		
		UNTIL sum_sal >= limit_total_salary
		
	END REPEAT;
	CLOSE emp_cur;	#关闭游标
	
	#把结果返回给total_count
	SELECT count_emp INTO total_count;
END $
DELIMITER ;

CALL get_count_by_limit_total_salary(30000,@count);
SELECT @count;
```
**思路分析：** 先创建存储过程，然后再根据实际情况declare自己需要的变量来满足题目的要求，游标要按步骤来：创建游标、打开游标、使用游标最后再关闭游标；其中要注意使用游标在循环中，可以提高代码的简洁度。
### 4、小结
游标是 MySQL 的一个重要的功能，为`逐条读取`结果集中的数据，提供了完美的解决方案。跟在应用层面实现相同的功能相比，游标可以在存储程序中使用，效率高，程序也更加简洁。

但同时也会带来一些性能问题，比如在使用游标的过程中，会对数据行进行`加锁`，这样在业务并发量大的时候，不仅会影响业务之间的效率，还会`消耗系统资源`，造成内存不足，这是因为游标是在内存中进行的处理。

**建议：** 养成用完之后就关闭的习惯，这样才能提高系统的整体效率。

> 爱在结尾：游标的使用结合了以前学习过的存储过程、流程控制以及用户自定义变量相关的知识点，单单看游标这一个知识点是不难的，自己还是应该多多回顾以前学过的知识点，做到融会贯通。
