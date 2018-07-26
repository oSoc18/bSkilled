<template>
  <header class="l-header" data-controller="navigation">
    <a href="" class="l-header__brand-logo">bSkilled</a>
    <nav class="l-navigation">
      <ul class="l-navigation__menu">
        <li class="l-navigation__menu__item">
        <a href="/#practical" v-on:click.prevent="practical()" >{{$t("TheHeader.practical")}}</a>
        </li>
        <li class=" l-navigation__menu__item">
          <a href="/#about" v-on:click.prevent="about()">{{$t("TheHeader.about")}}</a>
        </li>
        <li class=" l-navigation__menu__item l-navigation__menu__item--state-current">
          <router-link to="/create/search">{{$t("TheHeader.new")}}</router-link>
        </li>
        <li @click="changeLang" class=" l-navigation__menu__item l-navigation__menu__item--outlined">
          <!-- Chloë if you can style this it works too -->
          <!-- <v-select v-model="$i18n.locale" :options="langs"/> -->
          <p>{{lang}}</p>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      langs: ["en", "nl"]
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    }
  },
  methods: {
    changeLang() {
      const current = this.$i18n.locale;
      this.$i18n.locale = current == "en" ? "nl" : "en";
    },
    about() {
      this.$router.push({ name: "about" });
    },
    practical() {
      this.$router.push({ name: "practical" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.l-header {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;

  &__brand-logo {
    width: 145px;
    height: 50px;
    background: url("../assets/bskilled-logo.svg") no-repeat center center;
    text-indent: -9999px;
    margin-top: 0px;
  }
}

.l-navigation__menu {
  display: flex;
  margin-right: 5px;
  font-weight: 500;
}

.l-navigation__menu__item {
  margin-right: 30px;
  padding: 10px 0;
  border-radius: 100px;
  font-size: 14px;
  transition: all 0.2s;

  & a {
    padding: 10px 25px;
    color: $darkblue;
  }

  &--outlined {
    border: 1px solid $orange;
    & p {
      padding: 0 20px;
    }
    &:hover {
      color: $white;
    }
  }

  &--state-current,
  &:hover {
    background-color: $orange;

    & a {
      color: $white;
    }
  }
}
</style>
