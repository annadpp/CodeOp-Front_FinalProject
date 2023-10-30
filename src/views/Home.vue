<template>
  <div
    class="absolute z-0 w-full xl:static top-[10vh] grid grid-cols-1 xl:grid-cols-8 justify-center items-center"
  >
    <div
      class="grid col-span-1 xl:col-span-5 xl:h-[85vh] xl:border-black xl:border-r-2 xl:p-5"
    >
      <div
        class="grid xl:row-span-2 items-center h-[15vh] xl:h-[17vh] p-5 xl:p-0"
      >
        <h2 class="text-5xl xl:text-7xl font-hand text-center xl:text-left">
          What shall I eat?
        </h2>
      </div>

      <div
        class="flex xl:hidden justify-center gap-x-5 w-full px-8 border-black border-y-2 mb-10"
      >
        <div
          class="flex flex-col justify-center text-left text-xl h-[10vh] xl:h-[20vh]"
          v-html="formattedDate"
        ></div>
        <div class="text-5xl flex items-center">
          <p>*</p>
        </div>
      </div>

      <div class="grid xl:h-[65vh] border-black px-5 xl:px-0">
        <div class="flex h-[3vh] xl:h-[5vh]">
          <h3
            class="bg-lime text-border-orange h-6 xl:h-8 w-full flex justify-center items-center text-lg xl:text-2xl"
          >
            <span class="rotate-[8deg]">Today</span>
          </h3>
        </div>
        <div class="h-[57vh] xl:h-[60vh] flex flex-col xl:flex-row gap-x-5">
          <Card
            heightcard="55"
            heightimg="30"
            heighttext="20"
            title="L U N C H"
            :day="getFormattedDayToday()"
            meal="Lunch"
          />
          <Card
            heightcard="55"
            heightimg="30"
            heighttext="20"
            title="D I N N E R"
            :day="getFormattedDayToday()"
            meal="Dinner"
          />
        </div>
      </div>
    </div>

    <div class="grid col-span-3 xl:h-[85vh]">
      <div class="hidden xl:flex justify-center gap-x-5 w-full px-8">
        <div
          class="flex flex-col justify-center text-[1.8rem] h-[20vh]"
          v-html="formattedDate"
        ></div>
        <div class="text-[6rem] flex items-center">
          <p>*</p>
        </div>
      </div>

      <div
        class="flex flex-col p-5 items-center gap-y-2 xl:gap-y-5 xl:h-[25vh] justify-center border-black border-y-2"
      >
        <button
          class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/recipes`">Browse recipes</router-link>
        </button>
        <button
          class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/schedule`">Check full menu</router-link>
        </button>
      </div>

      <div
        class="flex flex-col justify-around h-[30vh] xl:h-[38vh] p-5 mb-5 xl:pb-4"
      >
        <h3
          class="bg-orange text-border-lime h-6 xl:h-8 w-full flex justify-center items-center text-lg xl:text-2xl"
        >
          <span class="rotate-[-8deg]">Tomorrow</span>
        </h3>
        <div class="flex gap-x-5 w-[98%]">
          <CardSimple
            title="L U N C H"
            :day="getFormattedDayTomorrow()"
            meal="Lunch"
          />
          <CardSimple
            title="D I N N E R"
            :day="getFormattedDayTomorrow()"
            meal="Dinner"
          />
        </div>
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
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  mounted() {
    getSchedule().then((schedule) => {
      this.scheduleStore.schedule = schedule;
    }); // Get info from Firebase -> careful! async function in Firebase.js
  },
  computed: {
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
