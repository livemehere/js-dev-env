<template>
  <div>
    <h2>User Level : {{level}}</h2>
    <button @click="levelUp">level up</button>
  </div>
</template>

<script>
export default {
  name: 'User',
  data(){
    return {
      level:0
    }
  },
  methods:{
    levelUp(){
      this.level++;
    }
  }
}
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