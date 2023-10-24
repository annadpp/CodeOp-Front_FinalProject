<template>
  <div class="flex flex-col w-full justify-between items-center">
    <h3
      class="bg-orange h-8 w-[95%] flex justify-center items-center text-border-lime text-xl"
    >
      {{ day }}
    </h3>
    <h3
      class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
    >
      {{ lunch }}
    </h3>

    <div
      class="h-[18vh] w-[90%] border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-blueberry"
    >
      <div
        class="h-[14.5vh] font-hand flex justify-center items-center text-center text-lg px-5"
      >
        <router-link :to="`/recipes/${id}`">{{
          scheduledMeal("Lunch")
        }}</router-link>
      </div>
      <button
        class="flex w-full h-[3vh] border-black border-t-2 justify-center items-center"
      >
        C H A N G E
      </button>
    </div>

    <h3
      class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
    >
      {{ dinner }}
    </h3>

    <div
      class="h-[18vh] w-[90%] border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-blueberry"
    >
      <div
        class="h-[14.5vh] font-hand flex justify-center items-center text-center text-lg px-5"
      >
        <router-link :to="`/recipes/${id}`">{{
          scheduledMeal("Dinner")
        }}</router-link>
      </div>
      <button
        class="flex w-full h-[3vh] border-black border-t-2 justify-center items-center"
      >
        C H A N G E
      </button>
    </div>
  </div>
</template>

<script>
import { useSchedule } from "../stores/schedule";

export default {
  name: "DailySchedule",
  props: ["day", "lunch", "dinner"],
  data() {
    return {
      id: "",
    };
  },
  setup() {
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },

  methods: {
    scheduledMeal(meal) {
      for (const item of this.scheduleStore.schedule) {
        if (meal === item.meal && this.day === item.day) {
          this.id = item.id;
          return item.name;
        }
      }
      return "NO MEAL";
    },
  },
};
</script>

<style></style>
