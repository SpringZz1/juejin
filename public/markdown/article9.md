## 场景描述：
设想下如果服务器端返回的数据成百上千条，需要你在前端“一次性”渲染出来，脑海中有没有对应的解决方案。有人可能会说，为啥一次性返回成百上千条，不能分页么。或者在移动端的话我们可以采用上拉刷新的方案来实现呢（也是分页的一种），即使是这样，那如果用户一直刷，一直不停的拿取数据，如果不去做一些性能优化方案，那么页面上需要渲染的节点数是海量的，这也会给我们的网页渲染带来困扰。这时我们可以使用一种“虚拟滚动”技术来解决此类难题，只在可见区域内进行渲染，对非可见区域只做部分渲染（缓冲，避免滑动太快出现白屏）。这样，通过创建有限的DOM节点，大大的降低了渲染成本。这种“虚拟滚动”的方案，业界比较著名的有[react-window](https://react-window.vercel.app/)和[react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List)。所谓万变不离其中，接下来让我们一探究竟吧。
## 成果展示：
![image](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/750c4bcc3ede487b93fe1cadc7730fd2~tplv-k3u1fbpfcp-watermark.image?)
## 方案细节：
和成果相对应，我们按照上面三种情况分别介绍三种情况下的方案。
> 条目高度预知，且高度固定

该场景下，需要渲染的每个条目高度是已知的，且每个条目的高度都是固定的。通过可见区域的高度，以及每个条目的高度，我们可以计算出可见区域内的条目数。可见区域如何出现滚动呢，以及滚动到什么时候所有需要渲染的数据才算完成呢，所以我们通过在可见区域内插入一个高度为所有条目高度和的DOM节点，然后在该DOM节点下去渲染可见的条目数。如果不做任何处理，随着滚动条向上滚动，这时候可见区域已渲染的条目逐渐被滚出可见区域，但是又没有新的条目进来补充。所以这时，随着滚动条的滚动，需要我们动态的截取部分数据，不停的在可见区域进行渲染，截取之外的数据就不需要渲染，这样我们就能保持仅仅渲染有限条的DOM节点。通过滚动条卷去的高度以及条目的高度，我们可以得出截取数据的起始位置startIndex，在通过可视区域的高度和条目的高度distance，我们可以得出截取数据的结束位置endIndex，当然为了避免滑动过快，来不及渲染而出现白屏的现象，我们可以加如缓冲条目，多渲染几条作为预备，依此来解决白屏问题，以下是代码实现：

```
调用部分：
const Row = ({ index, style }) => (
  <div
    className={cls(styles.row, {
      [styles.odd]: index % 2 !== 0,
      [styles.even]: index % 2 === 0,
    })}
    style={style}
  >
    Row {index}
  </div>
);
const Example = () => (
  <FixVirtualList height={350} itemCount={100000} itemSize={35} width={300} bufferCount={2}>
    {Row}
  </FixVirtualList>
);
实现部分：
import React from "react";
import styles from "./index.module.scss";
import cls from "classnames";
import FixVirtualList from '../components/virtual/fix-virtual/virtual';
const FixVirtualList = (props) => {
    const {
        width,
        height,
        itemCount,
        itemSize,
        bufferCount = 5,
        children: Row
    } = props;
    const containerRef = useRef(null);
    const [offsetTop, setOffsetTop] = useState(0);
    const getRowItemStyle = (index) => {
        return {
            position: 'absolute',
            height: `${getItemSize(props, index)}px`,
            top: `${getItemOffset(props, index)}px`,
            width: '100%'
        };
    }
    const items = useMemo(() => {
        const result = [];
        const [start, end] = getRange({...props, bufferCount}, offsetTop);
        for (let i=start; i<=end; i++) {
            result.push(<Row key={i} index={i} style={getRowItemStyle(i)} />)
        }
        return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, offsetTop])
    const getContentStyle = () => {
        return {
            height: `${getEstimatedHeight(props)}px`,
        }
    }
    const handleScroll = (event) => {
        const {scrollTop} = event.currentTarget;
        setOffsetTop(scrollTop);
    }

    useEffect(() => {
        containerRef.current.addEventListener('scroll', handleScroll, {passive: true})
    }, [])

    return <div className={styles.container} style={{width: `${width}px`, height: `${height}px`}} ref={containerRef}>
        <div className={styles.content} style={getContentStyle()}>
            {items}
        </div>
    </div>
}
export default FixVirtualList;

工具函数：
export const getEstimatedHeight = (props) => {
    const {itemSize, itemCount} = props;
    return itemSize*itemCount
}
export const getStartIndexFromOffset = (props, scrollTop) => {
    const {itemSize} = props;
    return Math.floor(scrollTop / itemSize);
}

export const getEndIndexFromStartAndHeight = (props, startIndex) => {
    const {itemSize, height} = props;
    return startIndex + Math.ceil(height/itemSize) - 1; //会包含最后一个元素
}

export const getRange = (props, offsetTop) => {
    const {itemCount, bufferCount} = props;
    const start = getStartIndexFromOffset(props, offsetTop);
    const end = getEndIndexFromStartAndHeight(props, start);
    return [
        Math.max(0, start-bufferCount),
        Math.min(itemCount-1, end+bufferCount)
    ]
}

export const getItemSize = (props, index) => {
    return props.itemSize
}

export const getItemOffset = (props, index) => {
    return props.itemSize * index;
}
```
这里我们将该虚拟列表封装成了组件FixVirtualList，其传参含义如下：
- height：可视区域的高度
- width: 可视区域的宽度
- itemCount：渲染的总条目数
- itemSize: 渲染的单个条目的高度
- bufferCount：缓冲数
需要我们注意的是对于每个条目，我们将其相对于父级（也就是高度为所有条目高度总和的那么DOM节点）做position：absolute处理，所以每个条目，我们设置其top值。如果我们不这样做，而是让其在文档流中正常布局，那么当滚动条上滚动的时候，卷去部分已经被我们截掉，现在这个部分没有任何填充，会导致可视区域的部分自然上移动，就会出现渲染异常的现象，如下所示：
![image](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b5b9873c3ea4d6c944693ba4ea8b32a~tplv-k3u1fbpfcp-watermark.image?)
除了定位之外，我们还可以通过给父级容器加padding以此来填充被截取部分，或者通过transform向上移动相应距离的父级容器，读者可以自己下去尝试。
> 条目高度预知，但高度不固定：

该场景下，每个条目的高度虽然已知，但是高度不一样，该场景html结构和场景一完全一致。但是尚未加载到的条目我们是没法提前知道他的高度的，所以导致了之前关于位置的一些计算方式是不一样的，比如所有条目的高度、滚动过程中数据的起始位置、结束位置等等，对应代码里面就是utils工具函数里的所有实现都不相同。这里我主要运用了一个对象instanceParams来存储条目相关信息，关于instanceParams里面的值，列举说明如下：
- estimatedItemSize(Number：props.estimatedItemSize || DEFAULT_ITEMSIZE)：条目预估高度,由组件传入的预估高度或者默认值决定；
- lastMeasuredIndex（Nmuber： -1）：最新测量的条目索引，，即在滚动过程中，某些条目的高度就已经被确定，该索引值就是最新被确定高度的那个条目的索引值，初始值为-1；
- itemMetaData（Object：{}）：条目信息对象，以各个条目的索引为key，value值为条目距离父级容器的距离以及条目的高度，即{offset, size}，构成的对象。
接下来我们一个个来分别剖析utils里函数的实现：
1. 获取条目信息getMetaData(props, index, instanceParams)：
这时一个通用的方法，之后的各个方法都会依赖该方法来获取某个条目的信息，也是该小节比较难以理解的部分，先上代码：
```
export function getMetaData(props, index, instanceParams) {
    const {itemSize} = props;
    let {lastMeasuredIndex, itemMetaData} = instanceParams.current;
    if (index > lastMeasuredIndex) {
        let sumOffset = 0;
        if (lastMeasuredIndex >= 0) {
            sumOffset = itemMetaData[lastMeasuredIndex].offset + itemMetaData[lastMeasuredIndex].size;
        }
        for (let i = lastMeasuredIndex+1; i<=index; i++) {
            itemMetaData[i] = {
                size: itemSize(i),
                offset: sumOffset
            }
            sumOffset += itemMetaData[i].size;
        }
        instanceParams.current.lastMeasuredIndex = index;
        instanceParams.current.itemMetaData = itemMetaData;
    }
    return instanceParams.current.itemMetaData[index];
}
```
通过当前条目的索引和lastMeasuredIndex进行比较，如果当前的索引值小于等于lastMeasuredIndex，那么说明需要获取的条目已经被测量过，所以直接根据所以返回想要获取的条目信息即可。反之，说明从lastMeasuredIndex到index的部分都是尚未被测量过的，所以对于已经测量过的对去距离父级的距离进行一个累加，计为sumOffset。该累加值sumOffset就是lastMeasuredIndex+1所在条目（第一个未经测量的条目）的offset值。所以，从lastMeasuredIndex+1开始到index这个区间的数据，我们需要更新对应的条目的size和offset信息。最后，我们再更新lastMeasuredIndex值为index的值，itemMetaData也更新为更新过信息的itemMetaData值。
2. 获取条目总高度getTotalHeight：
我们能够知道的也就是加载进来的各个条目的高度，但是尚未加载到的条目我们是没法提前知道他的高度的。所以总高的计算分为两部分：已测量部分+未测量部分，测量的意思就是表示该条目的高度已经通过计算得到。对于已测量部分，高度为itemMetaData已经记录的条目的高度之和，对于未测量部分，根据估计的条目高度值estimatedItemSize来计算高度和，等到该条目真实别测量过再改为真正的高度，代码如下：

```
export const getTotalHeight = (props, instanceParams) => {
    const {estimatedItemSize, itemMetaData, lastMeasuredIndex} = instanceParams.current;
    const {itemCount} = props;
    let measuredHeight = 0, unMeasuredHeight = 0;
    if (lastMeasuredIndex < 0) {
        unMeasuredHeight = itemCount * estimatedItemSize;
    } else {
        for (let i=0; i<=lastMeasuredIndex; i++) {
            measuredHeight += itemMetaData[i].size
        }
        unMeasuredHeight = (itemCount - lastMeasuredIndex - 1)*estimatedItemSize;
    }
    return measuredHeight + unMeasuredHeight;
}
```

3.根据滚动高度获取起始索引getStartIndexFromOffset(props, scrollTop, instanceParams)：
因为我们最初的滚动高度是0，所以计算起始索引可以从索引0开始到lastMeasuredIndex，找到第一个条目的offset满足offset>滚动高度即可,代码如下：

```
export const getStartIndexFromOffset = (props, scrollTop, instanceParams) => {
    const {lastMeasuredIndex, itemMetaData} = instanceParams.current;
    for (let i=0; i<=lastMeasuredIndex; i++) {
        if (scrollTop <= itemMetaData[i].offset) return i;
    }
    return 0;
}
```
4.根据起始索引，可是区域高度获取结束索引getEndIndexFromStartAndHeight(props, startIndex, instanceParams):
我们可以根据起始索引获取起始条目对应的offset值计为startOffset，然后由起始索引开始累加，知道对应条目的offset值超过startOffset+可是区域的高度或者累加后的索引值超过总的条目数为止，代码如下：

```
export const getEndIndexFromStartAndHeight = (props, startIndex, instanceParams) => {
    const {height, itemCount} = props;
    const startItemMetaData = getMetaData(props, startIndex, instanceParams);
    const targetOffset = startItemMetaData.offset + height;
    let endIndex = startIndex, offset = startItemMetaData.offset;
    while (endIndex < itemCount && offset < targetOffset) {
        endIndex++;
        offset = getMetaData(props, endIndex, instanceParams).offset
    }

    return endIndex;
}
```
到此整个第二场景涉及到的关键函数就已经全部实现，按照上面的步骤一步步地你就已经能实现一个条目高度预知，但条目高度不固定的虚拟化长列表了。
5. 抛出疑惑&&性能优化：
前面的实现其实有一些不完善的地方，不知道读者有没有发现。在第3步里getStartIndexFromOffset实现的地方，
我们是从索引值0开始到lastMeasuredIndex，逐步累加去寻找第一个offset值大于scrollTop值的条目。这里我们可以采用二分法，来对此计算进行优化。另外，如果scrollTop的值大于每一个已测量的条目的offset呢，此时函数返回的是索引值0，这是不是合不理的（因为scrollTop明明是一个比较大的值，但是起始索引却是从0开始）。那么什么时候会出现这样的情况呢（读者可以思考下）？假设用户以一个很快的速度拖动滚动条就会出现这样一种情况。所以，对于另外的这种情况，scrollTop值是一个比较大的值，我们也不便从0开始一个个去累加寻找哪个条目的offset大于目标值scrollTop，这里我们采取指数增长的形式，即每次累加的步骤可以按照2的倍数逐步累加，直到锁定了scrollTop值是在某个区间内，然后再在此区间采用二分的形式精确锁定符合要求的哪个条目的索引，代码如下：

```
function getStartIndexFromOffset(props, scrollTop, instanceParams) {
    const {lastMeasuredIndex, itemMetaData} = instanceParams.current;
    const lastMeasuredOffset = lastMeasuredIndex > 0 ? itemMetaData[lastMeasuredIndex].offset : 0;
    if (lastMeasuredOffset >= scrollTop) {
        return findNearestItemBinarySearch(0, Math.max(0, lastMeasuredIndex), scrollTop, props, instanceParams);
    } else {
        return findNearestItemExponentialSearch(Math.max(0, lastMeasuredIndex), scrollTop, props, instanceParams);
    }
}

function findNearestItemBinarySearch(low, high, scrollTop, props, instanceParams) {
    while (low <= high) {
        let mid = Math.floor((low + high)/2);
        let currentOffset = getMetaData(props, mid, instanceParams).offset;
        if (currentOffset === scrollTop) {
            return mid;
        } else if (currentOffset < scrollTop) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return Math.max(low-1, 0);
}

function findNearestItemExponentialSearch(index, scrollTop, props, instanceParams) {
  const { itemCount } = props;
  //找到offset值大于等于当前容器向上卷曲的高度的offset值

  while (index < itemCount && getMetaData(props, index, instanceParams).offset < scrollTop) {
    if (index === 0) index = 1;
    else index *= 2;
  }
  return findNearestItemBinarySearch(Math.floor(index/2), Math.min(index, itemCount-1), scrollTop, props, instanceParams)
}
```
> 条目高度未知，条目高度完全由内容确定：

该场景下开发者也不知道每个条目的高度是怎样的，数据由接口获得，所以每个条目的高度完全由内容确定。这是和第二个场景不同之处，其他地方全都可以复用第二场景里的代码逻辑。这个时候，我们就可以借助ResizeObserver来观察每一个条目高度的变化，一次来做到动态设置各个条目的高度。关于ResizeObserver，[解释](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)如下：
`ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距 padding。`
这样我们就不能直接渲染组件传入的关于条目的children组件，而是需要对其进行包装，因为我们要植入ref，用来监听条目的高度变化，代码如下：

```
const ListItem = ({ children, options, handleChange }) => {
  const nodeRef = useRef(null);
  useEffect(() => {
    if (!nodeRef.current) return
    const io = new ResizeObserver(() => {
        handleChange(options.index, nodeRef.current)
    });
    io.observe(nodeRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return cloneElement(children, {
    ...options,
    nodeRef: nodeRef,
  });
};
```
handleChange函数会接收条目发生变动对应的条目索引和当前条目对应的DOM对象，在该函数里面，我们会更新整个已经测量过的条目的位置信息以及对应条目的高度信息，然后重新出发节点渲染，代码如下：

```
  function handleChange(index, dom) {
    // console.log(index, dom.clientHeight, dom.offsetHeight)
    if (!dom) return;
    const height = dom.offsetHeight;
    const {lastMeasuredIndex } = instanceParams.current;
    instanceParams.current.itemMetaData[index].size = height; //把此索引对应的条目改为真实的高度
    let offset = 0;
    for (let i = 0; i <= lastMeasuredIndex; i++) {
      instanceParams.current.itemMetaData[i].offset = offset;
      offset = offset + instanceParams.current.itemMetaData[i].size; //此处累加的是真实的高度
    }
    // console.log(index, instanceParams.current.itemMetaData)
    itemStyleCache.current = {};
    forceUpdate({})
  }
```
到此，三个场景下的虚拟化长列表就已经完全实现，是不是也没有想象中的那么难，场景一是基础，场景二和场景三比较相似，在实际开发过程中，场景一和场景三运用的最多。
## 写在最后：
虚拟化长列表的技术在前端开发中比较常用，读者可以去看下react-window的源码，里面还有一些性能优化的细节值得参考。我出了参考源码实现外，还参考了之前看到的珠峰老师的视频讲解。如果是在实际的项目开发中需要做到极致的性能优化，我建议使用前面提到的那俩库。这里我再提出一个比较常用的性能优化方案，即里面关于滚动的监听，我采用的是onScroll事件，触发会比较频繁，不知道你们还有没有更好的方案呢，欢迎一起讨论哈（提示可以用IntersectionObserver进行优化）。
## 源码链接：
这里我只贴了最后一个场景的代码，前面俩可以由此推导出。
[codesandbox线上地址](https://codesandbox.io/s/reverent-snyder-b4fpj0)
