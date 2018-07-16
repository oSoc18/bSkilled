<template>
  <div id="app">
    <v-header>Seems like you want to sign a badge</v-header>
    <v-button :onClick="consoleClick">Sign the badge</v-button>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from 'Components/Header'
  import Button from 'Components/Button'

  export default {
    name: 'app',
    components: {
      'v-header': Header,
      'v-button': Button
    },
    methods: {
      consoleClick() {
        console.log('Button clicked')
      }
    }
  }
</script>
