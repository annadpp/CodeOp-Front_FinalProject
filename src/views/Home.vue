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

      <!--TODAY'S DATE MOBILE-->
      <div
        class="flex xl:hidden justify-center gap-x-5 w-full px-8 border-black dark:border-background border-y-2 mb-10 dark:text-background"
      >
        <div
          class="flex flex-col justify-center text-left text-xl h-[10vh] xl:h-[20vh]"
          v-html="formattedDate"
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
        <div
          class="h-[57vh] sm:h-[52vh] xl:h-[60vh] flex flex-col sm:flex-row gap-x-5"
        >
          <!--LUNCH CARD-->
          <Card title="L U N C H" :day="getFormattedDayToday()" meal="Lunch" />
          <!--DINNER CARD-->
          <Card
            class="mt-5 sm:mt-0"
            title="D I N N E R"
            :day="getFormattedDayToday()"
            meal="Dinner"
          />
        </div>
      </div>
    </div>

    <!--GRID RIGHT-->
    <div class="grid col-span-3 xl:h-[85vh]">
      <!--TODAY'S DATE-->
      <div
        class="hidden xl:flex justify-center gap-x-5 w-full px-8 dark:text-background"
      >
        <div
          class="flex flex-col justify-center text-[1.8rem] h-[20vh]"
          v-html="formattedDate"
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
        <!--LUNCH CARD-->
        <div class="flex gap-x-5 w-[98%]">
          <CardSimple
            title="L U N C H"
            :day="getFormattedDayTomorrow()"
            meal="Lunch"
          />
          <!--DINNER CARD-->
          <CardSimple
            title="D I N N E R"
            :day="getFormattedDayTomorrow()"
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
import { useSchedule } from "../stores/schedule";
import { getSchedule } from "../firebase";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default {
  components: { Card, CardSimple },
  setup() {
    //Gets info from Pinia scheduleStore
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  mounted() {
    //Gets info from Firebase -> async function in firebase.js
    getSchedule().then((schedule) => {
      this.scheduleStore.schedule = schedule;
    });
  },
  computed: {
    //Computed description on name
    formattedDate() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const currentDate = new Date();
      const dayOfWeek = this.getFormattedDayToday();
      const dayOfMonth = currentDate.getDate();
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      const yearLastTwoDigits = year.toString().slice(-2);

      return `<p>${dayOfWeek}</p>
          <p>${dayOfMonth} <span class="font-hand">${month.toUpperCase()}</span> '${yearLastTwoDigits}</p>`;
    },
  },
  //Method description on name
  methods: {
    getFormattedDayToday() {
      const currentDate = new Date();
      return daysOfWeek[currentDate.getDay()];
    },
    getFormattedDayTomorrow() {
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      return daysOfWeek[tomorrow.getDay()];
    },
  },
};
</script>

<style></style>
