<template>
<div class="container" v-infinite-scroll="load" style="overflow:auto;" infinite-scroll-distance="10" infinite-scroll-immediate="false">
  <div class="card" v-for="(item, index) in computed_info"  :key="index">

    <div class="main" @click="toDetail(item.item_info.article_id)">
      <div class="header" >
      <ul>
        <li class="meta-info">
          <a href="#">{{item.item_info.author_user_info.user_name}}</a>
          <a href="#">{{item.item_type}}</a>
          <a href="#" class="tags" v-for="(tag, index) in item.item_info.tags" :key="index">{{tag.tag_name}}</a>
        </li>
      </ul>
      <span class="option">
        <i class="el-icon-close"></i>
      </span>
      </div>
      <div :class="[item.item_info.article_info.cover_image === '' ? 'content':'content-image']">
        <h3 class="title">{{item.item_info.article_info.title}}</h3>
        <div class="word">
          {{item.item_info.article_info.brief_content}}
          </div>
      </div>
      <!-- 右侧图片 -->
      <!-- 如果没有封面则不显示 -->
      <div class="image" v-if="item.item_info.article_info.cover_image !==''">
        <img :src="item.item_info.article_info.cover_image" alt="图片">
      </div>
      <div class="footer">
        <div class="footer-item">
          <i class="el-icon-view"></i>
          <span>{{item.item_info.article_info.view_count}}</span>
        </div>
        <div class="footer-item">
          <i class="el-icon-thumb"></i>
          <span>{{item.item_info.article_info.collect_count}}</span>
        </div>
        <div class="footer-item">
          <i class="el-icon-chat-round"></i>
          <span>{{item.item_info.article_info.comment_count}}</span>
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
      // 全部数据
      totalInfo: {},
      // 无限列表初始值
      i: 3,
      // 每个标签页的信息，包括作者、日期以及标签
      metaInfo: [
        {
          id: 1,
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
          id: 2,
          author: '张员外',
          date: '一月前',
          tags: 'Vue.js ',
          view: '413',
          likes: 413,
          comments: '23',
          url: ''
        }
      ],
      computed_info: {}
    }
  },
  // computed: {
  //   computeInfo: function () {
  //     return this.totalInfo.slice(0, 3)
  //   }
  // },
  methods: {
    toDetail (id) {
      console.log(id)
      this.$router.push(
        {
          name: 'Detail',
          params: { id: id }
        }
      )
    },
    getDate () {
      console.log('get date now...')
      // 使用get请求获取数据
      this.$http.get('/test.json').then(res => {
        this.totalInfo = res.data.data
        // console.log(this.totalInfo.slice(0, 3))
        this.computed_info = this.totalInfo.slice(0, this.i)
        // console.log(this.computed_info)
        // 作者名字
        // console.log(this.totalInfo[0].item_info.author_user_info.user_name)
        // tag名称
        // console.log(this.totalInfo[0].item_info.tags[0].tag_name)
        // 文章简评
        // console.log(this.totalInfo[0].item_info.article_info.brief_content)
        // 文章封面
        // console.log(this.totalInfo[0].item_info.article_info.cover_image)
      })
    },
    load () {
      if (this.i < 23) {
        this.i += 5
        this.getDate()
        // console.log(this.i)
      }
    }
  },
  created () {
    this.getDate()
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
.container::-webkit-scrollbar{
  display: none;
}

.infinite-infinite-list{
  height: 100%;
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

/* 多个tag后面添加小圆点 */
.meta-info a.tags:not(:last-child)::after{
  display: inline-block;
  position: relative;
  bottom: 3px;
  left: 2px;
  background-color: #6666668a;
  text-align: center;
  width: 2px;
  height: 2px;
  border-radius: 50% ;
  content:'';
  margin: 0px 3px;
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

/* 如果没有右边没有图片略缩图 */
.content{
  position: relative;
  width: 100%;
  height: 80%;
}

/* 如果右边有图片略缩图 */
.content-image{
  position: relative;
  width: 80%;
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
