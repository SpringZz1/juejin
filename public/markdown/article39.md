---
theme: smartblue
---
携手创作，共同成长！这是我参与「掘金日新计划 · 8 月更文挑战」的第19天，[点击查看活动详情](https://juejin.cn/post/7123120819437322247)

本次刷题日记的第 94 篇，力扣题为：**1656. 设计有序流**

## 一、题目描述：

今天又是一个设计类的题目，我们继续要保持状态，完成 **设计有序流**

![]()

## 二、这道题考察了什么思想？你的思路是什么？

题目可能表述的会有点迷糊，我们来梳理一下题目想给我们表达的意思以及对我们的要求：

-   题目需要我们实现一个类，里面有 2 个功能

    -   构造一个能接收 n 个值的流
    -   实现可以向流中插入数据

看了题目我们知道，向流中插入数据，**样式是 （id,value） 的形式，其中 id 的取值范围是 1-n，且 id 唯一**

对于插入数据的时候，**当咱们插入某一个值的时候，需要输出 ptr 指向的最大的升序的序列**

### 分析

其实我们看到 id 的取值范围是 0-n，且每一个 id 是唯一的，且会对应一个 value

再结合实例，其实我们不难看出，实际上这个所谓的流 **，其实我们就可以设计成一个字符串切片 []string ， id 则是这个切片的索引，value 则是索引对应的值，那么 ptr 就是对应我们需要输出的起始位置了**

另外，根据示例，我们可以看到，对于 insert 之后的输出，实际上是这整个流的其中一部分最大升序序列，那么相当于是截断 []string 对应的起始位置和结束位置即可

因此对于 OrderedStream 类中，我们只需要 2 个成员，**一个是 stream []string ，一个是 ptr int**

正如示例中，我们可以这样来推演：

```
["OrderedStream", "insert", "insert", "insert", "insert", "insert"]
[[5], [3, "ccccc"], [1, "aaaaa"], [2, "bbbbb"], [5, "eeeee"], [4, "ddddd"]]
```

OrderedStream 创建类就不多赘述了，咱们来演示 insert

此处可以看到，我们 OrderedStream 已经开辟了 5 个空间

**insert [3, "ccccc"]**

| 索引 | 0 | 1（ptr） | 2 | 3       | 4 | 5 |
| -- | - | ------ | - | ------- | - | - |
| 值  |   |        |   | "ccccc" |   |   |

**insert [1, "aaaaa"]**

| 索引 | 0 | 1（ptr）  | 2 | 3       | 4 | 5 |
| -- | - | ------- | - | ------- | - | - |
| 值  |   | "aaaaa" |   | "ccccc" |   |   |

这个时候需要输出 ptr 其实的最大升序序列： **["aaaaa"]，且 ptr 移动到最大升序序列的后面 即为 2**

**insert [2, "bbbbb"]**

| 索引 | 0 | 1       | 2（ptr）  | 3       | 4 | 5 |
| -- | - | ------- | ------- | ------- | - | - |
| 值  |   | "aaaaa" | "bbbbb" | "ccccc" |   |   |

这个时候需要输出 ptr 其实的最大升序序列： **["bbbbb","ccccc"], 且 ptr 移动到最大升序序列的后面 即为 4**

**insert [5, "eeeee"]**

| 索引 | 0 | 1       | 2       | 3       | 4（ptr） | 5       |
| -- | - | ------- | ------- | ------- | ------ | ------- |
| 值  |   | "aaaaa" | "bbbbb" | "ccccc" |        | "eeeee" |

**insert [4, "ddddd"]**

| 索引 | 0 | 1       | 2       | 3       | 4（ptr）  | 5       |
| -- | - | ------- | ------- | ------- | ------- | ------- |
| 值  |   | "aaaaa" | "bbbbb" | "ccccc" | "ddddd" | "eeeee" |

这个时候需要输出 ptr 其实的最大升序序列： **["ddddd","eeeee"]**

那么接下来就按照咱们上述推演的思路执行即可，撸代码吧

## 三、编码

根据上述逻辑和分析，我们就可以翻译成如下代码

-   构造流的时候直接返回对象接口，对基本数据做初始化

<!---->

-   Insert 数据的时候，需要注意 ptr 的处理

编码如下：

```
type OrderedStream struct {
    stream []string
    ptr    int
}

func Constructor(n int) OrderedStream {
    return OrderedStream{make([]string, n+1), 1}
}

func (s *OrderedStream) Insert(idKey int, value string) []string {
    s.stream[idKey] = value
    start := s.ptr
    for s.ptr < len(s.stream) && s.stream[s.ptr] != "" {
        s.ptr++
    }
    return s.stream[start:s.ptr]
}
```

## 四、总结：

![]()

这么设计实现方式，**咱们的空间复杂度是 O(n)** ，因为咱们需要 O(n）级别的空间消耗来存储数据，**时间复杂度为 O(1)**

原题地址：[1656. 设计有序流](https://leetcode.cn/problems/design-an-ordered-stream/)




**今天就到这里，学习所得，若有偏差，还请斧正**

## 欢迎点赞，关注，收藏

朋友们，你的支持和鼓励，是我坚持分享，提高质量的动力

![]()

好了，本次就到这里

技术是开放的，我们的心态，更应是开放的。拥抱变化，向阳而生，努力向前行。

我是**阿兵云原生**，欢迎点赞关注收藏，下次见~

