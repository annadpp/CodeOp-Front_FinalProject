<template>
  <!--ONE FULL DAY SCHEDULE-->
  <div
    class="flex flex-col w-full justify between items-center gap-y-4 px-5 py-8 xl:p-0 border-black dark:border-background border-t-2 xl:border-none"
  >
    <div class="w-full flex justify-center">
      <h3
        class="bg-orange h-6 xl:h-8 w-full xl:w-[95%] flex justify-center items-center text-border-lime text-lg xl:text-xl pl-10 xl:pl-0"
      >
        <span class="rotate-[8deg]">{{ day }}</span>
      </h3>
      <!--Triangle button -> OPENS FULL DAILY SCHEDULE CARD MOBILE-->
      <button @click="toggleDayVisibility">
        <span v-if="dayVisible"
          ><i
            class="xl:hidden fa-solid fa-caret-up inline-block text-right pl-5 py-1 dark:text-background"
          ></i
        ></span>

        <!--Triangle button -> CLOSES FULL DAILY SCHEDULE CARD MOBILE-->
        <span v-if="!dayVisible"
          ><i
            class="xl:hidden fa-solid fa-caret-down inline-block text-right pl-5 py-1 dark:text-background"
          ></i
        ></span>
      </button>
    </div>

    <!--LUNCH-->
    <div v-if="dayVisible" class="w-full grid grid-cols-2 xl:grid-cols-1">
      <div class="flex flex-col xl:items-center">
        <h3
          class="bg-lime h-6 xl:h-8 w-full flex justify-center text-border-orange text-xl"
        >
          <!--Meal time -> gets info from Props-->
          <span class="rotate-[-8deg]">{{ lunch }}</span>
        </h3>

        <!--LUNCH CARD -> colors depends on whether there is a meal scheduled or not-->
        <div
          :class="{
            'bg-blueberry': scheduledMeal('Lunch') !== 'NO MEAL',
            'bg-background dark:bg-stone-950':
              scheduledMeal('Lunch') === 'NO MEAL',
          }"
          class="h-[18vh] w-[93%] xl:w-[90%] border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] dark:text-background mr-2 mt-5 xl:mb-8"
        >
          <div
            class="h-[14.5vh] font-hand flex justify-center items-center text-center text-lg px-5 dark:text-background"
          >
            <!--router-link to recipe/recipes depending on whether there is a meal scheduled or not -> gets id checking meal + day-->
            <router-link
              :to="`/recipes/${getItemId('Lunch')}`"
              class="hover:underline leading-4"
              :class="{ 'text-xl': scheduledMeal('Lunch') !== 'NO MEAL' }"
              >{{ scheduledMeal("Lunch") }}</router-link
            >
          </div>
          <!--Button to open change recipe menu-->
          <button
            class="flex w-full h-[3.1vh] border-black dark:border-background border-t-2 justify-center items-center hover:bg-black hover:text-background dark:hover:bg-background dark:hover:text-black"
            @click="showChangeRecipeForm('Lunch')"
          >
            C H A N G E
          </button>
        </div>
      </div>

      <!--DINNER-->
      <div class="flex flex-col items-end xl:items-center">
        <h3
          class="bg-lime h-6 xl:h-8 w-full flex justify-center text-border-orange text-xl"
        >
          <!--Meal time -> gets info from Props-->
          <span class="rotate-[-8deg]">{{ dinner }}</span>
        </h3>

        <!--DINNER CARD -> colors depends on whether there is a meal scheduled or not-->
        <div
          :class="{
            'bg-blueberry': scheduledMeal('Dinner') !== 'NO MEAL',
            'bg-background dark:bg-stone-950':
              scheduledMeal('Dinner') === 'NO MEAL',
          }"
          class="h-[18vh] w-[93%] xl:w-[90%] border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] dark:text-background mr-2 mt-5"
        >
          <div
            class="h-[14.5vh] font-hand flex justify-center items-center text-center text-lg px-5"
          >
            <!--router-link to recipe/recipes depending on whether there is a meal scheduled or not -> gets id checking meal + day-->
            <router-link
              :to="`/recipes/${getItemId('Dinner')}`"
              class="hover:underline leading-4"
              :class="{ 'text-xl': scheduledMeal('Dinner') !== 'NO MEAL' }"
              >{{ scheduledMeal("Dinner") }}</router-link
            >
          </div>
          <!--Button to open change recipe menu-->
          <button
            class="flex w-full h-[3.1vh] border-black dark:border-background border-t-2 justify-center items-center hover:bg-black hover:text-background dark:hover:bg-background dark:hover:text-black"
            @click="showChangeRecipeForm('Dinner')"
          >
            C H A N G E
          </button>
        </div>
      </div>
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
      dayVisible: true,
    };
  },
  setup() {
    //Gets info from Pinia scheduleStore
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  mounted() {
    //Gets info from screen size
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  methods: {
    //Compares a scheduled meal + day in Pinia for the provided meal + day (info from Props)
    scheduledMeal(meal) {
      for (const item of this.scheduleStore.schedule) {
        if (meal === item.meal && this.day === item.day) {
          //Passes id info + returns name so it shows in the daily schedule
          this.id = item.id;
          return item.name;
        }
      }
      //Returns if no match
      return "NO MEAL";
    },
    getItemId(meal) {
      //Gets the id of a scheduled meal if it matches the provided meal + day (info from Props)
      const item = this.scheduleStore.schedule.find(
        (item) => meal === item.meal && this.day === item.day
      );
      //Returns the id if the meal is found, otherwise returns an empty string
      return item ? item.id : "";
    },
    showChangeRecipeForm(meal) {
      //Looks for an item in Pinia that matches current meal + day
      const item = this.scheduleStore.schedule.find(
        (item) => meal === item.meal && this.day === item.day
      );
      if (item) {
        //If found, assigns the found item to handleInfo in the scheduleStore so the information is available
        this.scheduleStore.handleInfo = item;
      }
      //Emits an event to show the change recipe form so it changes showChangeRecipe to true in the parent to change form visibility
      this.$emit("showChangeRecipeForm");
    },
    toggleDayVisibility() {
      //Used to toggle daily sections
      this.dayVisible = !this.dayVisible;
    },
    handleWindowResize() {
      //Used to keep daily sections closed on MOBILE
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1280) {
        this.dayVisible = true;
      } else {
        this.dayVisible = false;
      }
    },
  },
};
</script>

<style></style>
