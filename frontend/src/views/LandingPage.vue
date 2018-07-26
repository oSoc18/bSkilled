<template>
  <div>
    <v-header class="l-header-white"></v-header>
      <!-- <h1>{{$t("landing.welcome")}}</h1> -->
    <section class="section-intro section-right-bg">
      <div class="intro-text-container">
        <p class="p-landing">{{$t("landing.intro.top")}}</p>
        <h1 class="h1-landing">{{$t("landing.intro.title")}}</h1>
        <router-link to="/create/search">
          <Button class="button--landing">{{$t("landing.intro.button")}}</Button>
        </router-link>
      </div>
    </section>
    <section class="section-landing">
      <img src="../assets/header_why.png" alt="" width="464" height="510" class="img-why">
      <div class="container-landing">
        <h1 class="h1-landing h1-title-text">{{$t("landing.landing.why")}}</h1>
        <p class="p-landing">{{$t("landing.landing.answer")}}</p>
      </div>
    </section>
    <section class="section-spotlight">
      <div class="spotlight">
        <div class="spotlight_item">
          <img src="../assets/badge_icon.svg" alt="" width="35" height="60">
          <p>{{$t("landing.spotlight.certified")}}</p>
        </div>
        <div class="spotlight_item">
          <img src="../assets/save-money_icon.svg" alt="" width="80" height="56">
          <p>{{$t("landing.spotlight.free")}}</p>
        </div>
        <div class="spotlight_item">
          <img src="../assets/backpack_icon.svg" alt="" width="48" height="53">
          <p>{{$t("landing.spotlight.decentralised")}}</p>
        </div>
      </div>
    </section>
    <section class="section-landing">
      <img src="../assets/header_how.png" alt="" width="584" height="439">
      <div class="container-landing">
        <h1 class="h1-landing h1-title-text">{{$t("landing.functionality.how")}}</h1>
        <ul class="p-landing list-landing">
          <li>
            {{$t("landing.functionality.make")}}
          </li>
          <li>
            {{$t("landing.functionality.recieve")}}
          </li>
          <li>
            {{$t("landing.functionality.sign")}}
          </li>
          <li>
            {{$t("landing.functionality.download")}}
          </li>
          <li>
            {{$t("landing.functionality.use")}}
          </li>
        </ul>
      </div>
    </section>
    <section class="section-cta">
      <div class="container-landing container-cta">
        <h1 class="h1-landing h1-title-text">{{$t("landing.cta.title")}}</h1>
        <p class="p-landing">{{$t("landing.cta.getacknowledged")}}</p>
        <router-link to="/create/search">
          <Button class="button--landing">{{$t("landing.cta.create")}}</Button>
        </router-link>
      </div>
      <img src="../assets/header_use.png" alt="" width="400" height="495">
    </section>
    <section class="section-slogan">
      <h1>{{$t("landing.slogan.skilled")}} <br> {{$t("landing.slogan.verified")}} <br> {{$t("landing.slogan.connected")}}</h1>
      <div class="social-media">
        <p>{{$t("landing.slogan.follow")}}</p>
        <div class="social-media_icons">
          <a href="https://twitter.com/bSkilled1"><img src="../assets/twitter_logo.svg" alt="" width="auto" height="18"></a>
          <a href="https://www.facebook.com/bskilledd"><img src="../assets/facebook_logo.svg" alt=""  width="auto" height="20"></a>
          <a href="https://www.linkedin.com/company/bskilled1/"><img src="../assets/linkedin_logo.svg" alt="" width="auto" height="20"></a>
          <a href="https://github.com/oSoc18/bSkilled"><img src="../assets/github_logo.svg" alt=""  width="auto" height="22">></a>

        </div>
      </div>
    </section>
    <section class="section-copyright">
      <p>&copy; {{$t("landing.slogan.skilled")}} </p>
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
  padding-left: 110px;
  display: flex;
}

.container-landing {
  margin-left: 60px;
  margin-top: 40px;
}

.section-spotlight {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 110px;
  margin-top: 205px;
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
  padding-top: 60px;
  padding-left: 190px;
}

.container-cta {
  margin-right: 120px;
  margin-top: 130px;

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

.img-why {
  margin-left: 50px;
  margin-right: 40px;
}
</style>
