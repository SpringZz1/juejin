<template>
    <el-container>
        <el-header >这是头部</el-header>
        <!-- 主要内容区 -->
        <el-main >
            <el-card class="box-card">
              <div slot="header" class="clearfix setting">
                <!-- 标签页 -->
                <ul class="nav-menu">
                  <li class="nav-item">
                    <a href="#" class="active">推荐</a>
                    <el-divider direction="vertical"></el-divider>
                  </li>
                  <li class="nav-item">
                    <a href="#">最新</a>
                    <el-divider direction="vertical"></el-divider>
                  </li>
                  <li class="nav-item">
                    <a href="#">热榜</a>
                    <el-divider direction="vertical"></el-divider>
                  </li>
                </ul>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>

        </el-main>
    </el-container>
</template>

<script>

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
    color: #909090;
    font-size: 14px;
  }

  .nav-item{
    display: inline;
    text-decoration: none;
    cursor: pointer;
    color: #909090;
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

  .nav-item a:hover{
    color:#1171ee;
  }

  .nav-item a.active{
    color:#1171ee;
  }

</style>
