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
      </ul>
    </nav>
  </header>
</template>

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
    background: url('../assets/bskilled-logo.svg') no-repeat center center;
    background-size: contain;
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
  transition: all .2s;

  & a {
    padding: 10px 25px;
    color: $darkblue;
  }

  &--state-current, &:hover   {
    background-color: $orange;

    & a {
      color: $white;
    }
  }
}


</style>
