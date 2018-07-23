<template>
  <section class="section-introduction">
    <div class="is-fixed introduction-container">
      <h1>{{introductionContent.title}}</h1>
      <p>{{introductionContent.text}}</p>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    introductionContent: {
      title: String,
      text: String,
    },
  }
};

</script>


<style lang="scss" scoped>
@import "~Vars";

.section-introduction {
  width: 37%;
  min-height: 100vh;
  background: $bgyellow url(../assets/skill_illustration.png) -7% 100% no-repeat;
  background-attachment: fixed;
  background-size: 50%;
  padding-top: 175px;
  padding-left: 75px;
}

.introduction-container {
  width: 330px;

  & p  {
    line-height: 1.4;
  }
}

</style>
