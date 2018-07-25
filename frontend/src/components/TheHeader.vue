<template>
  <header class="l-header" data-controller="navigation">
    <a href="" class="l-header__brand-logo">bSkilled</a>
    <nav class="l-navigation">
      <ul class="l-navigation__menu">
        <li class="l-navigation__menu__item">
          <a href="/">Practical information</a>
        </li>
        <li class=" l-navigation__menu__item">
          <a href="/">About the project</a>
        </li>
        <li class=" l-navigation__menu__item l-navigation__menu__item--state-current">
          <router-link to="/create/search">Make a new badge</router-link>
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
    width: 115px;
    height: 35px;
    background: url("../assets/bee.svg") no-repeat center center;
    background-size: contain;
    text-indent: -9999px;
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
