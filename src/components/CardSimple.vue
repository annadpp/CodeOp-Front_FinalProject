<template>
  <div
    class="h-[14vh] xl:h-[20vh] w-1/2 border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] bg-background dark:bg-stone-950 dark:text-background"
  >
    <!--LUNCH/DINNER-->
    <div
      class="flex border-b-2 w-full h-[3vh] xl:h-[5vh] border-black dark:border-background justify-center items-center"
    >
      {{ title }}
    </div>
    <!--MEAL NAME -> router-link depending on API's recipe id-->
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
  //Gets info from Pinia scheduleStore
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
    //Compares props passed "meal" + "day" with data in Pinia scheduleStore -> match: displays meal name / no match: "No meal"
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

<style></style>
