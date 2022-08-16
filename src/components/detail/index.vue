<template>
  <div>
    详情界面
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 0
    }
  },
  methods: {
    getParamas () {
      this.id = this.$route.params.id
      console.log(this.id)
    }
  },
  created () {
    this.getParamas()
  }
}
</script>

<style>
</style>
