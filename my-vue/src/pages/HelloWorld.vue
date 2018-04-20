<template>
  <div class="pic">
    <ul>
      <li class="pic1">
        <a href="javascript:;">
          <div class="txt">
            <p class="p1">雨红了枫叶 ，枫叶红了山头 ，山头红了整个秋</p>
          </div>
        </a>
      </li>

      <li class="pic2">
        <a href="javascript:;">
          <div class="txt">
            <p class="p1">莫愁前路无知己 ,天下谁人不识君 。</p>
          </div>
        </a>
      </li>

      <li class="pic3">
        <a href="javascript:;">
          <div class="txt">
            <p class="p1">你能看到多远的过去 ，就能看到多远的未来。</p>
          </div>
        </a>
      </li>

      <li class="pic4">
        <a href="javascript:;">
          <div class="txt">
            <p class="p1">编不下去了 。 。 。 。  。</p>
          </div>
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
import jqSfq from '../assets/jQuerySfq/js/index.js'
export default {
  name: 'HelloWorld',
  data() {
    return {


    }
  },
  mounted: function(){
    jqSfq();
  }
}
</script>

<style scoped>
@import '../assets/jQuerySfq/css/index.css'
</style>