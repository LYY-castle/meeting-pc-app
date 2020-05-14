<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <router-link :to="{ path: 'hello2' }">
      切到到 /hello2
    </router-link>

    <div>
      <input class="m-r-5" v-model="value" />
      <span class="m-r-5">savedValue: {{ savedValue }}</span>
      <button class="m-r-5" @click="saveValue">save</button>
      <button @click="getValue">show</button>
    </div>

    <div>
      <span class="m-r-5">counter: {{ counter }}</span>
      <button class="m-r-5" @click="increaseCounter">increase</button>
      <button @click="decreaseCounter">decrease</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
