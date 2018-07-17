<template>
  <div class="form_generate-key">
    <v-header>Let's get a personal key</v-header>
    <form v-if="!submitted">
      <label>First name</label>
      <input type="text" v-model.lazy="key.firstName"  />
      <label>Last name</label>
      <input type="text" v-model.lazy="key.lastName" />
      <label>E-mail adress</label>
      <input type="text" v-model.lazy="key.email" />
      <label>Company name</label>
      <input type="text" v-model.lazy="key.company" required />
      <label>Website url</label>
      <input type="text" v-model.lazy="key.url" required />
      <button v-on:click.prevent="post">Get your personal key</button>
    </form>
    <div v-if="submitted">
      <h1>You can download your personal key and use it to sign andy badge.</h1>
    </div>
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
    data () {
        return {
            key: {
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                url: ''

            },
            submitted: false
        }
    },
    methods: {
        post: function(){
            this.$http.post('http://jsonplaceholder.typicode.com/posts', {
                title: this.key.firstName,
                body: this.key.lastName,
                userId: 1
            }).then(function(data){
                console.log(data);
                this.submitted = true;
            });
        }
    }
  }

</script>

<style>

  label{
    display: block;
    margin: 20px 0 10px;
  }
  input[type="text"]{
      display: block;
      width: 100%;
      padding: 8px;
  }

  .form_generate-key {
    width: 500px;
  }

</style>
