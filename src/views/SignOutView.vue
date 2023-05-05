<template>
    <div class="sign-out-view">
    <h2>SignOut View</h2>
    <p>See you soon!</p>
    <RouterLink to="/auth/sign-in" class="router-link">Sign In</RouterLink>
    </div>
</template>

<script>
export default {
    name: 'SignOutView'
}
</script>

<style scoped>
.sign-out-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  padding: 5px;
  border: 2px solid black;
  border-radius: 10px;
}
h1 {
    background-color: white;
    padding: 1%;
}
</style>