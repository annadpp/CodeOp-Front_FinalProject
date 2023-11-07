<template>
  <div
    class="absolute z-0 w-full xl:static top-[10vh] grid grid-cols-1 xl:grid-cols-8 justify-center items-center"
  >
    <!--GRID RIGHT-->
    <div
      class="grid col-span-1 xl:col-span-5 xl:h-[85vh] xl:border-black dark:xl:border-background xl:border-r-2 xl:p-5"
    >
      <!--TITLE-->
      <div
        class="grid xl:row-span-2 items-center h-[15vh] xl:h-[17vh] p-5 xl:p-0"
      >
        <h2
          class="text-4xl xl:text-6xl text-center xl:text-left dark:text-background"
        >
          What shall I eat?
        </h2>
      </div>

      <!--TODAY'S DATE MOBILE -> gets info from Pinia dateStore-->
      <div
        class="flex xl:hidden justify-center gap-x-5 w-full px-8 border-black dark:border-background border-y-2 mb-10 dark:text-background"
      >
        <div
          class="flex flex-col justify-center text-left text-xl h-[10vh] xl:h-[20vh]"
          v-html="dateStore.formattedDate"
        ></div>
        <div class="text-5xl flex items-center">
          <p>*</p>
        </div>
      </div>

      <!--TODAY MEAL SCHEDULE-->
      <div
        class="grid xl:h-[65vh] border-black dark:border-background px-5 xl:px-0"
      >
        <div class="flex h-[3vh] xl:h-[5vh]">
          <h3
            class="bg-lime text-border-orange h-6 sm:h-7 xl:h-8 w-full flex justify-center items-center text-lg sm:text-xl md:text-2xl"
          >
            <span class="rotate-[8deg]">Today</span>
          </h3>
        </div>
        <!--LOADER-->
        <div
          v-if="loading"
          class="w-full h-[25vh] sm:h-[40vh] md:h-[52vh] flex items-center"
        >
          <Loader class="w-full" />
        </div>
        <!--TODAY'S LUNCH/DINNER -> This charges after "loading" is set to false-->
        <div
          v-else
          class="h-[57vh] sm:h-[52vh] xl:h-[60vh] flex flex-col sm:flex-row gap-x-5"
        >
          <!--LUNCH CARD-->
          <Card
            title="L U N C H"
            :day="dateStore.getFormattedDayToday()"
            meal="Lunch"
          />
          <!--DINNER CARD-->
          <Card
            class="mt-5 sm:mt-0"
            title="D I N N E R"
            :day="dateStore.getFormattedDayToday()"
            meal="Dinner"
          />
        </div>
      </div>
    </div>

    <!--GRID RIGHT-->
    <div class="grid col-span-3 xl:h-[85vh]">
      <!--TODAY'S DATE DESKTOP -> gets info from Pinia dateStore-->
      <div
        class="hidden xl:flex justify-center gap-x-5 w-full px-8 dark:text-background"
      >
        <div
          class="flex flex-col justify-center text-[1.8rem] h-[20vh]"
          v-html="dateStore.formattedDate"
        ></div>
        <div class="text-8xl mt-4 flex items-center">
          <p>*</p>
        </div>
      </div>

      <!--TOMORROW MEAL SCHEDULE-->
      <div
        class="flex flex-col justify-around h-[30vh] xl:h-[38vh] p-5 xl:mb-5 xl:pb-4 border-black dark:border-background border-t-2"
      >
        <h3
          class="bg-orange text-border-lime h-6 sm:h-7 xl:h-8 w-full flex justify-center items-center text-lg sm:text-xl md:text-2xl"
        >
          <span class="rotate-[-8deg]">Tomorrow</span>
        </h3>

        <!--LOADER-->
        <div v-if="loading" class="w-full">
          <Loader class="w-full" img="8" />
        </div>
        <!--LUNCH CARD -> This charges after "loading" is set to false-->
        <div v-else class="flex gap-x-5 w-[98%]">
          <CardSimple
            title="L U N C H"
            :day="dateStore.getFormattedDayTomorrow()"
            meal="Lunch"
          />
          <!--DINNER CARD-->
          <CardSimple
            title="D I N N E R"
            :day="dateStore.getFormattedDayTomorrow()"
            meal="Dinner"
          />
        </div>
      </div>

      <!--BUTTONS -> router-link to Recipes + Schedule-->
      <div
        class="flex flex-col p-5 items-center gap-y-2 xl:gap-y-5 xl:h-[25vh] justify-center border-black dark:border-background border-t-2 mb-12 xl:mb-0 dark:text-background"
      >
        <button
          class="rounded-full border-2 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/recipes`">Browse recipes</router-link>
        </button>
        <button
          class="rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/schedule`">Check full menu</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import CardSimple from "../components/CardSimple.vue";
import Loader from "../components/Loader.vue";
import { useSchedule } from "../stores/schedule";
import { useDate } from "../stores/date";
import { getSchedule } from "../firebase";

export default {
  components: { Card, CardSimple, Loader },
  setup() {
    //Gets info from Pinia scheduleStore + dateStore
    const scheduleStore = useSchedule();
    const dateStore = useDate();
    return { scheduleStore, dateStore };
  },
  mounted() {
    //Gets info from Firebase -> async function in firebase.js
    getSchedule().then((schedule) => {
      this.scheduleStore.schedule = schedule;
    });

    //Sets loading to false after 0,8 seconds -> fake loader
    setTimeout(() => {
      this.loading = false;
    }, 800);
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style></style>
