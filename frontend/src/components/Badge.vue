<template>
  <div class="created-badge-bg">
    <img src="../assets/badge.svg" alt="badge" width="115" height="auto">
    <div class="created-badge-p">
      <p class="created-badge-name">{{badgeClass.name}}</p>
      <p class="created-badge-recipient">Recipient: {{recipient}}</p>
      <p class="">{{badgeClass.description}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    badgeClass: {
      image: String,
      name: String,
      description: String
    },
    recipient: String
  }
};

</script>

<style lang="scss" scoped>
@import "~Vars";

.created-badge-bg{
  display: flex;
  justify-content: center;
  align-items: center;
  color: $darkblue;
  margin-top: -5px;
  margin-bottom: 30px;
  font-size: 14px;
  box-shadow: 0 0 8px 0 rgba(48, 53, 92, 0.25);
  line-height: 1.5;
  width: 440px;
  border-radius: 5px;
  padding: 40px 20px;
}

.created-badge-p {
  margin-left: 30px;
}

.created-badge-recipient {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 3px;
  margin-top: 10px;
}

.created-badge-name {
  font-weight: 700;
  font-size: 17px;
  text-transform: lowercase;
  color: $darkblue;
}

.container-more-margin {
  margin-left: 140px;
}

</style>
