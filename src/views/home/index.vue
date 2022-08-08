<template>
    <el-container>
        <el-header >这是头部</el-header>
        <!-- 主要内容区 -->
        <el-main >
            <el-card class="box-card">
              <div slot="header" class="clearfix setting">
                <!-- 标签页 -->
                <ul class="nav-menu">
                  <li v-for="(item, index) in linkItem" class="nav-item" :key="index"
                  @click="activeItem(item, index)"
                  >
                  <router-link :to="item.src" :class="[activeIndex===index? 'eac':'']" >
                  {{item.content}}
                  </router-link>
                  </li>
                  <!-- 选择器 -->
                  <li class="nav-item">
                    <el-select v-if="activeIndex===2" v-model="value" placeholder="三天内" size="mini" style="width=30px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                    </el-select>
                  </li>
                </ul>
              </div>
              <!-- <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div> -->
             <router-view></router-view>
            </el-card>

        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // 默认激活下标为0的推荐标签
      activeIndex: 0,
      linkItem: [
        { src: '/', content: '推荐' },
        { src: '/newest', content: '最新' },
        { src: '/hotList', content: '热榜' }
      ],
      options: [{
        value: '选项1',
        label: '三天内'
      }, {
        value: '选项2',
        label: '七天内'
      }, {
        value: '选项3',
        label: '三十天内'
      }, {
        value: '选项4',
        label: '全部'
      }
      ],
      value: ''
    }
  },
  methods: {
    activeItem (item, index) {
      this.activeIndex = index
    }
  }
}
</script>

<style>
  body{
    background-color: #e4e6eb;
  }

  .el-container{
    margin: 0 auto; /* 水平居中 */
    text-align: center;
    width: 60%;
  }

  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-main {
    margin-top: 10px; /* 距离上方有段距离 */
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  nav-menu{
    text-decoration: none;
    list-style: none;
    padding-left: -50px;
  }

  .nav-item a{
    text-decoration: none;
    cursor: pointer;
    /* color: #909090; */
    font-size: 14px;
  }

  .nav-item{
    display: inline;
    text-decoration: none;
    cursor: pointer;
    float: left;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .el-card__header{
    padding-left: 0px;
    padding-top: 0px;
    padding-bottom: 10px;
  }

  .box-card {
    width: 80%;
  }

  .nav-item a:visited{
    color: #909090;
  }

  .nav-item a:hover{
    color:#1171ee;
  }

  .nav-item a:active{
    color:#1171ee;
  }

  .eac{
    /* 这里使用!important来提高优先级 */
    color:#1171ee !important;
  }

  .nav-item a::after{
    display: inline-block;
    height: 13px;
    margin: 0px 10px;
    border-right: 0.5px solid #66666648;
    content: '';
  }

  .el-input__inner{
    border:1px solid #dcdfe6;
    width: 90px;
  }

</style>
