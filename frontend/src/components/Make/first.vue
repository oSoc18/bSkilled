<template lang="html">
  <el-form :model="model":rules="rules" ref="form">
    <el-form-item label="What skill do you want to verify?" prop="skill">
      <el-input v-model="model.skill" placeholder="Search"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data(){
		return {
      model: {
        skill: '',
      },
      rules: {
        skill: [{
          required: true,
          message: 'Search for a skill',
          trigger: 'blur'
        }]
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
