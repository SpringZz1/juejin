\
本文已参与「新人创作礼」活动，一起开启掘金创作之路。

### JSON 的由来

在目前的开发中，JSON是一种非常重要的数据格式，它并不是编程语言，而是一种可以在服务器和客户端之间传输的数据格式
JSON的全称是JavaScript Object Notation (JavaScript对象符号)
JSON是由Douglas Crockforc 构想和设计的一种轻量级数据交换格式，算是JavaScript的一个子集
很多编程语言都实现了将JSON转为对应模型的方式

其他的传输格式：
XML：在早期的网络传输中主要是使用XML来进行数据交换的，但是这种格式在解析、传输等各方面都弱于JSON，所以目前已经很少在被使用了
Protobuf：另外一个在网络传输中目前已经越来越多使用的传输格式是protobuf，但是直到2021年的3.x版本才支持JavaScript，所以在前端使用的比较少；

目前JSON被使用的场景也越来越多：
网络数据的传输JSON数据；
项目的某些配置文件；
非关系型数据库(NoSQL)将json作为存储格式

### JSON 的基本语法

JSON的最外层支持三种类型的值：
简单值：数字(Number)、字符串(String ,不支持单引号)、布尔类型(Boolean)、null类型；
对象值：由key、value组成，key是字符串类型，并且必须添加双引号，值可以是简单值、对象值、数组值；
数组值：数组的值可以是简单值、对象值、数组值；

JSON不支持变量、函数或对象实例，是一种表示结构化数据的格式。
简单值

JSON数据形式：

```js
5    // 数值
"Hello JavaScript"    // 字符串
null

```

与JavaScript不同，JSON中的对象要求给属性加上引号：

```js
{
    "name": "JS人柱力";
    "age": 100
}

// 属性的值也可以是复杂类型
{
    "school": {
        "name": "hafo", 
        "location": "Harbin"
    }
}

```

数组

JSON表示数组：

```js
[100, "JS人柱力", true]


```

JSON数组没有变量和分号。

把数组和对象结合，可以构造复杂的数据集合：

```js
[
    {
        "title":"js",
        "authors":[
            "张三"
        ],
        edition: 2
    },
    {
        "title":"MySQL从删库到跑路",
        "authors":[
            "李四"
        ],
        edition: 3
    },
    {
        "title":"Dreamweaver从安装到卸载",
        "authors":[
            "王五"
        ],
        edition: 4
    }
]

```

### 解析与序列化

JSON对象

JSON对象有两个方法：

    stringfy()：把JavaScript对象序列化为JSON字符串
    parse()：。把JSON字符串解析为原生JavaScript值

示例：

```js
var book = {
    "title":"Java从入门到放弃",
    "authors":[
        "张三"
    ],
    edition: 2
};
var jsonText = JSON.stringify(book);
alert(jsonText);    // {"title":"Java从入门到放弃","authors":["张三"],"edition":2}
```

上面的例子将一个JavaScript对象序列化为一个JSON字符串。默认情况下，JSON.stringify()不包含任何字符或缩进。

将JSON字符串直接传递个JSON.parse()可以得到相应的JavaScript值。

var newBook = JSON.parse(jsonText);    

book与newBook具有相同的属性，但是彼此是相互独立的。
序列化选项

JSON.stringify()还可以接收两个参数：

    第一个参数：过滤器，一个数组或一个函数。
    第二个参数：一个选项，表示是否在JSON字符串中保留缩进

过滤结果

如果参数是数组，JSON.stringify()的结果只包含数组中列出的属性。

```js
var book = {
    "title":"Java从入门到放弃",
    "authors":[
        "张三"
    ],
    edition: 2
};
var jsonText = JSON.stringify(book, ["title", "authors"]);
console.log(jsonText);  // {"title":"Java从入门到放弃","authors":["张三"]}
```

如果参数是函数，传入的函数接收两个参数，属性名和属性值，根据属性名可以知道如何处理属性。属性名是字符串，属性值并非键值对的值，键名可以是空字符串。

返回的值是相应键的值，如果函数返回undefined，那么该属性就会被忽略。

```js
var book = {
    "title":"Java programming",
    "authors":[
        "张三",
        "李四"
    ],
    edition: 2
};
var jsonText = JSON.stringify(book, function (key, value) {
    switch (key) {
        case "authors":
            return value.join("-");        // 用“-”分割数组
        case "edition":
            return undefined;
        default :
            return value;
    }
});
console.log(jsonText);    // {"title":"Java programming","authors":"张三-李四"}
```

字符串缩进

JSON.stringify()的第三个参数用于控制结果中的缩进和空白符。如果是数值，表示每格缩进的空格数。

```js
var book = {
    "title":"Java programming",
    "authors":[
        "JS人柱力",
    ],
    edition: 2
};
var jsonText = JSON.stringify(book, null, 4);
console.log(jsonText);
```

如果是字符串，这个字符串将用作JSON字符串的缩进符

```js
var book = {
    "title":"Java programming",
    "authors":[
        "JS人柱力",
    ],
    edition: 2
};
var jsonText = JSON.stringify(book, null, "__");
console.log(jsonText);

【显示结果】：
```

```js
{
__"title": "Java programming",
__"authors": [
____"JS人柱力"
__],
__"edition": 2
}
```

缩进字符串最多只能包含10个字符。
toJSON()方法

JSON.stringify()并不能满足所有对象进行序列化的需求。可以给对象定义toJSON()方法，返回其自身的JSON数据格式。

示例：

```js
var book = {
    "title":"Java programming",
    "authors":[
        "JS人柱力",
    ],
    edition: 2,
    toJSON: function () {
        return "==="+this.title+"===";
    }
};
var jsonText = JSON.stringify(book);
console.log(jsonText);    // "===Java programming==="
```

解析选项

JSON.parse()方法也可以接收另一个参数，该参数是一个函数，将在每个键值对上调用。如果返回undefined，表示从结果中删除相应的键，如果返回其他值，则将该值插入到结果中。

```js
var book = {
    "title":"Java programming",
    "authors":[
        "JS人柱力",
    ],
    edition: 2,
    year: 2022,
    releaseDate: new Date(2022, 11, 1)
};
var jsonText = JSON.stringify(book);

var newBook = JSON.parse(jsonText, function (key, value) {
    if (key == "releaseDate") {
        return new Date(value);
    } else {
        return value;
    }
});
console.log(newBook.releaseDate.getFullYear());    // 2022

```