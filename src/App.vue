<template>
  <Header menu="home" />
  <div class="bg-background">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style>
h2 {
  font-family: "Mansalva", sans-serif;
  font-size: 4rem;
}
</style>
