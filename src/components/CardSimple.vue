<template>
  <div
    class="h-[14vh] xl:h-[20vh] w-1/2 border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-background mb-10 xl:mb-0"
  >
    <div
      class="flex border-b-2 w-full h-[3vh] xl:h-[5vh] border-black justify-center items-center"
    >
      {{ title }}
    </div>
    <div
      class="h-[10vh] xl:h-[14vh] font-hand flex justify-center text-center items-center p-5"
    >
      <router-link
        :to="`/recipes/${tomorrowsMealId}`"
        class="text-lg hover:underline"
        >{{ scheduledMealHome(meal) }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { useSchedule } from "../stores/schedule";

export default {
  name: "CardSimple",
  props: ["title", "day", "meal"],
  setup() {
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  data() {
    return {
      tomorrowsMealId: "",
    };
  },
  methods: {
    scheduledMealHome(meal) {
      for (const item of this.scheduleStore.schedule) {
        if (meal === item.meal && this.day === item.day) {
          this.tomorrowsMealId = item.id;
          return item.name;
        }
      }
      return "NO MEAL";
    },
  },
};
</script>

<style lang="scss" scoped></style>
