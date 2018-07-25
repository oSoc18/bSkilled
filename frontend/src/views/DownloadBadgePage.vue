<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <section class="section-right">
            <div class="section-right_container section-right_container-center">
              <div v-if="badge">
                <div v-if="badge.signed">
                  <img :src="imgUrl" alt="badge" width="auto" height="320">
                  <!-- <p>ASSERTION: {{JSON.stringify(badge.assertion)}}</p> -->
                  <div class="button-container">
                    <router-link to="/">
                      <Button class="button--blue">Download (fix me)</Button>
                    </router-link>
                    <router-link :to="`/`">
                      <Button class="button--line">Back to home</Button>
                    </router-link>
                  </div>
                </div>
                <div v-else>
                  <p>NOT SIGNED YET</p>
                  <router-link :to="`{ name: 'sign', params: { sid: {badge.sid}}`">
                    <Button>Sign</Button>
                  </router-link>
                  <router-link :to="`/`">
                    <Button>Back to home</Button>
                  </router-link>
                </div>
              </div>
              <div v-else>
                Loading...
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import Button from "Components/Button";
import Introduction from "Components/IntroductionOfPage";

export default {
  components: {
    Button,
    "v-introduction": Introduction,

   },
   data() {
     return {
       introductionContent: {
         title: "Your badge is signed, download it!",
         text:
           "We only use your personal information to create your badge and mail it to you."
       },
     };
   },
  computed: {
    badge() {
      return this.$store.state.badge;
    },
    imgUrl() {
      const badge = this.$store.state.badge;
      return `data:image/png;base64,${badge.imageBase64}`;
    }
  },
  methods: {
    fetchBadge() {
      this.$store.dispatch("fetchBadge", this.$route.params.sid);
    }
  },
  created() {
    this.fetchBadge();
  }
};
</script>
