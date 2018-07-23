<template>
  <nav class="nav-progressbar">
    <ul class="progressbar">
      <li class="progressbar_item" v-bind:class="{'current': currentPage.search, 'visited': visitedPage.search, 'visited-animation': checkVisitedSearch(pageVisited)}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPage.search}" href="#" @click="$router.go(-1)">Search for your skill</a></li></li>
      <li class="progressbar_item" v-bind:class="{'current': currentPage.information, 'visited': visitedPage.information, 'visited-animation': checkVisitedInformation(pageVisited), 'visited-delay': checkVisitedSearch(pageVisited)}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPage.information}" href="#" @click="$router.go(-1)">Some personal information</a></li>
      <li class="progressbar_item" v-bind:class="{'current': currentPage.save, 'visited': visitedPage.save}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPage.save}" href="#" @click="$router.go(-1)">Save your badge</a></li>
    </ul>

    <div class="content">
  <div class="line"></div>
  <div class="line2"></div>
  <div class="circle"></div>
</div>
  </nav>
</template>

<script>

export default {
  props: {
    visitedPage: {
      search: Boolean,
      information: Boolean,
      save: Boolean,
    },
    currentPage: {
      search: Boolean,
      information: Boolean,
      save: Boolean,
    },
    pageVisited: Number
  },
  methods: {
    checkVisitedSearch(int) {
      return int === 1
    },
    checkVisitedInformation(int) {
      return int === 2
    }
  }
};

</script>

<style lang="scss" scoped>
@import "~Vars";

.nav-progressbar {
  position: fixed;
  left: 42%;
}

.progressbar {
  width: 150px;
  counter-reset: step;
  padding-left: 30px;

  &::before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 17px;
    height: 90%;
    width: 3px;
    background: $progressbargrey;
  }

  &_item {
    padding-left: 35px;
    position: relative;
    counter-increment: list;

    &:not(:last-child) {
      padding-bottom: 90px;
    }

    &_link {
      font-size: 13px;
      color: $progressbargrey;
      font-weight: 700;
      &::after {
        content: counter(step);
        counter-increment: step;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: -30px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: $progressbargrey;
        color: white;
        font-size: 10px;
      }
    }
  }
}

.visited {
  &::before {
    content: '';
    position: absolute;
    left: -13px;
    height: 100%;
    width: 3px;
    background: $baseyellow;
  }

  & a {
    color: $darkblue;
  }

  & a::after {
    background-color: $baseyellow;
  }
}

.visited-animation::before {
  animation: visitedAnimation .75s 1 forwards;
}

.current {
  &::before {
    content: '';
    position: absolute;
    left: -13px;
    height: 0%;
    width: 3px;
    background: $baseyellow;
    animation: currentAnimation .75s 1 forwards;
  }

  & a {
    color: $darkblue;

    &::after {
      background-color: $baseyellow;
      border: 4px solid #fff;
      box-shadow: 0 0 0 3px $baseyellow;
    }
  }
}

.visited-delay::before {
  animation-delay: .5s;
}

.link--disabled {
  pointer-events: none;
}


@keyframes currentAnimation {
  0%   { height: 0; }
  100% { height: 55%; }
}

@keyframes visitedAnimation {
  0%   { height: 55%; }
  100% { height: 100%; }
}

</style>
