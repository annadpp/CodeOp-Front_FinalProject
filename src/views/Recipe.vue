<template>
  <div class="grid grid-cols-8 items-center h-[17vh] pt-8 px-5">
    <div class="col-span-5 leading-[3rem]">
      <h2>{{ data.name }}</h2>
    </div>
    <div class="col-span-3">
      <div class="flex gap-x-5">
        <p class="text-6xl flex justify-end items-end text-right w-2/3">*</p>
        <div class="flex flex-col items-end gap-y-2 w-1/3">
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
  <div class="grid grid-cols-7">
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
          v-for="ingredient in this.data.ingredients"
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

    <div class="grid col-span-4 h-[68vh] p-5">
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

      <!--ADD WEEKLY CARD-->
      <form
        v-else
        class="h-[58vh] w-full p-5 border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-blueberry"
      >
        <div class="h-[10vh] flex items-start justify-end">
          <button @click="toggleVisibility" class="h-[40px] w-[40px] bg-lime">
            <p class="text-border-orange hover:text-2xl">X</p>
          </button>
        </div>

        <div class="grid grid-cols-4 gap-x-5 h-[25vh] w-[98%] mt-[7vh]">
          <div class="col-span-1 flex flex-col h-[30vh] gap-y-5">
            <div class="h-[5vh] flex items-center">
              <h4
                class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
              >
                Meal
              </h4>
            </div>

            <div class="h-[5vh] flex items-center">
              <h4
                class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-xl"
              >
                Day
              </h4>
            </div>
          </div>

          <div class="col-span-3 w-full flex flex-col justify-between h-[30vh]">
            <div class="flex flex-col gap-y-5">
              <select
                name="meal"
                id="meal"
                class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
              >
                <option value="xxxx">xxxx</option>
              </select>
              <select
                name="day"
                id="day"
                class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
              >
                <option value="xxxx">xxxx</option>
              </select>
            </div>
          </div>
        </div>
        <button
          class="mt-6 rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          Add to weekly menu
        </button>
      </form>
      <!--ADD WEEKLY CARD-->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Recipe",
  data() {
    return {
      data: [],
      loading: false,
      closedForm: true,
    };
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      this.loading = true;
      const idRecipe = Number(this.$route.params.id); // Use this.$route.params.id to get the ID from the route
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
      const recipe = response.data.meals[0]; // Assuming it's a single recipe
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
    },
  },
  computed: {
    formattedSteps() {
      const steps = this.data.steps;
      if (steps) {
        // Use a regular expression to split the text into an array of steps
        return steps.split(/(?<=\.\s)(?!\()|(?<=\.\))\s/);
      }
      return [];
    },
  },
};
</script>

<style></style>
