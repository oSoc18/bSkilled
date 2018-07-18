<template>
		<form-wizard @on-complete="onComplete"
		ref="wizard" :start-index.sync="activeTabIndex"
		shape="square" color="#f6c060" error-color="#f6c060">
      <tab-content title="Search for your skill""
			 :before-change="() => validate('firstStep')">
       <first-step ref="firstStep" @on-validate="onStepValidate"></first-step>
      </tab-content>

      <tab-content title="Some personal information""
			:before-change="() => validate('secondStep')">
        <second-step ref="secondStep" @on-validate="onStepValidate"></second-step>
      </tab-content>

      <tab-content title="Save your badge">
        <third-step ref="thirdStep" @on-validate="onStepValidate"></third-step>
      </tab-content>

		</form-wizard>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import FirstStep from "./first.vue";
import SecondStep from "./second.vue";
import ThirdStep from "./third.vue";

export default {
  name: "app",
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    'form-wizard': FormWizard,
    'tab-content': TabContent
  },
  data() {
    return {
      finalModel: {},
      activeTabIndex: 0
    };
  },
  methods: {
    onComplete() {
      alert("Yay. Done!");
    },
    validate(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidate(validated, model) {
      if (validated) {
        this.finalModel = { ...this.finalModel, ...model };
      }
    }
  }
};
</script>

<style>

.wizard-header {
  display: none;
}

</style>
