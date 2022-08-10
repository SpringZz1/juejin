<template>
<div class="container" >
  <div class="card" v-for="(item, index) in metaInfo"  :key="index">
    <div class="header" >
    <ul>
      <li class="meta-info">
        <a href="#">{{item.author}}</a>
        <a href="#">{{item.date}}</a>
        <a href="#">{{item.tags}}</a>
      </li>
    </ul>
    </div>
    <div class="main">
      <div class="left">
        <div class="title"></div>
      </div>
      <div class="image"></div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data () {
    return {
      // 每个标签页的信息，包括作者、日期以及标签
      metaInfo: [
        {
          author: '掘金酱',
          date: '16天前',
          tags: '前端'
        }
        // {
        //   author: '张员外',
        //   date: '一月前',
        //   tags: 'Vue.js '
        // }
      ]
    }
  }
}
</script>

<style>
/* .card{
  position: relative;
  width: 100%;
  height: 50px;
} */
.el-card__body{
  position: relative;
  cursor: pointer;
}
.meta-info{
  list-style-type: none;
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 13px;
}

.meta-info a{
  text-decoration: none;
}

.meta-info a:visited{
  color: #909090;
}

.meta-info a:hover{
  color:#1171ee;
}

.meta-info a::after{
    display: inline-block;
    height: 13px;
    margin: 0px 10px;
    border-right: 0.5px solid #66666648;
    content: '';
}
</style>
