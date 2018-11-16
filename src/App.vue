<template>
  <div id="app">
    <img src="./assets/logo.png">

    <h1>Scroll Behavior</h1>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/foo">/foo</router-link></li>
      <li><router-link to="/bar">/bar</router-link></li>
      <li><router-link to="/bar#anchor">/bar#anchor</router-link></li>
    </ul>
    <transition :name="transitionName">
      <router-view/>
    </transition>

    <!--存在同一个组件不刷新，需要去监听$route或者beforeRouteUpdate，现在可以通过加key唯一-->
    <!--<router-view :key="$route.fullPath"></router-view>
    <router-view :key="Date.now()"></router-view>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      transitionName:''
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.slide-left-enter-active {
  transition: all .3s ease;
}
.slide-left-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
