<template>
  <header
    class="fixed w-full z-10 xl:static grid grid-cols-2 border-black border-b-2 px-5 h-[10vh] bg-background"
  >
    <div>
      <img class="h-[7vh]" src="../assets/cat.png" alt="" />
    </div>
    <div
      class="flex flex-col xl:flex-row justify-center xl:justify-end xl:items-center font-sans"
    >
      <div
        class="fixed top-5 right-5 flex xl:hidden justify-end items-center font-sans"
      >
        <button
          @click="toggleMenuVisibility"
          class="bg-black text-background hover:underline"
        >
          <p v-if="!menuOpen">MENU</p>
          <p v-if="menuOpen">CLOSE</p>
        </button>
      </div>
      <div
        v-if="screenWidth > 1280 || menuOpen"
        class="absolute xl:static w-full xl:w-auto top-[10vh] left-0 px-5 py-10 xl:p-0 items-end flex flex-col xl:flex-row text-background xl:text-black bg-black xl:bg-background gap-5"
      >
        <router-link to="/schedule"
          ><button
            @click="toggleMenuVisibility"
            :class="{
              'bg-background text-black xl:bg-black xl:text-background':
                this.$route.path === '/schedule',
            }"
            class="hover:underline"
          >
            SCHEDULE
          </button></router-link
        >
        <router-link to="/grocery">
          <button
            @click="toggleMenuVisibility"
            :class="{
              'bg-background text-black xl:bg-black xl:text-background':
                this.$route.path === '/grocery',
            }"
            class="hover:underline"
          >
            GROCERY
          </button>
        </router-link>
        <router-link to="/recipes"
          ><button
            @click="toggleMenuVisibility"
            :class="{
              'bg-background text-black xl:bg-black xl:text-background':
                this.$route.path === '/recipes',
            }"
            class="hover:underline"
          >
            RECIPES
          </button></router-link
        >
        <router-link to="/"
          ><button
            @click="toggleMenuVisibility"
            :class="{
              'bg-background text-black xl:bg-black xl:text-background':
                this.$route.path === '/',
            }"
            class="hover:underline"
          >
            HOME
          </button></router-link
        >
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuOpen: false,
      screenWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  methods: {
    toggleMenuVisibility() {
      this.menuOpen = !this.menuOpen;
    },
    handleWindowResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1280) {
        this.menuOpen = true;
      } else {
        this.menuOpen = false;
      }
    },
  },
};
</script>

<style scoped>
button {
  height: 2.8rem;
  width: 8rem;
}
</style>
