<template>
  <div class="flex flex-col w-full justify between items-center gap-y-4">
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
      :class="{
        'bg-blueberry': scheduledMeal('Lunch') !== 'NO MEAL',
        'bg-background': scheduledMeal('Lunch') === 'NO MEAL',
      }"
      class="h-[18vh] w-[90%] border-2 border-black drop-shadow-[8px_8px_0px_#000000] mb-5"
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

    <h3
      class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
    >
      {{ dinner }}
    </h3>

    <div
      :class="{
        'bg-blueberry': scheduledMeal('Dinner') !== 'NO MEAL',
        'bg-background': scheduledMeal('Dinner') === 'NO MEAL',
      }"
      class="h-[18vh] w-[90%] border-2 border-black drop-shadow-[8px_8px_0px_#000000]"
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
  },
};
</script>

<style></style>
