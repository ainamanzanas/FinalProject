<template>
    <h1></h1>
</template>

<script>
import { ref } from "vue";

export default {
    name: 'SignInView',
    setup() {
    const email = ref("");
    const password = ref("");

    return {
      email,
      password,
    };
  },
};
</script>

<style>
</style>