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
        class="h-[65vh] border-black w-full"
        :class="{ 'opacity-20': showChangeRecipe }"
      >
        <div
          class="h-[3vh] gap-x-5 py-6 xl:py-0 mb-4 text-right border-black dark:border-background dark:text-background border-t-2 xl:border-none px-5 xl:px-0"
        >
          WEEK {{ dateStore.currentWeekOfYear }}
        </div>
        <div
          class="xl:h-[56vh] grid grid-cols-1 pb-12 xl:pb-0"
          :class="{
            'xl:flex items-center': loading,
            'xl:grid xl:grid-cols-7': !loading,
          }"
        >
          <div v-if="loading" class="w-full h-[50vh] flex items-center px-5">
            <Loader class="w-full" />
          </div>

          <DailySchedule
            v-else
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
import Loader from "../components/Loader.vue";
import { useSchedule } from "../stores/schedule";
import { useDate } from "../stores/date";
import { getSchedule } from "../firebase";

export default {
  name: "Schedule",
  components: { DailySchedule, ChangeRecipe, Loader },
  setup() {
    const scheduleStore = useSchedule();
    const dateStore = useDate();
    return { scheduleStore, dateStore };
  },
  mounted() {
    //Gets info from Firebase -> careful! async function in Firebase.js
    getSchedule().then((schedule) => {
      this.scheduleStore.schedule = schedule;
    });

    setTimeout(() => {
      this.loading = false; //Sets loading to false after 0,8 seconds -> for fake loader
    }, 800);
  },
  data() {
    return {
      showChangeRecipe: false,
      loading: true,
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
