<template>
  <div class="grid grid-cols-8 justify-center items-center">
    <div class="grid col-span-5 h-[85vh] border-black border-r-2 p-5">
      <div class="grid row-span-2 items-center h-[17vh]">
        <h2>What shall I eat?</h2>
      </div>

      <div class="grid h-[65vh] border-black">
        <div class="flex h-[5vh]">
          <h3
            class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-2xl"
          >
            Today
          </h3>
        </div>
        <div class="h-[60vh] flex gap-x-5">
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

    <div class="grid col-span-3 h-[85vh]">
      <div class="flex justify-center gap-x-5 w-full px-8">
        <div
          class="flex flex-col justify-center text-[1.8rem] h-[20vh]"
          v-html="formattedDate"
        ></div>
        <div class="text-[6rem] flex items-center">
          <p>*</p>
        </div>
      </div>

      <div
        class="flex flex-col p-5 items-center gap-y-5 h-[25vh] justify-center border-black border-y-2"
      >
        <button
          class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/recipes`">Browse recipes</router-link>
        </button>
        <button
          class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/schedule`">Check full menu</router-link>
        </button>
      </div>

      <div class="flex flex-col justify-around h-[38vh] p-5 pb-8">
        <h3
          class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
        >
          Tomorrow
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
