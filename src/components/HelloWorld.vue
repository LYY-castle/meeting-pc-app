<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- <router-link :to="{ name: 'world' }">
      切到到 /world
    </router-link> -->

    <!-- <a-divider /> -->

    <div>
      <input class="m-r-5" v-model="value" />
      <span class="m-r-5">savedValue: {{ savedValue }}</span>
      <button class="m-r-5" @click="saveValue">save</button>
      <button @click="getValue">show</button>
    </div>

    <div class="m-t-5">
      <span class="m-r-5">counter: {{ counter }}</span>
      <button class="m-r-5" @click="increaseCounter">increase</button>
      <button class="m-r-5" @click="decreaseCounter">decrease</button>
      <button @click="initCounter">init</button>
    </div>
  </div>
</template>

<script>
import store from '@/utils/electron-store'
import { mapState } from 'vuex'

console.log('process.env.CTI_HOST =', process.env.CTI_HOST)

export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
    saveValue() {
      store.set('key', this.value)
    },
    getValue() {
      this.savedValue = store.get('key')
    },
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
