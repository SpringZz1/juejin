<template>
    <el-container>
        <el-header >这是头部</el-header>
        <!-- 主要内容区 -->
        <el-main >
            <el-card class="box-card">
              <div slot="header" class="clearfix setting">
                <!-- 标签页 -->
                <ul class="nav-menu">
                  <!-- <li class="nav-item active">
                    <router-link to="/" exact-active-class="eac">推荐</router-link>
                    <el-divider direction="vertical"></el-divider>
                  </li>
                  <li class="nav-item">
                    <router-link to="/newest">最新</router-link>
                    <el-divider direction="vertical"></el-divider>
                  </li>
                  <li class="nav-item">
                    <router-link to="/hotList">热榜</router-link>
                    <el-divider direction="vertical"></el-divider>
                  </li> -->
                  <li v-for="(item, index) in linkItem" class="nav-item" :key="index">
                  <router-link :to="item.src" exact-active-class="eac">
                  {{item.content}}
                  <!-- <el-divider direction="vertical"></el-divider> -->
                  </router-link>
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
      linkItem: [
        { src: '/', content: '推荐' },
        { src: '/newest', content: '最新' },
        { src: '/hotList', content: '热榜' }
      ]
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

  /* .nav-item::before{
    border-left: 1px solid #1171ee;
  } */

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
</style>
