<template>
  <el-container class="detail-page">
    <el-header>Header</el-header>
    <el-main>
      <div class="left-part">我是左边</div>
      <div ref="markdownContent">
        <div class="center-part github-markdown-css" v-html="compiledhtml"></div>
      </div>
      <div class="right-part">
        <div class="catalogue">
        <h2>目录</h2>
        <div class="seq"></div>
        <ul v-for="(item, index) in catalog" :key="index">
          <li :key="index" :style="{paddingLeft: item.level * 22-44 + 'px'}">
            <a :href="'#' + item.id">
              {{item.title}}
            </a>
          </li>
        </ul>
        </div>
        </div>
    </el-main>
  </el-container>
</template>

<script>
// 引用marked.js解析markdown文件
import { marked } from 'marked'
// 引用hight.js来高亮代码
import 'highlight.js/styles/monokai-sublime.css'
// 引用github-markdown-css美化页面
// import 'github-markdown-css'

export default {
  data () {
    return {
      id: 0,
      md: '',
      // 用来记录生成菜单
      catalog: {},
      // 接受强转之后的数据
      array: []
    }
  },
  computed: {
    compiledhtml () {
      // 设置marked.js渲染参数和代码高亮
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
          const hljs = require('highlight.js')
          const language = hljs.getLanguage(lang) ? lang : 'plaintext'
          return hljs.highlight(code, { language }).value
        },
        langPrefix: 'hljs language-',
        break: false,
        gfm: true,
        headerIds: false,
        headerPrefix: '',
        mangle: false,
        pedantic: false,
        sanitize: false,
        silent: false,
        smartLists: false,
        smartypants: false,
        xhtml: false
      })
      console.log('1111')
      return marked.parse(this.md)
    },
    computedMD () {
      return this.$refs.markdownContent
    }
  },
  methods: {
    getParamas () {
      this.id = this.$route.params.id
      this.$http.get('./markdown/article1.md').then(res => {
        this.md = res.data
      })
    },
    generateCatalog () {
      // 生成目录
      // 保证渲染成功
      this.$nextTick(() => {
        const articleContent = this.$refs.markdownContent
        this.array = articleContent.children[0].childNodes
        const titleTag = ['H1', 'H2', 'H3']
        const titles = []
        setTimeout(() => {
          articleContent.children[0].childNodes.forEach((e, index) => {
            if (titleTag.includes(e.nodeName)) {
              const id = 'header-' + index
              e.setAttribute('id', id)
              titles.push({
                id: id,
                title: e.innerHTML,
                level: Number(e.nodeName.substring(1, 2)),
                nodeName: e.nodeName
              })
            }
          })
        }, 100)
        this.catalog = titles
        console.log(this.catalog)
      })
    },
    handleScroll () {
      // 获取dom滚动距离
      const scrollTop = this.computedMD.scrollTop
      console.log(scrollTop)
      // 获取可视区高度
      const offsetHeight = this.computedMD.offsetHeight
      console.log(offsetHeight)
      // 获得滚动条总高度
      const scrollHeight = this.computedMD.scrollHeight
      console.log(scrollHeight)
    }
  },
  created () {
    this.getParamas()
    // this.$nextTick(() => {
    //   this.generateCatalog()
    // })
  },
  mounted () {
    this.$nextTick(() => {
      this.generateCatalog()
    })
    this.$nextTick(() => {
      this.computedMD.addEventListener('scroll', this.handleScroll)
    })
  }
}
</script>

<style src="../../assets/css/detail.css" scoped>
/* 这么做会污染全局样式 */
/* @import '../../assets/css/detail.css' */
</style>
