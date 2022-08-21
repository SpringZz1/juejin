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
@import '../../assets/css/recommand.css'
</style>
