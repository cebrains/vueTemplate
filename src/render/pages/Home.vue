<template>
  <div>
     <el-button type="primary">主要按钮</el-button>
    <li v-for="item in value">{{item.a | dateFilter}}</li>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data: function () {
      return {
        a: '打撒撒所大所撒多',
        value:[{a:1,b:2},{a:1,b:2},{a:1,b:2},{a:1,b:2}]
      }
    },
    methods:{

    },
    mounted:function () {
      // this.$fetch.postAjax(this.$config.url1).then(response => {
      //   console.log(response);
      // })
    }
  }
</script>

<style scoped>

</style>
