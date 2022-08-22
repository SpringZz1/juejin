ȷ����ؼ�Ҳ��һ����Ϊ����������ˣ�էһ����ò�ƽ���ʵ�֣���ʵ����Ҫ�����۷���

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba4dfd184f084c5cb7bd6c7b8027eb71~tplv-k3u1fbpfcp-zoom-1.image" width="320">

## ʵ��ԭ��

��ͼ `CodeInput` ����� UI �ṹ���£�

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

`TextInput` ���ڵ������̣������û����룬��������ʹ�þ��Զ�λ������һ��������·��ʾ�� `View[style=cover]`��

����� `CodeInput` ��ʵ��ԭ���ˡ�

��Ҫע�����¼����㣺

- ���� `TextInput` �� `autoFocus` ���ԣ����ƽ���ҳ��ʱ�Ƿ��Զ��������̡�

- ������Ϊ������� `View[style=cover]` �� `pointerEvents` ����Ϊ `none`�������մ����¼����������û����������ʱ�����µ� `TextInput` ���ý��㡣

- ������Ϊ������ `View[style=container]` �ĸ߶ȣ�����߶Ⱦ������ֵ�Ԫ��Ŀ�ߡ�ʹ�� `onLayout` �ص�����������ĸ߶ȣ������������ֵ�Ԫ��Ŀ�ߡ�

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

- `cells` ��һ���ַ����飬���ڴ�����ֵ�Ԫ����ı����ݣ�����**�����ǹ̶�**�ġ������������û������ֵ�����ɣ�������Ȳ������������ַ��� `""`��

```tsx
export default function CodeInput({ value, length = 4 }) {
  const cells = value.split('').concat(Array(length - value.length).fill(''))
}
```

## ��Դ����

GitHub ��[�����](https://github.com/retyui/react-native-confirmation-code-field)ʵ���˱ȽϿ��ŵ�Ч��������Ҫ��С������ʹ�á�

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c40aa2a72c294868853139d163db3765~tplv-k3u1fbpfcp-zoom-1.image" width="320">

## ʾ��

������[һ��ʾ��](https://github.com/listenzz/RNDemo)������ο���
