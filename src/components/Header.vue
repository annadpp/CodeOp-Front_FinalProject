<template>
  <header
    class="fixed w-full z-10 xl:static grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 border-black dark:border-background border-b-2 px-5 h-[10vh] bg-background dark:bg-stone-950"
  >
    <!--MENU LOGO -> randomized-->
    <div
      v-if="!menuOpen || this.screenWidth > 1024"
      class="h-full relative lg:ml-[2vw]"
    >
      <p
        class="hidden sm:flex absolute font-hand sm:text-xl md:text-2xl sm:w-[300px] md:w-[325px] top-[3vh] sm:pl-[15vw] md:pl-[105px]"
        :class="randomBgColor"
      >
        Meal Planning App
      </p>
      <img
        class="h-[8vh] sm:h-[9vh] absolute bottom-[-6px] sm:pl-5"
        :src="randomImgSource"
        alt=""
      />
    </div>

    <div
      class="flex flex-col xl:flex-row justify-center xl:justify-end lg:items-end xl:items-center font-sans lg:col-span-2 xl:col-span-1"
    >
      <!--MOBILE MENU BASE-->
      <div
        class="fixed top-5 right-5 flex lg:hidden justify-end items-center font-sans"
      >
        <button
          @click="toggleMenuVisibility"
          class="bg-black dark:bg-background text-background dark:text-slate-950 hover:underline"
        >
          <p v-if="!menuOpen">MENU</p>
          <p v-if="menuOpen">CLOSE</p>
        </button>
      </div>

      <!--DESKTOP MENU + MOBILE MENU OPEN -> closes menu on click + router-link to different sections-->
      <div
        v-if="screenWidth > 1024 || menuOpen"
        class="absolute grid grid-cols-2 lg:static w-full lg:w-auto top-[10vh] left-0 px-5 py-10 lg:p-0 items-end lg:flex flex-col lg:flex-row text-background dark:text-stone-950 lg:text-black dark:lg:text-background bg-black dark:bg-background lg:bg-background dark:lg:bg-stone-950 gap-5"
      >
        <div class="lg:hidden flex items-center">
          <p
            class="hidden sm:flex absolute font-hand sm:text-xl md:text-2xl sm:w-[350px] sm:pl-[2.5vw] top-[7.5vh] rotate-180 text-black"
            :class="randomBgColor"
          >
            Meal Planning App
          </p>
          <img
            class="h-[15vh] absolute top-[-10px] sm:pl-5 rotate-180"
            :src="randomImgSource"
            alt=""
          />
        </div>
        <div class="flex flex-col items-end lg:flex-row">
          <router-link to="/schedule"
            ><button
              @click="toggleMenuVisibility"
              :class="{
                'bg-background dark:bg-stone-950 text-black dark:text-background lg:bg-black dark:lg:bg-background lg:text-background dark:lg:text-stone-950':
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
                'bg-background dark:bg-stone-950 text-black dark:text-background lg:bg-black dark:lg:bg-background lg:text-background dark:lg:text-stone-950':
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
                'bg-background dark:bg-stone-950 text-black dark:text-background lg:bg-black dark:lg:bg-background lg:text-background dark:lg:text-stone-950':
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
                'bg-background dark:bg-stone-950 text-black dark:text-background lg:bg-black dark:lg:bg-background lg:text-background dark:lg:text-stone-950':
                  this.$route.path === '/',
              }"
              class="hover:underline"
            >
              HOME
            </button></router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";

export default {
  name: "Header",
  data() {
    return {
      menuOpen: false,
      screenWidth: window.innerWidth,
      bgColors: ["bg-lime", "bg-orange", "bg-blueberry"],
      imgSources: [logo1, logo2, logo3, logo4],
      randomBgColor: "",
      randomImgSource: "",
    };
  },
  mounted() {
    //Gets random background and image for logo on load
    this.setRandomBg();
    this.setRandomImg();

    //Gets screen size info + starts on load
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  //Method description on name
  methods: {
    toggleMenuVisibility() {
      this.menuOpen = !this.menuOpen;
    },
    handleWindowResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1024) {
        this.menuOpen = true;
      } else {
        this.menuOpen = false;
      }
    },
    setRandomBg() {
      this.randomBgColor =
        this.bgColors[Math.floor(Math.random() * this.bgColors.length)];
    },
    setRandomImg() {
      this.randomImgSource =
        this.imgSources[Math.floor(Math.random() * this.imgSources.length)];
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
