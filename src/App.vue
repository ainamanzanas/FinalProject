<script>
import { mapActions } from 'pinia';
import { RouterLink, RouterView } from 'vue-router';
import UserStore from '@/stores/user';

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
  },
  methods: {
    ...mapActions(UserStore, ['fetchUser'])
  },
  async created() {
    await this.fetchUser()
  },
}

</script>

<template>
  <header>
    <a href=""><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="25" height="25" /></a>

    <div class="wrapper">
      <nav>
        <RouterLink to="/"><h1>Home</h1></RouterLink>
      </nav>
    </div>
  </header>
  <RouterView/>
</template>

<style scoped>
#app {

background:
radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 50px 0,
radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 50px 0,
radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 0 50px,
radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 0 50px,
radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%),
radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%),
radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%) 50px 50px,
radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%) 50px 50px;
background-color:#dcd6d0;
background-size:100px 100px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  padding-left: 15%;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px #dcd6d0;
  margin: 5px 0 5px 0;
  background-color: #364E27 !important;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: left;  
  margin: 30px 15px 30px 15px;
  max-width: 120px;
  height: 80px;
}

nav {
  width: 100%;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: transparent;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 1.5rem 5rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: black;
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

button {
  border: none;
}

@media (min-width: 1000px) {
  header {
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: transparent;
  }

  .logo {
    display: flex;
     margin: 30px 15px 30px 15px;
     max-width: 120px;
     height: 80px;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media only screen and (max-width: 1000px) {
  header {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    flex-direction: row;
    padding: 5%;
    margin: 5%;
    background-color: transparent;
}
  .logo {
  display: block;
  margin: 30px 15px 30px 25px;
}
nav a {
  padding: 2.5rem 5rem;
}
}
</style>
