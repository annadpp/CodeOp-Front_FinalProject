<template>
  <div class="justify-center items-center">
    <div class="h-[85vh] border-black p-5">
      <div class="grid row-span-2 items-center h-[17vh]">
        <h2>Weekly schedule</h2>
      </div>

      <div
        class="h-[65vh] border-black"
        :class="{ 'opacity-20': showChangeRecipe }"
      >
        <div class="h-[3vh] gap-x-5 mb-3 text-right">WEEK 2</div>
        <div class="h-[56vh] grid grid-cols-7">
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
