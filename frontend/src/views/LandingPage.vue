<template>
  <div>
    <v-header class="l-header-white"></v-header>
    <section class="section-intro">
      <div class="intro-text-container">
        <p class="p-landing">My friend is amazing with a guitar, <br> I am good with communication,</p>
        <h1 class="h1-landing">What is your skill?</h1>
        <router-link to="/create/search">
          <Button class="button--landing">Create a badge</Button>
        </router-link>
      </div>
    </section>
    <section class="section-landing">
      <img src="../assets/skill_illustration.png" alt="" width="527" height="403">
      <div class="container-landing">
        <h1 class="h1-landing h1-title-text">Why use bSkilled?</h1>
        <p class="p-landing">bSkilled gives you the opportunity to get your skills verified and certified by an employer, a teacher, an organisation… Getting a badge for one of your skills is a symbol of accomplishment, packed with verifiable data that can be shared across the web. This way it allows a future recruiter to trust your skills when seeing the badges that you got from bSkilled. Thanks to bSkilled you are also able to become a little bee, make connections with the others and be part of the open badges community.</p>
      </div>
    </section>
    <section class="section-spotlight">
      <div class="spotlight">
        <div class="spotlight_item">
          <img src="../assets/teamleader.svg" alt="" width="50" height="66">
          <p>You can get your own badge certified by an organisation itself.</p>
        </div>
        <div class="spotlight_item">
          <img src="../assets/teamleader.svg" alt="" width="50" height="66">
          <p>You can have your skills certified without spending one single dollar!</p>
        </div>
        <div class="spotlight_item">
          <img src="../assets/teamleader.svg" alt="" width="50" height="66">
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
  </div>
</template>

<script>
import Button from "Components/Button";
import Header from "Components/TheHeader";

export default {
  components: {
    Button,
    "v-header": Header
   }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.l-header-white {
  background: $white;
  box-shadow: 0 0 40px 0 rgba(14,16,25,0.30);
}

.section-intro {
  background: $bgyellow url(../assets/skill_illustration.png) center 1403% no-repeat;
  background-size: 72%;
  box-shadow: 0 0 40px 0 rgba(48,53,92,0.30);
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
  padding-top: 170px;
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
  margin-bottom: 30px;
  margin-top: 165px;
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
  }
}

.section-cta {
  display: flex;
  height: 575px;
  margin-top: 145px;
  background: $bgyellow;
  box-shadow: 0 0 40px 0 rgba(48,53,92,0.30);
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

</style>
