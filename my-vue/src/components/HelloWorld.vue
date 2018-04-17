<template>
  <div>
    <button class="btn btn-default" @click="myP = !myP">v-if</button>
    <p v-if="myP">{{textP}}</p>
    <p>{{1+1}}</p>
    <p>{{num + 1}}</p>
    <p>{{message.split("").reverse().join("")}}</p>
    <p><a :href="myUrl" target="_blank">v-bind绑定的url</a></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      myP: true,
      textP: '我通过v-if创建移除',
      num: 2,
      message: 'message',
      myUrl: 'http://www.baidu.com'

    }
  }
}
</script>