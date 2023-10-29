<template>
  <div
    class="flex flex-col w-full justify between items-center gap-y-4 px-5 py-8 xl:p-0 border-black border-t-2 xl:border-none"
  >
    <div class="w-full flex">
      <h3
        class="bg-orange h-6 xl:h-8 w-full xl:w-[95%] flex justify-center items-center text-border-lime text-lg xl:text-xl pl-10 xl:pl-0"
      >
        {{ day }}
      </h3>
      <button @click="toggleDayVisibility">
        <span v-if="dayVisible"
          ><i
            class="xl:hidden fa-solid fa-caret-up inline-block text-right pl-5 py-1"
          ></i
        ></span>

        <span v-if="!dayVisible"
          ><i
            class="xl:hidden fa-solid fa-caret-down inline-block text-right pl-5 py-1"
          ></i
        ></span>
      </button>
    </div>

    <div v-if="dayVisible" class="w-full grid grid-cols-2 xl:grid-cols-1">
      <div class="flex flex-col xl:items-center">
        <h3
          class="bg-lime h-6 xl:h-8 w-full flex justify-center text-border-orange text-xl"
        >
          {{ lunch }}
        </h3>

        <div
          :class="{
            'bg-blueberry': scheduledMeal('Lunch') !== 'NO MEAL',
            'bg-background': scheduledMeal('Lunch') === 'NO MEAL',
          }"
          class="h-[18vh] w-[93%] xl:w-[90%] border-2 border-black drop-shadow-[8px_8px_0px_#000000] mt-5 xl:mb-8"
        >
          <div
            class="h-[14.5vh] font-hand flex justify-center items-center text-center text-lg px-5"
          >
            <router-link
              :to="`/recipes/${getItemId('Lunch')}`"
              class="hover:underline leading-6"
              :class="{ 'text-xl': scheduledMeal('Lunch') !== 'NO MEAL' }"
              >{{ scheduledMeal("Lunch") }}</router-link
            >
          </div>
          <button
            class="flex w-full h-[3.1vh] border-black border-t-2 justify-center items-center hover:bg-black hover:text-background"
            @click="showChangeRecipeForm('Lunch')"
          >
            C H A N G E
          </button>
        </div>
      </div>

      <div class="flex flex-col items-end xl:items-center">
        <h3
          class="bg-lime h-6 xl:h-8 w-full flex justify-center text-border-orange text-xl"
        >
          {{ dinner }}
        </h3>

        <div
          :class="{
            'bg-blueberry': scheduledMeal('Dinner') !== 'NO MEAL',
            'bg-background': scheduledMeal('Dinner') === 'NO MEAL',
          }"
          class="h-[18vh] w-[93%] xl:w-[90%] border-2 border-black drop-shadow-[8px_8px_0px_#000000] mr-2 mt-5"
        >
          <div
            class="h-[14.5vh] font-hand flex justify-center items-center text-center text-lg px-5"
          >
            <router-link
              :to="`/recipes/${getItemId('Dinner')}`"
              class="hover:underline leading-6"
              :class="{ 'text-xl': scheduledMeal('Dinner') !== 'NO MEAL' }"
              >{{ scheduledMeal("Dinner") }}</router-link
            >
          </div>
          <button
            class="flex w-full h-[3.1vh] border-black border-t-2 justify-center items-center hover:bg-black hover:text-background"
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
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
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
    getItemId(meal) {
      const item = this.scheduleStore.schedule.find(
        (item) => meal === item.meal && this.day === item.day
      );
      return item ? item.id : "";
    },
    showChangeRecipeForm(meal) {
      const item = this.scheduleStore.schedule.find(
        (item) => meal === item.meal && this.day === item.day
      );
      if (item) {
        this.scheduleStore.handleInfo = item;
      }
      this.$emit("showChangeRecipeForm");
    },
    toggleDayVisibility() {
      this.dayVisible = !this.dayVisible;
    },
    handleWindowResize() {
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
