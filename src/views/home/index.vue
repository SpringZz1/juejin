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
                    <el-select v-if="activeIndex===2" v-model="value" placeholder="三天内" size="mini" class="nav-item">
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
@import '../../assets/css/index.css';
</style>
