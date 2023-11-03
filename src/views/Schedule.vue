<template>
  <div
    class="absolute z-0 w-full xl:static top-[10vh] justify-center items-center"
  >
    <div class="xl:h-[85vh] border-black xl:p-5 xl:mb-0">
      <div class="grid row-span-2 items-center h-[17vh]">
        <h2
          class="text-4xl xl:text-6xl text-center xl:text-left dark:text-background"
        >
          Weekly schedule
        </h2>
      </div>

      <div
        class="h-[65vh] border-black"
        :class="{ 'opacity-20': showChangeRecipe }"
      >
        <div
          class="h-[3vh] gap-x-5 py-6 xl:py-0 mb-4 text-right border-black border-t-2 xl:border-none px-5 xl:px-0"
        >
          WEEK 2
        </div>
        <div class="xl:h-[56vh] grid grid-cols-1 xl:grid-cols-7 pb-12 xl:pb-0">
          <DailySchedule
            v-for="(day, i) in daysOfWeek"
            :key="day"
            :day="day"
            :showChangeRecipe="showChangeRecipe"
            @showChangeRecipeForm="showChangeRecipeForm"
            :lunch="i === 3 ? 'Lunch' : null"
            :dinner="i === 3 ? 'Dinner' : null"
          />
        </div>
      </div>
    </div>

    <ChangeRecipe v-if="showChangeRecipe" @closeForm="closeForm" />
  </div>
</template>

<script>
import DailySchedule from "../components/DailySchedule.vue";
import ChangeRecipe from "../components/ChangeRecipe.vue";
import { useSchedule } from "../stores/schedule";
import { getSchedule } from "../firebase";

export default {
  name: "Schedule",
  components: { DailySchedule, ChangeRecipe },
  setup() {
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  mounted() {
    getSchedule().then((schedule) => {
      this.scheduleStore.schedule = schedule;
    }); // Get info from Firebase -> careful! async function in Firebase.js
  },
  data() {
    return {
      showChangeRecipe: false,
    };
  },
  methods: {
    closeForm() {
      this.showChangeRecipe = false;
    },
    showChangeRecipeForm() {
      this.showChangeRecipe = true;
    },
  },
  computed: {
    daysOfWeek() {
      return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
    },
  },
};
</script>

<style></style>
