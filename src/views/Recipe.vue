<template>
  <div class="grid grid-cols-10 items-center h-[17vh] pt-8 px-5">
    <div class="col-span-8 leading-[2.6rem]">
      <h2 class="text-[2.8rem]">{{ data.name }}</h2>
    </div>
    <div class="col-span-2">
      <div class="flex gap-x-5">
        <p class="text-6xl flex justify-end items-end text-left w-1/3">*</p>
        <div class="flex flex-col items-end gap-y-2 w-2/3">
          <h4
            class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
          >
            {{ data.category }}
          </h4>
          <h4
            class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-xl"
          >
            {{ data.country }}
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-8">
    <div class="grid col-span-3 h-[68vh] border-black border-r-2 p-5 gap-y-5">
      <img
        class="object-cover w-full"
        :src="data.img"
        alt=""
        :class="closedForm ? 'h-[25vh]' : 'h-[55vh]'"
      />
      <p v-if="closedForm">I N G R E D I E N T S</p>

      <div
        v-if="closedForm"
        class="overflow-auto scrollbar-thin scrollbar-thumb-lime scrollbar-track-orange h-[20vh] w-full grid grid-cols-2 gap-2 content-start"
      >
        <div
          v-for="ingredient in data.ingredients"
          class="flex justify-center items-center bg-blueberry h-[3vh] w-full"
        >
          <p class="font-hand">
            <u class="capitalize">{{ ingredient.name }}</u
            >: <i>{{ ingredient.measure }}</i>
          </p>
        </div>
      </div>

      <button
        v-if="closedForm"
        @click="toggleVisibility"
        class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
      >
        Add to weekly menu
      </button>
    </div>

    <div class="grid col-span-5 h-[68vh] p-5">
      <p v-if="closedForm">
        H O W &nbsp&nbspT O &nbsp&nbspC O O K&nbsp&nbsp I T
      </p>
      <p v-else>A D D &nbsp&nbspT O &nbsp&nbspW E E K L Y &nbsp&nbspM E N U</p>

      <ol
        v-if="closedForm"
        class="list-decimal h-[58vh] overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime w-[98%] pl-16 pr-10 pt-10 pb-8 font-hand text-lg border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-background"
      >
        <li v-for="(step, i) in formattedSteps" :key="i" class="mb-3">
          {{ step }}
        </li>
      </ol>

      <!-- ADD WEEKLY CARD -->
      <form
        v-else
        class="h-[58vh] w-full p-5 border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-blueberry"
      >
        <div class="h-[10vh] flex items-start justify-end">
          <button @click="toggleVisibility" class="h-[40px] w-[40px] bg-lime">
            <p class="text-border-orange hover:text-2xl">X</p>
          </button>
        </div>
        <div v-if="!sent">
          <div class="grid grid-cols-4 gap-x-5 h-[30vh] w-[98%] mt-[7vh]">
            <div class="col-span-1 flex flex-col h-[30vh] gap-y-5">
              <div class="h-[5vh] flex items-center">
                <h4
                  class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-xl"
                >
                  Day
                </h4>
              </div>
              <div class="h-[5vh] flex items-center">
                <h4
                  class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
                >
                  Meal
                </h4>
              </div>
            </div>

            <div
              class="col-span-3 w-full flex flex-col justify-between h-[30vh]"
            >
              <div class="flex flex-col gap-y-5">
                <select
                  name="day"
                  id="day"
                  class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
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

                <select
                  name="meal"
                  id="meal"
                  class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
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
        <div v-else class="flex justify-center items-center h-[37vh]">
          <p class="mb-10 text-2xl text-center">
            <span class="text-border-orange bg-lime py-2 px-5">{{
              data.name
            }}</span>
            <br />
            <span class="inline-block font-hand text-4xl my-3">added on</span
            ><br />
            <span class="text-border-lime bg-orange py-2 px-5"
              >{{ selectedDay }} {{ selectedMeal }}</span
            >
          </p>
        </div>
        <button
          v-if="!sent"
          @click.prevent="addToWeeklyMenu"
          class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          Add to weekly menu
        </button>
        <button
          v-else
          @click.prevent="addToWeeklyMenu"
          class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/schedule`">Check full menu</router-link>
        </button>
      </form>
      <!-- ADD WEEKLY CARD -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useSchedule } from "../stores/schedule";
import { updateSchedule } from "../firebase";

export default {
  name: "Recipe",
  data() {
    return {
      data: {
        img: "",
        name: "",
        ingredients: [],
        category: "",
        country: "",
        steps: "",
      },
      loading: false,
      closedForm: true,
      weeklyMenu: [],
      selectedMeal: "",
      selectedDay: "",
      sent: false,
    };
  },
  setup() {
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      this.loading = true;
      const idRecipe = Number(this.$route.params.id);
      const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
      try {
        const response = await axios.get(apiUrl);
        this.handleResponse(response);
      } catch (error) {
        console.error(`Error fetching recipe:`, error);
      }
      this.loading = false;
    },
    handleResponse(response) {
      const recipe = response.data.meals[0];
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredientName = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredientName) {
          ingredients.push({
            name: ingredientName,
            measure: measure,
          });
        }

        this.data = {
          img: recipe.strMealThumb,
          name: recipe.strMeal,
          ingredients: ingredients,
          category: recipe.strCategory,
          country: recipe.strArea,
          steps: recipe.strInstructions,
        };
      }
    },
    toggleVisibility() {
      this.closedForm = !this.closedForm;
      this.sent = false;
    },
    addToWeeklyMenu() {
      this.scheduleStore.schedule.push({
        meal: this.selectedMeal,
        day: this.selectedDay,
        img: this.data.img,
        name: this.data.name,
        id: Number(this.$route.params.id),
        ingredients: this.data.ingredients.map((ingredient) => ingredient.name),
      });

      updateSchedule(this.scheduleStore.schedule);
      this.sent = true;
    },
  },
  computed: {
    formattedSteps() {
      const steps = this.data.steps;
      if (steps) {
        const breakSteps = steps.split(/(?<=\.\s)(?!\()|(?<=\.\))\s/);
        const cleanedSteps = breakSteps
          .map((step) => step.trim())
          .filter((step) => !/^\d+\.$/.test(step) && !/STEP\s+\d+/.test(step));

        return cleanedSteps;
      }
      return [];
    },
  },
};
</script>

<style></style>
