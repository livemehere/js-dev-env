<template>
  <div>
    <h1>App Component</h1>
    <p>{{ msg }}</p>
    <User/>
  </div>
</template>

<script>
import User from "./User";

export default {
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
}
</script>

