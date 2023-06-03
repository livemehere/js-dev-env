<template>
  <div>
    <h2>User Level : {{level}}</h2>
    <button @click="levelUp">level up</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type Data = {
  level: number
}

export default Vue.extend({
  name: 'User',
  data():Data{
    return {
      level:0
    }
  },
  methods:{
    levelUp(){
      this.level++;
    },
    powerUp(mount:number){
      this.level += mount;
    }

  }
})
</script>

<style scoped lang="less">
  h2{
    color: red;
  }
  div {
    button{
      padding: 4px 16px;
      font-weight: 600;
    }
  }
</style>