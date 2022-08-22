---
theme: smartblue
---
Я�ִ�������ͬ�ɳ��������Ҳ��롸������¼ƻ� �� 8 �¸�����ս���ĵ�19�죬[����鿴�����](https://juejin.cn/post/7123120819437322247)

����ˢ���ռǵĵ� 94 ƪ��������Ϊ��**1656. ���������**

## һ����Ŀ������

��������һ����������Ŀ�����Ǽ���Ҫ����״̬����� **���������**

![]()

## ��������⿼����ʲô˼�룿���˼·��ʲô��

��Ŀ���ܱ����Ļ��е��Ժ�������������һ����Ŀ������Ǳ������˼�Լ������ǵ�Ҫ��

-   ��Ŀ��Ҫ����ʵ��һ���࣬������ 2 ������

    -   ����һ���ܽ��� n ��ֵ����
    -   ʵ�ֿ��������в�������

������Ŀ����֪���������в������ݣ�**��ʽ�� ��id,value�� ����ʽ������ id ��ȡֵ��Χ�� 1-n���� id Ψһ**

���ڲ������ݵ�ʱ��**�����ǲ���ĳһ��ֵ��ʱ����Ҫ��� ptr ָ����������������**

### ����

��ʵ���ǿ��� id ��ȡֵ��Χ�� 0-n����ÿһ�� id ��Ψһ�ģ��һ��Ӧһ�� value

�ٽ��ʵ������ʵ���ǲ��ѿ�����ʵ���������ν���� **����ʵ���ǾͿ�����Ƴ�һ���ַ�����Ƭ []string �� id ���������Ƭ��������value ����������Ӧ��ֵ����ô ptr ���Ƕ�Ӧ������Ҫ�������ʼλ����**

���⣬����ʾ�������ǿ��Կ��������� insert ֮��������ʵ��������������������һ��������������У���ô�൱���ǽض� []string ��Ӧ����ʼλ�úͽ���λ�ü���

��˶��� OrderedStream ���У�����ֻ��Ҫ 2 ����Ա��**һ���� stream []string ��һ���� ptr int**

����ʾ���У����ǿ������������ݣ�

```
["OrderedStream", "insert", "insert", "insert", "insert", "insert"]
[[5], [3, "ccccc"], [1, "aaaaa"], [2, "bbbbb"], [5, "eeeee"], [4, "ddddd"]]
```

OrderedStream ������Ͳ���׸���ˣ���������ʾ insert

�˴����Կ��������� OrderedStream �Ѿ������� 5 ���ռ�

**insert [3, "ccccc"]**

| ���� | 0 | 1��ptr�� | 2 | 3       | 4 | 5 |
| -- | - | ------ | - | ------- | - | - |
| ֵ  |   |        |   | "ccccc" |   |   |

**insert [1, "aaaaa"]**

| ���� | 0 | 1��ptr��  | 2 | 3       | 4 | 5 |
| -- | - | ------- | - | ------- | - | - |
| ֵ  |   | "aaaaa" |   | "ccccc" |   |   |

���ʱ����Ҫ��� ptr ��ʵ������������У� **["aaaaa"]���� ptr �ƶ�������������еĺ��� ��Ϊ 2**

**insert [2, "bbbbb"]**

| ���� | 0 | 1       | 2��ptr��  | 3       | 4 | 5 |
| -- | - | ------- | ------- | ------- | - | - |
| ֵ  |   | "aaaaa" | "bbbbb" | "ccccc" |   |   |

���ʱ����Ҫ��� ptr ��ʵ������������У� **["bbbbb","ccccc"], �� ptr �ƶ�������������еĺ��� ��Ϊ 4**

**insert [5, "eeeee"]**

| ���� | 0 | 1       | 2       | 3       | 4��ptr�� | 5       |
| -- | - | ------- | ------- | ------- | ------ | ------- |
| ֵ  |   | "aaaaa" | "bbbbb" | "ccccc" |        | "eeeee" |

**insert [4, "ddddd"]**

| ���� | 0 | 1       | 2       | 3       | 4��ptr��  | 5       |
| -- | - | ------- | ------- | ------- | ------- | ------- |
| ֵ  |   | "aaaaa" | "bbbbb" | "ccccc" | "ddddd" | "eeeee" |

���ʱ����Ҫ��� ptr ��ʵ������������У� **["ddddd","eeeee"]**

��ô�������Ͱ��������������ݵ�˼·ִ�м��ɣ�ߣ�����

## ��������

���������߼��ͷ��������ǾͿ��Է�������´���

-   ��������ʱ��ֱ�ӷ��ض���ӿڣ��Ի�����������ʼ��

<!---->

-   Insert ���ݵ�ʱ����Ҫע�� ptr �Ĵ���

�������£�

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

## �ġ��ܽ᣺

![]()

��ô���ʵ�ַ�ʽ��**���ǵĿռ临�Ӷ��� O(n)** ����Ϊ������Ҫ O(n������Ŀռ��������洢���ݣ�**ʱ�临�Ӷ�Ϊ O(1)**

ԭ���ַ��[1656. ���������](https://leetcode.cn/problems/design-an-ordered-stream/)




**����͵����ѧϰ���ã�����ƫ����븫��**

## ��ӭ���ޣ���ע���ղ�

�����ǣ����֧�ֺ͹��������Ҽ�ַ�������������Ķ���

![]()

���ˣ����ξ͵�����

�����ǿ��ŵģ����ǵ���̬����Ӧ�ǿ��ŵġ�ӵ���仯������������Ŭ����ǰ�С�

����**������ԭ��**����ӭ���޹�ע�ղأ��´μ�~
