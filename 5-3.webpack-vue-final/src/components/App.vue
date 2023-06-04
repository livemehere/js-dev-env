<template>
  <div>
    <h1>App Component 2</h1>
    <h2>count: {{count}}</h2>
    <button @click="count++">+</button>
    <img :src="ImgSrc" alt="">
    <div>{{data}}</div>
  </div>
</template>

<script lang="ts">
import ImgSrc from '@public/pica.png';
import data from '@public/data.json';
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      count: 0,
      ImgSrc,
      data
    }
  }
})
</script>

<style>
 h1 {
  color: red;
}
</style>