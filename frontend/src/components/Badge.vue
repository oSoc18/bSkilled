<template>
  <div class="badge-container">
    <div class="badge">
      <img src="../assets/badge.svg" alt="" width="179" height="157">
      <img class="badge-icon":src="badgeClass.image" alt="" width="70" height="70">
      <svg class="is-hidden">
        <filter id="linear">
          <feColorMatrix
            type="matrix"
            values="0.1 -0.5 0 1.8 1.7
                    0 1 0 0 2.4
                    0 0 1 0 2
                    0 0 0 1 0 "/>
        </filter>
      </svg>
    </div>
    <p class="created-badge-name">{{badgeClass.name}}</p>
  </div>
</template>

<script>

export default {
  props: {
    badgeClass: {
      image: String,
      name: String,
      description: String
    }
  }
};

</script>

<style lang="scss" scoped>
@import "~Vars";

.badge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge-icon {
  position: absolute;
  filter: url('#linear');
  opacity: 0.6;
}

.created-badge-name {
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 25px;
  text-transform: lowercase;
  color: $darkblue;
}

</style>
