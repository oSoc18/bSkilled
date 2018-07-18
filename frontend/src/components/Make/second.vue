<template>
  <div>
    <h1>Personal information</h1>
    <h2>we only use your personal information to create a badge and mail it to you.</h2>
    <el-form :model="model":rules="rules" ref="form">
      <el-form-item label="First name" prop="firstName">
        <el-input v-model="model.firstName" placeholder="First name"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastName">
        <el-input v-model="model.lastName" placeholder="Last name"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="model.email" placeholder="Email"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
		return {
      model: {
        firstName: '',
        lastName: '',
        email: ''
      },
      rules: {
        firstName: [{
          required: false
        }],
        lastName: [{
          required: false
        }],
         email: [{
          required: true,
          message: 'Please fill in an email adress',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: 'This email adress is invalid',
          trigger: 'change'
        }],
      }
	}},
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          this.$emit('on-validate', valid, this.model)
          resolve(valid);
        });
      })

    }
  }

}
</script>

<style>

</style>
