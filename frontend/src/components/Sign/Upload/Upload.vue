<template>
  <div class="app">
    <v-header>test</v-header>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import Header from 'Components/Header'

  export default {
    name: 'app',
    components: {
      'v-header': Header,
    }
  }
</script>
