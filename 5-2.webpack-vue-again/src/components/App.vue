<template>
  <div>
    <h1>App Component</h1>
    <p>{{ msg }}</p>
    <User/>
  </div>
</template>

<script lang="ts">
import User from "./User";
import Vue from "vue";

export default Vue.extend({
  name: 'App',
  components: {
    User
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    sayHello () {
      alert('Hello')
    }
  }
})
</script>

