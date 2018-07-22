<template>
 <div class="badge-temp">
   <div class="badge-row" @click="toggle">
     <img :src="badgeClass.image" alt="Badge Icon" width="30" height="30">
     <h1 class="badge-name" id="name">{{ badgeClass.name }}</h1>
     <img class="arrow_down" src="../assets/arrow_down.svg" alt="" width="13" height="8">
   </div>
   <vue-slide-up-down :active="!active">
     <div class="badge-description">
       <p id="description">{{ badgeClass.description }}</p>
       <v-button :onClick="clickHandlerSaveSkill" class="badge-button" v-bind:class="{'is-hidden': isSelected}">Safe skill</v-button>
     </div>
    </vue-slide-up-down>
  </div>


</template>

<script>
import VueSlideUpDown from 'vue-slide-up-down'
import Button from 'Components/Button'

export default {
  props: {
    badgeClass: {
      image: String,
      name: String,
      description: String
    },
    selectBadgeClass: Function,
    isSelected: Boolean
  },
  components: {
    "vue-slide-up-down": VueSlideUpDown,
    "v-button": Button,
  },
  data: () => ({
    active: true,
    haveHeight: false,
    haveHeightSelected: false
  }),

  methods: {
    toggle (e) {
      this.active = !this.active

      const badgeElement = e.currentTarget.nextSibling.nextSibling.childNodes[0]
      const heightBadgeElement = badgeElement.offsetHeight

      if(!this.active) {
        e.currentTarget.childNodes[4].style.transform = `scale(1, -1)`;
      } else {
        e.currentTarget.childNodes[4].style.transform = `scale(1, 1)`;
      }

      if(!this.haveHeight) {
        const height = heightBadgeElement - 5;
        badgeElement.style.height=`${height}px`
        this.haveHeight = true;
      }

      if(this.isSelected === true && !this.haveHeightSelected) {
        const height = heightBadgeElement + 12;
        badgeElement.style.height=`${height}px`
        this.haveHeightSelected = true;
      }
    },
    clickHandlerSaveSkill() {
      this.selectBadgeClass(this.badgeClass);
    }
  }
};

</script>

<style lang="scss" scoped>
@import "~Vars";

.badge-temp {
  color: #30355C;
  display: block;
  width: 340px;
  margin: 20px;
  background: #FFFFFF;
}
.badge-temp::after {
  content: "";
  clear: both;
  display: table;
}

.badge-row {
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 0 8px 0 rgba(48,53,92,0.25);
  border-radius: 5px 5px 0 0;
  padding: 20px 30px;
  width: 310px;
  margin-left: 15px;
}

.badge-name {
  text-transform: lowercase;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding: 0 15px;
  width: 200px;
}

.badge-description {
  font-size: 14px;
  padding: 5px 30px 15px;
  box-shadow: 0 0 8px 0 rgba(48,53,92,0.25);
  position: relative;
  z-index: 2;
  line-height: 1.4;
  width: 310px;
  margin-left: 15px;
  padding-bottom: 0;
  margin-top: -4px;
  border-radius: 0 0 5px 5px;

  & p {
    margin-bottom: 15px;
  }

  &:after {
    content: '';
    width: 100%;
    border-bottom: solid 20px white;
    position: absolute;
    left: 0;
    top: 0%;
    z-index: -1;
  }
}

.badge-button {
  margin-bottom: 20px;
}

.arrow_down {
  margin-top: 4px;
  transition: all .2s;
}

</style>
