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
          <a href="/">Make a new badge</a>
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
    width: 115px;
    height: 35px;
    background: url('../assets/bee.svg') no-repeat center center;
    background-size: contain;
    text-indent: -9999px;
  }
}

.l-navigation__menu {
  display: flex;
  margin-right: 5px;
  font-weight: 700;
}

.l-navigation__menu__item {
  margin-right: 30px;
  padding: 10px 0;
  border-radius: 100px;
  font-size: 14px;
  transition: all .2s;

  & a {
    padding: 10px 25px;
    color: #30355C;
  }

  &--state-current, &:hover   {
    background-color: #ff6b36;

    & a {
      color: #ffffff;
    }
  }
}


</style>
