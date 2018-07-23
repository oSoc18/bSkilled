<!-- <template>
  <div>
    <v-header class="header-white"></v-header>
    <div class="created_bg">
      <div class="badge">
        <img src="../assets/badge.svg" alt="" width="189" height="167">
        <img class="badge-icon":src="share.implication.badgeTemplate.image" alt="" width="70" height="70">
        <svg class="is-hidden">
          <filter id="linear">
            <feColorMatrix
              type="matrix"
              values="0.1 -0.5 0 1.8 1.7
                      0 1 0 0 2.4
                      0 0 1 0 2
                      0 0 0 1 0 "/>
          </filter>
        </svg>
      </div>
      <p class="created-badge-name">{{share.implication.badgeTemplate.name}}</p>
      <h1>You created a badge!</h1>
      <p class="created-information">When you finish you’ll get an e-mail that contains all information of this badge</p>
      <v-button :onClick="HandlerNextPage">Let's finish!</v-button>
    </div>
  </div>
</template>

<script>
import Button from "Components/Button";
import Header from "Components/TheHeader";

export default {
  components: {
    "v-button": Button,
    "v-header": Header
  },
  props: {
    share: {
      sid: String,
      implication: {
        // TODO: Recipient should be IdentityObject
        recipient: String,
        badgeTemplate: Object
      }
    }
  },
  methods: {
    HandlerNextPage() {
      this.$router.push({ name: "share", params: { share: this.share } });
    },

    mounted() {
      console.log(share.implication.badgeTemplate.description);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.header-white {
  background: white;
  box-shadow: 0 0 40px 0 rgba(14,16,25,0.30);
}

.created_bg {
  background-color: $bgyellow;
  background-image: url(../assets/skill_illustration.png), url(../assets/skill_illustration.png);
  background-position: left bottom, right bottom;
  background-repeat: no-repeat;
  background-size: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 160px;
}

.created-information {
  width: 300px;
  line-height: 1.4;
  text-align: center;
  margin-bottom: 20px;
}

.created-badge-name {
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 35px;
  text-transform: lowercase;
}

.badge {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge-icon {
  position: absolute;
  filter: url('#linear');
  opacity: 0.6;
}


</style> -->
