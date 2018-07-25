<template>
  <section class="section-introduction" ref="sectionImg">
    <div class="is-fixed introduction-container">
      <h1>{{introductionContent.title}}</h1>
      <p>{{introductionContent.text}}</p>
    </div>
  </section>
</template>

<script>
 var images = require.context('../assets', true,  /.png/);

export default {
  props: {
    introductionContent: {
      title: String,
      text: String,
    },
    bgimage: {
      img: String,
      position: String,
      size: String,
      left: String
    }
  },
  mounted() {
    this.img_src = images(this.bgimage.img)

    this.$refs.sectionImg.style.background = `#fccd77 url(${this.img_src}) no-repeat ${this.bgimage.left} ${this.bgimage.position}`;
    this.$refs.sectionImg.style.backgroundSize = this.bgimage.size
  }
};



</script>


<style lang="scss" scoped>
@import "~Vars";

.section-introduction {
  width: 37%;
  min-height: 100vh;
  padding-top: 155px;
  padding-left: 75px;
}

.introduction-container {
  width: 330px;

  & p  {
    line-height: 1.4;
  }
}

</style>
