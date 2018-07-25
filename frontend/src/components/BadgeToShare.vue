<template>
  <div class="badge-container">
      <img src="../assets/badge.svg" alt="" width="179" height="157">
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

.created-badge-name {
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 25px;
  text-transform: lowercase;
  color: $darkblue;
}

</style>
