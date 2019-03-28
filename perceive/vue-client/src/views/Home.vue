<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Subject, interval } from 'rxjs'

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      timer: null
    }
  },
  beforeMount () {
    this.timer = new Subject()
    interval(3000).subscribe((value) => {
      this.timer.next(value)
    })
    this.timer.subscribe((value) => {
      console.log(value)
    })
  }
}
</script>
