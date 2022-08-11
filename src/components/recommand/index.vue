<template>
<div class="container" >
  <div class="card" v-for="(item, index) in metaInfo"  :key="index">

    <div class="main">
      <div class="header" >
      <ul>
        <li class="meta-info">
          <a href="#">{{item.author}}</a>
          <a href="#">{{item.date}}</a>
          <a href="#">{{item.tags}}</a>
        </li>
      </ul>
      </div>
      <div class="content">
        <h3 class="title">test</h3>
        <span class="word">garegerigjaeirgjaerigjaeiorg</span>
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
        },
        {
          author: '张员外',
          date: '一月前',
          tags: 'Vue.js '
        }
      ]
    }
  }
}
</script>

<style>

/* .card:hover{
  background-color: red;
} */

.el-card__body{
  position: relative;
  cursor: pointer;
}
.meta-info{
  list-style-type: none;
  height: 100%;
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
/* 除了第二个表示天数的元素其他的都添加hover效果 */
.meta-info a:not(:nth-child(2)):hover{
  color:#1171ee;
}

.meta-info a:not(:last-child)::after{
    display: inline-block;
    height: 13px;
    margin: 0px 10px;
    border-right: 0.5px solid #66666648;
    content: '';
}

.el-card__body{
  margin-top: -15px;
}

.main{
  position: relative;
  height: 120px;
  width: 100%;
  background-color: #fff;
}

.main::after{
  position: absolute;
  left: 20px;
  content: '';
  width: 80%;
  /* height: 75px; */
  top:110px;
  width: 95%;
  border-bottom: 1px solid #66666648;
}

.main:hover{
  background-color: #cccccc12;
}

.header{
  height: 20%;
}

.title{
  position: absolute;
  left: 20px;
  top: 35px;
  font-size: 16px;
}

.word{
  position: absolute;
  left: 20px;
  top:  60px;
  font-size: 13px;
  color: #909090;
}

.el-card__body{
  padding-left: 0;
  padding-right: 0;
}
</style>
