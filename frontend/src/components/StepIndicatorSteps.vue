<template>
  <ul class="progressbar"  v-if="currentProcess === 'sharing' && currentFlowStep !== 'sign'">
    <li class="progressbar_item" v-bind:class="{'current': currentPageCheck('search'), 'visited': visitedPageCheck('search'), 'visited-animation': checkVisitedSearch(pageVisited)}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPageCheck('search')}" href="#" @click="$router.go(-1)">Search for your skill</a></li>
    <li class="progressbar_item" v-bind:class="{'current': currentPageCheck('recipient'), 'visited': visitedPageCheck('recipient'), 'visited-animation': checkVisitedInformation(pageVisited), 'visited-delay': checkVisitedSearch(pageVisited)}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPageCheck('recipient')}"  href="#" @click="$router.go(-1)">Some personal information</a></li>
    <li class="progressbar_item" v-bind:class="{'current': currentPageCheck('share'), 'visited': visitedPageCheck('share')}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPageCheck('share')}" href="#">Share your badge</a></li>
  </ul>
  <ul class="progressbar"  v-else="currentProcess === 'signing' || currentFlowStep === 'sign'">
    <li class="progressbar_item" v-bind:class="{'current': currentPageCheck('sign'), 'visited': visitedPageCheckSigning('sign'), 'visited-animation': checkVisitedSearch(pageVisited)}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPageCheckSigning('sign')}" href="#" @click="$router.go(-1)">Start with signing</a></li>
    <li class="progressbar_item" v-bind:class="{'current': currentPageCheck('upload'), 'visited': visitedPageCheckSigning('upload'), 'visited-animation': checkVisitedInformation(pageVisited), 'visited-delay': checkVisitedSearch(pageVisited)}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPageCheckSigning('upload')}"  href="#" @click="$router.go(-1)">Upload your profile key</a></li>
    <li class="progressbar_item" v-bind:class="{'current': currentPageCheck('profile'), 'visited': visitedPageCheckSigning('profile'),'visited-animation': checkVisitedprofile(pageVisited), 'visited-delay': checkVisitedInformation(pageVisited)}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPageCheckSigning('profile')}" href="#"  @click="$router.go(-1)">Some personal information</a></li>
    <li class="progressbar_item" v-bind:class="{'current': currentPageCheck('confirm'), 'visited': visitedPageCheckSigning('confirm')}"><a class="progressbar_item_link" v-bind:class="{'link--disabled': !visitedPageCheckSigning('confirm')}" href="#">Sign the badge</a></li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    pageVisited: Number
  },
  methods: {
    checkVisitedSearch(int) {
      return int === 1;
    },
    checkVisitedInformation(int) {
      return int === 2;
    },
    checkVisitedprofile(int) {
      return int === 3;
    },

    currentPageCheck(page) {
      return page === this.currentFlowStep;
    },
    visitedPageCheck(page){
      if(page === this.currentFlowStep) {
        return false;
      }

      if(this.currentFlowStep === 'search') {
        return false;
      }

      if(this.currentFlowStep === 'recipient' && page === 'search' || this.currentFlowStep === 'share' && page === 'search' || this.currentFlowStep === 'share' && page === 'recipient'    ) {
        return true;
      }
    },
    visitedPageCheckSigning(page){
      if(page === this.currentFlowStep) {
        return false;
      }

      if(this.currentFlowStep === 'sign') {
        return false;
      }

      if(this.currentFlowStep === 'upload' && page === 'sign' || this.currentFlowStep === 'profile' && page === 'sign' || this.currentFlowStep === 'profile' && page === 'upload'  || this.currentFlowStep === 'confirm' && page === 'sign'
      || this.currentFlowStep === 'confirm' && page === 'upload'  || this.currentFlowStep === 'confirm' && page === 'profile'   ) {
        return true;
      }
    },
  },
  computed: {
    ...mapState(["currentFlowStep","currentProcess"])
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.progressbar {
  width: 150px;
  counter-reset: step;
  padding-left: 30px;

  &::before {
    display: inline-block;
    content: "";
    position: absolute;
    left: 17px;
    height: 98%;
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
    content: "";
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
  animation: visitedAnimation 0.75s 1 forwards;
}

.current {
  &::before {
    content: "";
    position: absolute;
    left: -13px;
    height: 0%;
    width: 3px;
    background: $baseyellow;
    animation: currentAnimation 0.75s 1 forwards;
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
  animation-delay: 0.5s;
}

.link--disabled {
  pointer-events: none;
}

@keyframes currentAnimation {
  0% {
    height: 0;
  }
  100% {
    height: 55%;
  }
}

@keyframes visitedAnimation {
  0% {
    height: 55%;
  }
  100% {
    height: 100%;
  }
}
</style>
