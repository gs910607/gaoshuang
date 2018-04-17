<template>
  <div id="app">
    <vue-header></vue-header>
    <router-view/>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import vueHeader from "./layout/vueHeader";
import vueFooter from "./layout/vueFooter";

export default {
  name: 'App',
  components: {
    vueHeader,
    vueFooter
  },
  data(){
    return {

    }
  },
  created(){
    this.$router.push("/")
  },
  
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
html,
body,
div,
ul,
ol,
li,
p,
span,
em,
dl,
dt,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
header,
aside,
section,
article,
footer
 {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.btn {
  padding: 6px 15px;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
  border: 1px solid #ccc;
}
.btn.btn-default {
  background: #fff;
}
.btn.btn-primary {
  background: #409eff;
  border-color: #409eff;
}
.animated {
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
}
</style>
