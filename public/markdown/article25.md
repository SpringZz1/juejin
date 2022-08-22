确认码控件也是一个较为常见的组件了，乍一看，貌似较难实现，但实则主要是障眼法。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba4dfd184f084c5cb7bd6c7b8027eb71~tplv-k3u1fbpfcp-zoom-1.image" width="320">

## 实现原理

上图 `CodeInput` 组件的 UI 结构如下：

```tsx
<View style={[styles.container]}>
  <TextInput autoFocus={true} />
  <View
    style={[styles.cover, StyleSheet.absoluteFillObject]}
    pointerEvents="none">
    {cells.map((value: string, index: number) => (
      <View style={[styles.cell]}>
        <Text style={styles.text}>{value}</Text>
      </View>
    ))}
  </View>
</View>
```

`TextInput` 用于弹出键盘，接收用户输入，在它上面使用绝对定位覆盖了一个用于旁路显示的 `View[style=cover]`。

这就是 `CodeInput` 的实现原理了。

需要注意以下几个点：

- 设置 `TextInput` 的 `autoFocus` 属性，控制进入页面时是否自动弹出键盘。

- 设置作为覆盖物的 `View[style=cover]` 的 `pointerEvents` 属性为 `none`，不接收触屏事件。这样当用户点击该区域时，底下的 `TextInput` 会获得焦点。

- 设置作为容器的 `View[style=container]` 的高度，这个高度就是数字单元格的宽高。使用 `onLayout` 回调来获得容器的高度，用来设置数字单元格的宽高。

```tsx
const { onLayout, height } = useLayout()
const size = height

return (
  <View style={[styles.container, style]} onLayout={onLayout}>
    <TextInput />
    <View style={[styles.cover, StyleSheet.absoluteFillObject]}>
      {cells.map((value: string, index: number) => (
        <View
          style={[
            styles.cell,
            { width: size, height: size, marginLeft: index === 0 ? 0 : spacing }
          ]}>
          <Text style={styles.text}>{value}</Text>
        </View>
      ))}
    </View>
  </View>
)
```

- `cells` 是一个字符数组，用于存放数字单元格的文本内容，它的**长度是固定**的。它的内容由用户输入的值拆分组成，如果长度不够，则填充空字符串 `""`。

```tsx
export default function CodeInput({ value, length = 4 }) {
  const cells = value.split('').concat(Array(length - value.length).fill(''))
}
```

## 开源方案

GitHub 上[这个库](https://github.com/retyui/react-native-confirmation-code-field)实现了比较酷炫的效果。有需要的小伙伴可以使用。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c40aa2a72c294868853139d163db3765~tplv-k3u1fbpfcp-zoom-1.image" width="320">

## 示例

这里有[一个示例](https://github.com/listenzz/RNDemo)，供你参考。
