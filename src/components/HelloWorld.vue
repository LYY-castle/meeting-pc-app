<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <router-link :to="{ name: 'world' }">
      切到到 /world
    </router-link>

    <a-divider />

    <div class="m-t-5">
      <span class="m-r-5">counter: {{ counter }}</span>
      <button class="m-r-5" @click="increaseCounter">increase</button>
      <button class="m-r-5" @click="decreaseCounter">decrease</button>
      <button @click="initCounter">init</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

console.log('process.env =', process.env)

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: false,
      default: 'HelloWorld'
    }
  },
  data() {
    return {
      value: '',
      savedValue: ''
    }
  },
  computed: {
    ...mapState({
      counter: state => state.counter.counter
    })
  },
  methods: {
    increaseCounter() {
      this.$store.dispatch('increaseCounter')
    },
    decreaseCounter() {
      this.$store.dispatch('decreaseCounter')
    },
    initCounter() {
      this.$store.dispatch('initCounter')
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
