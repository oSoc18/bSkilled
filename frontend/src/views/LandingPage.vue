<template>
  <div>
    <v-header class="l-header-white"></v-header>
      <!-- <h1>{{$t("landing.welcome")}}</h1> -->
    <section class="section-intro section-right-bg">
      <div class="intro-text-container">
        <p class="p-landing">My friend is amazing with a guitar, <br> I am good with communication,</p>
        <h1 class="h1-landing">What is your skill?</h1>
        <router-link to="/create/search">
          <Button class="button--landing">Create a badge</Button>
        </router-link>
      </div>
    </section>
    <section class="section-landing">
      <img src="../assets/header_why.png" alt="" width="624" height="479">
      <div class="container-landing">
        <h1 class="h1-landing h1-title-text">Why use bSkilled?</h1>
        <p class="p-landing">bSkilled gives you the opportunity to get your skills verified and certified by an employer, a teacher, an organisation… Getting a badge for one of your skills is a symbol of accomplishment, packed with verifiable data that can be shared across the web. This way it allows a future recruiter to trust your skills when seeing the badges that you got from bSkilled. Thanks to bSkilled you are also able to become a little bee, make connections with the others and be part of the open badges community.</p>
      </div>
    </section>
    <section class="section-spotlight">
      <div class="spotlight">
        <div class="spotlight_item">
          <img src="../assets/badge_icon.svg" alt="" width="35" height="60">
          <p>You can get your own badge certified by an organisation itself.</p>
        </div>
        <div class="spotlight_item">
          <img src="../assets/save-money_icon.svg" alt="" width="80" height="56">
          <p>You can have your skills certified without spending one single dollar!</p>
        </div>
        <div class="spotlight_item">
          <img src="../assets/backpack_icon.svg" alt="" width="48" height="53">
          <p>All of you badges are decentralised, no need to depend on a website.</p>
        </div>
      </div>
    </section>
    <section class="section-landing">
      <img src="../assets/skill_illustration.png" alt="" width="527" height="403">
      <div class="container-landing">
        <h1 class="h1-landing h1-title-text">How does bSkilled work?</h1>
        <ul class="p-landing list-landing">
          <li>
            - Make a badge that represents one of your skills.
          </li>
          <li>
            - Receive a link &amp; send it to one of your connections so they can sign it.
          </li>
          <li>
            - This person will be then able to sign your badge with this link.
          </li>
          <li>
            - Once the badge is signed, download it and save it!
          </li>
          <li>
            - Use the badge wherever you want!
          </li>
        </ul>
      </div>
    </section>
    <section class="section-cta">
      <img src="../assets/skill_illustration.png" alt="" width="527" height="403">
      <div class="container-landing container-cta">
        <h1 class="h1-landing h1-title-text">Use bSkilled</h1>
        <p class="p-landing">Get acknowledged for your skills by letting your connections endorse and verify your qualities with Open Badges in an easy, reliable and standardised way.</p>
        <router-link to="/create/search">
          <Button class="button--landing">Create a badge</Button>
        </router-link>
      </div>
    </section>
    <section class="section-slogan">
      <h1>bSkilled <br> bVerified <br> bConnected</h1>
      <div class="social-media">
        <p>Follow us on:</p>
        <div class="social-media_icons">
          <a href="https://twitter.com/bSkilled1"><img src="../assets/twitter_logo.svg" alt="" width="auto" height="18"></a>
          <a href="https://www.facebook.com/bskilledd"><img src="../assets/facebook_logo.svg" alt=""  width="auto" height="20"></a>
          <a href="https://www.linkedin.com/company/bskilled1/"><img src="../assets/linkedin_logo.svg" alt="" width="auto" height="20"></a>
          <a href="https://github.com/oSoc18/bSkilled"><img src="../assets/github_logo.svg" alt=""  width="auto" height="22">></a>

        </div>
      </div>
    </section>
    <section class="section-copyright">
      <p>&copy; bSkilled </p>
      <div class="partner-logos">
        <a href="http://www.thelearninghub.be/"><img src="../assets/thelearninghub.svg" alt="" width="auto" height="40"></a>
        <a href="https://www.vdab.be/"><img src="../assets/vdab.svg" alt="logo vdab" width="auto" height="35"></a>
        <a href="https://cronos-groep.be/"><img src="../assets/compas.svg" alt="logo compas" width="auto" height="25"></a>
        <a href="https://cronos-groep.be/"><img src="../assets/cronos.svg" alt="logo cronos" width="auto" height="55"></a>
        <a href="https://www.poolstok.be/"><img src="../assets/poolstok.svg" alt="logo poolstok" width="auto" height="55"></a>
        <a href="http://cogni.zone/"><img src="../assets/cognizone.svg" alt="logo cognizone" width="auto" height="55"></a>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "Components/Button";
import Header from "Components/TheHeader";

export default {
  components: {
    Button,
    "v-header": Header
  },
  activated() {
    this.$store.commit("SET_FLOW_MODE", "sharing");
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.l-header-white {
  background: $white;
  box-shadow: 0 0 40px 0 rgba(14, 16, 25, 0.3);
  position: fixed;
}

.section-intro {
  background: $bgyellow url(../assets/header_bg.png)  60% 2000% no-repeat;
  background-size: 72%;
  box-shadow: 0 0 40px 0 rgba(48, 53, 92, 0.3);
  height: 810px;
  width: 100vw;
}

.intro-text-container {
  display: flex;
  flex-direction: column;
  padding-top: 170px;
  padding-left: 285px;
}

.h1-landing {
  font-size: 35px;
  margin-bottom: 15px;
  margin-top: 5px;
}

.h1-title-text {
  margin-bottom: 40px;
}

.p-landing {
  line-height: 1.7;
  font-size: 18px;
  width: 415px;
}

.list-landing {
  width: 540px;
  line-height: 2.8;
}

.section-landing {
  padding-top: 100px;
  padding-left: 140px;
  display: flex;
}

.container-landing {
  margin-left: 90px;
  margin-top: 40px;
}

.section-spotlight {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  margin-top: 235px;
}

.spotlight {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1010px;
}

.spotlight_item {
  width: 240px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & p {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
    text-align: center;
    margin-top: 20px;
  }
}

.section-cta {
  display: flex;
  height: 610px;
  margin-top: 115px;
  background: $bgyellow;
  box-shadow: 0 0 40px 0 rgba(48, 53, 92, 0.3);
  padding-top: 90px;
  padding-left: 130px;
}

.container-cta {
  margin-left: 60px;
  margin-top: 80px;

  & h1 {
    margin-bottom: 20px;
  }

  & .button--landing {
    margin-top: 30px;
  }
}

.section-slogan {
  height: 405px;
  background: #0e1019 url(../assets/bg_slogan.svg) right -112% no-repeat;
  background-size: 54%;

  & h1 {
    color: #ffead9;
    padding-top: 125px;
    padding-left: 290px;
    font-size: 40px;
    line-height: 1.3;
  }

  .social-media {
    color: #ffead9;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 55px;
    margin-right: 165px;

    &_icons {
      width: 170px;
      display: flex;
      justify-content: space-between;
      margin-left: 30px;
    }
  }
}

.section-copyright {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    color: $lightgrey;
    font-size: 18px;
    padding-left: 135px;
  }
}

.partner-logos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 820px;
  margin-right: 80px;
}
</style>
