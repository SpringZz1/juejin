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
      <span class="option">
        <i class="el-icon-close"></i>
      </span>
      </div>
      <div class="content">
        <h3 class="title">test</h3>
        <div class="word">
          文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多文字过多
          </div>
      </div>
      <!-- 右侧图片 -->
      <!-- 如果没有封面则不显示 -->
      <div class="image" v-if="item.url !==''">
        <img :src="item.url" alt="图片">
      </div>
      <div class="footer">
        <div class="footer-item">
          <i class="el-icon-view"></i>
          <span>{{item.view}}</span>
        </div>
        <div class="footer-item">
          <i class="el-icon-thumb"></i>
          <span>{{item.likes}}</span>
        </div>
        <div class="footer-item">
          <i class="el-icon-chat-round"></i>
          <span>{{item.comments}}</span>
        </div>
      </div>
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
          tags: '前端',
          view: '1w',
          likes: 2,
          comments: '4',
          // url: '@/assets/logo.png'
          url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        },
        {
          author: '张员外',
          date: '一月前',
          tags: 'Vue.js ',
          view: '413',
          likes: 413,
          comments: '23',
          url: ''
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

.option{
  position: absolute;
  top: 7px;
  right: 20px;
  color: #9090905a;
  display: none;
}

.el-card__body{
  margin-top: -15px;
}

.main{
  position: relative;
  height: 130px;
  width: 100%;
  background-color: #fff;
}

.main::after{
  position: absolute;
  left: 20px;
  content: '';
  width: 80%;
  /* height: 75px; */
  top:125px;
  width: 95%;
  border-bottom: 1px solid #66666648;
}

.main:hover{
  background-color: #cccccc12;
}

.main:hover .option{
  display: block;
}

.header{
  height: 20%;
}

.content{
  position: relative;
  width: 100%;
  height: 80%;
}

.title{
  position: absolute;
  left: 22px;
  top: 13px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.word{
  position: absolute;
  left: 22px;
  top: 47px;
  font-size: 13px;
  color: #909090;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 95%;
}

.el-card__body{
  padding-left: 0;
  padding-right: 0;
}

.footer{
  position: absolute;
  left: 22px;
  top: 100px;
  text-decoration: none;
}

.footer-item{
  display: inline-block;
  margin-right: 20px;
  color: #909090;
}

.footer-item:not(:first-child):hover{
  color: #1171ee !important;
}

.footer span,a{
  margin-left: 3px;
  font-size: 13px;
}

.image img{
  position: absolute;
  width: 120px;
  height: 80px;
  top: 35px;
  right: 15px;
  border-radius: 2px;
  object-fit: fill;
}
</style>
