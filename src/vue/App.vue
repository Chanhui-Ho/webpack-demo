<template>
  <div class="vue-box">{{name}}</div>
</template>

<script>
export default {
  data() {
    return {
      name: "derick",
    };
  },
};
</script>

<style scoped>
.vue-box{
    width: 100px;
    height: 100px;
    background: lightblue;
}
</style>
