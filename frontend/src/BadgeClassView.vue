<template>
  <div>
    <p>Your badge:</p>
    <p>===========</p>
    <p>Skill:</p>
    <p>{{badgeClass.name}}</p>
    <p>Description:</p>
    <p>{{badgeClass.description}}</p>
  </div>
</template>

<script>
export default {
  props: {
    badgeClass: Object
  }
};
</script>

