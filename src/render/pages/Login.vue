<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li @click="Login">点击</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    login(){
      sessionStorage.setItem("userId", 'dsadssd');
      this.$router.push(this.$route.query.redirect);
    }
  }
}
</script>
