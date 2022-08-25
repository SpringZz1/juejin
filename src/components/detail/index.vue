<template>
  <el-container class="detail-page">
    <el-header>Header</el-header>
    <el-main>
      <div class="left-part">我是左边</div>
      <div ref="markdownContent">
        <div class="center-part" v-html="compiledhtml"></div>
      </div>
      <div class="right-part">
        <div class="catalogue">
        <h2 style="display:inline-block">目录</h2>
        <span style="float:right">{{this.progress}}</span>
        <div class="seq"></div>
        <ul v-for="(item, index) in catalog" :key="index">
          <li :key="item.id" :style="{paddingLeft: item.level * 22-44 + 'px'}">
            <a :href="'#' + item.id" :class="currentTitle.id === item.id ? 'active' : 'test'">
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
      // 记录当前文章对象
      currentTitle: {},
      // 记录进度条
      progress: 0
    }
  },
  computed: {
    compiledhtml () {
      // 设置marked.js渲染参数和代码高亮
      marked.setOptions({
        renderer: new marked.Renderer(),
        // highlight: function (code, lang) {
        //   const hljs = require('highlight.js')
        //   const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        //   return hljs.highlight(code, { language }).value
        // },
        highlight: function (code) {
          const hljs = require('highlight.js')
          return hljs.highlightAuto(code).value
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
      // console.log('1111')
      return marked.parse(this.md)
    },
    computedMD () {
      return this.$refs.markdownContent
    }
  },
  methods: {
    getParamas () {
      // 随机请求markdown文件
      const number = Math.ceil(Math.random() * 20)
      this.id = this.$route.params.id
      this.$http.get(`./markdown/article${number}.md`).then(res => {
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
                nodeName: e.nodeName,
                scrollTop: e.offsetTop
              })
            }
          })
        }, 100)
        this.catalog = titles
        // console.log(this.catalog)
        this.catalogLength = this.catalog.length
      })
    },
    handleScroll () {
      this.progress = parseInt((window.scrollY / document.documentElement.scrollHeight) * 100) + '%'
      // console.log(this.progress)
      for (let i = this.catalog.length - 1; i >= 0; i--) {
        const cata = this.catalog[i]
        if (cata.scrollTop <= window.scrollY) {
          if (this.currentTitle.id === cata.id) return
          Object.assign(this.currentTitle, cata)
          // console.log(this.currentTitle)
          return
        }
      }
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
      window.addEventListener('scroll', this.handleScroll)
    })
  }
}
</script>

<style src="../../assets/css/detail.css" scoped>
/* 这么做会污染全局样式 */
/* @import '../../assets/css/detail.css' */
</style>
