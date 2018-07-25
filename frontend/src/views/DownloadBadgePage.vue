<template>
  <div class="row-page">
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <div v-if="badge">
          <p>SID: {{badge.sid}}</p>
          <div v-if="badge.signed">
            <p>SIGNED</p>
            <p>URL: {{badge.url}}</p>
            <img :src="imgUrl" alt="badge">
            <!-- <p>ASSERTION: {{JSON.stringify(badge.assertion)}}</p> -->
            <router-link to="/">
              <Button>Download (fix me)</Button>
            </router-link>
            <router-link :to="`/`">
              <Button>Back to home</Button>
            </router-link>
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
</template>

<script>
import Button from "Components/Button";

export default {
  components: { Button },
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

