<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent" :bgimage="bgimage"></v-introduction>
    <section class="section-right section-right-bg">
      <div class="section-right_container section-right_container-center">
        <div class="container container-animation">
          <section class="section-right">
            <div class="section-right_container section-right_container-center">
              <div v-if="badge">
                <div v-if="badge.signed" class="badge-signed-container">
                  <img :src="imgUrl" alt="badge" width="auto" height="250">
                  <img class="verified-img" src="../assets/checked.svg" alt="" width="auto" height="70">
                  <div class="created-badge-bg">
                    <p class="created-badge-name">{{$store.state.badge.implication.badgeTemplate.name}}</p>
                    <p class="created-badge-recipient">Recipient: <span>{{$store.state.badge.implication.recipient}}</span> </p>
                    <p class="">{{$store.state.badge.implication.badgeTemplate.description}}</p>
                  </div>
                  <!-- <p>ASSERTION: {{JSON.stringify(badge.assertion)}}</p> -->
                  <div class="button-container button-container-height">
                    <a :href="imgUrl" download class="button button--blue">Download your badge</a>
                    <a href="/" class="button button--line">Back to home</a>
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
           "Your skill is verified, you can now download it and share it with other people to show what you're capable of."
       },
       bgimage: {
         img: "./signing_step4.png",
         position: "355px",
         size: "40%",
         left: "-30px"
       }
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


<style lang="scss" scoped>
@import "~Vars";

.p-information {
  line-height: 1.5;
  color: $darkblue;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 340px;
}

.button-container {
  width: 200px;
}

.badge-signed-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.verified-img {
  position: absolute;
  pointer-events: none;
  top: 185px;
  right: 75px;
}

.created-badge-bg{
  color: $darkblue;
  font-size: 14px;
  box-shadow: 0 0 8px 0 rgba(48, 53, 92, 0.25);
  line-height: 1.5;
  width: 400px;
  border-radius: 5px;
  padding: 25px 40px;
  margin-top: 30px;
  margin-bottom: 25px;
}


.created-badge-recipient {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 3px;
  margin-top: 10px;

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
  }
}

.created-badge-name {
  font-weight: 700;
  font-size: 17px;
  text-transform: lowercase;
  color: $darkblue;
}

.button {
  background: $button;
  text-align: center;
  border: none;
  border-radius: 100px;
  color: #fff;
  cursor: pointer;
  padding: 13px 30px;
  font-size: 13px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: darken($button, 10);
  }
}

.button--blue {
  background: $darkblue;

  &:hover {
    background: darken($darkblue, 5);
  }
}

.button-container-height {
  height: 100px;
}

.button--line {
  background: none;
  border: 2px solid $darkblue;
  padding: 10px 30px;
  color: $darkblue;

  &:hover {
    background: $darkblue;
    color: $white;
  }
}

</style>
