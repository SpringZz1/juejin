<template>
    <el-container>
        <el-header >这是头部</el-header>
        <!-- 主要内容区 -->
        <el-main >
            <!-- 标签页 -->
              <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="推荐" name="recommand">推荐</el-tab-pane>
                <el-tab-pane label="最新" name="latest">最新</el-tab-pane>
                <el-tab-pane label="热榜" name="hotList">热榜</el-tab-pane>
              </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'recommand'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
    padding-top: 5px;
    margin-top: 10px; /* 距离上方有段距离 */
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  /* .el-tabs {
    border-right: 1px solid gray;
  } */
</style>
