<template>
  <!--NOT WORKING PROPERLY-->
  <div>
    <!--BUTTON TO CLOSE RECIPE ADD FORM-->
    <button @click="toggleVisibility" class="h-[40px] w-[40px] bg-lime">
      <p class="text-border-orange hover:text-2xl text-black">X</p>
    </button>

    <!--SELECT DAY/MEAL A RECIPE WILL BE ADDED -> "sent" keeps track of status for div to show/hide-->
    <div v-if="!sent">
      <div
        class="grid grid-cols-4 gap-x-5 h-[18vh] xl:h-[30vh] w-[98%] xl:mt-[7vh]"
      >
        <div class="col-span-1 flex flex-col gap-y-5 text-black">
          <div class="h-[4vh] xl:h-[5vh] flex items-center">
            <h4
              class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-xl"
            >
              Day
            </h4>
          </div>
          <div class="h-[4vh] xl:h-[5vh] flex items-center">
            <h4
              class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
            >
              Meal
            </h4>
          </div>
        </div>
        <div class="col-span-3 w-full flex flex-col justify-between h-[30vh]">
          <div class="flex flex-col gap-y-5">
            <!--v-model passes day info-->
            <select
              name="day"
              id="day"
              class="p-1 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] w-full h-[4vh] xl:h-[5vh] dark:bg-stone-950"
              v-model="selectedDay"
            >
              <option disabled value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <!--v-model passes day info-->
            <select
              name="meal"
              id="meal"
              class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] w-full h-[4vh] xl:h-[5vh] dark:bg-stone-950"
              v-model="selectedMeal"
            >
              <option disabled value="">Select a meal</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!--INFO ABOUT MEAL THAT'S BEEN ADDED -> "sent" keeps track of status for div to show/hide-->
    <div v-else class="flex justify-center items-center xl:h-[37vh]">
      <p class="mb-10 text-lg xl:text-2xl text-center leading-8 xl:leading-10">
        <!--Info on name from Props, day + meal stored from v-models-->
        <span class="text-border-orange bg-lime py-2 px-5 text-black">{{
          data.name
        }}</span>
        <br />
        <span class="inline-block font-hand text-xl xl:text-xl my-3"
          >added on</span
        >
        <br />
        <span class="text-border-lime bg-orange py-2 px-5 text-black"
          >{{ selectedDay }} {{ selectedMeal }}</span
        >
      </p>
    </div>

    <!--ADD BUTTON -> "sent" keeps track of status for it to show/hide-->
    <button
      v-if="!sent"
      @click.prevent="addToWeeklyMenu"
      class="rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
    >
      Add to weekly menu
    </button>

    <!--CHECK FULL MENU BUTTON -> "sent" keeps track of status for it to show/hide (redirects to Schedule)-->
    <button
      v-else
      @click.prevent="addToWeeklyMenu"
      class="rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
    >
      <router-link :to="`/schedule`">Check full menu</router-link>
    </button>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      //Get info from v-models
      selectedDay: "",
      selectedMeal: "",
      sent: false,
    };
  },

  methods: {
    toggleVisibility() {
      //Toggles closedForm to open/close add recipe form + changes sent status -> emits to Parent so toggle works from both files
      this.closedForm = !this.closedForm;
      this.sent = false;
      this.$emit("toggleVisibility");
    },
    addToWeeklyMenu() {
      //Checks if the selected meal already exists in the weekly schedule (Pinia) by finding index and comparing day + meal
      const existing = this.scheduleStore.schedule.findIndex(
        (recipe) =>
          recipe.day === this.selectedDay && recipe.meal === this.selectedMeal
      );

      if (existing !== -1) {
        //If the meal exists, updates its details in the schedule
        this.scheduleStore.schedule[existing] = {
          meal: this.selectedMeal,
          day: this.selectedDay,
          img: this.data.img,
          name: this.data.name,
          id: Number(this.$route.params.id),
          //Maps so it includes all ingredients
          ingredients: this.data.ingredients.map(
            (ingredient) => ingredient.name
          ),
        };
      } else {
        //If the meal doesn't exist, adds it to the schedule
        this.scheduleStore.schedule.push({
          meal: this.selectedMeal,
          day: this.selectedDay,
          img: this.data.img,
          name: this.data.name,
          id: Number(this.$route.params.id),
          //Maps so it includes all ingredients
          ingredients: this.data.ingredients.map(
            (ingredient) => ingredient.name
          ),
        });
      }
      //Updates the schedule in Pinia
      updateSchedule(this.scheduleStore.schedule);
      //Emits an event to indicate to Recipe that the meal was added to the weekly menu
      this.$emit("addToWeeklyMenu");
      //Sets to true to indicate that the action has been completed -> div information will change
      this.sent = true;
    },
  },
};
</script>

<style></style>
