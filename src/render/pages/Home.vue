<template>
  <div>
     <el-button type="primary">主要按钮</el-button>

    <li v-for="item in value">{{item}}</li>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data: function () {
      return {
        a: 111,
        value:[{a:1,b:2},{a:1,b:2},{a:1,b:2},{a:1,b:2}]
      }
    },
    mounted:function () {
      this.$fetch.postAjax(this.$config.url1).then(response => {
        console.log(response)
        /*this.$fetch.postAjax(this.$config.url3+'/'+response.requestId, {}).then(response => {
          console.log(response)
        })*/
      })


      this.value = this.value.map(val => {
        return Object.assign(val, {blo:true});
      })
    }
  }
</script>

<style scoped>

</style>
