<template>
  <div class="absolute z-0 w-full xl:static top-[10vh]">
    <div
      class="grid xl:grid-cols-10 items-center h-[15vh] xl:h-[17vh] pt-8 xl:px-5 xl:mb-2"
    >
      <div class="xl:col-span-8 leading-[2.6rem]">
        <h2
          class="text-3xl xl:text-5xl font-hand text-center xl:text-left leading-7"
        >
          {{ data.name }}
        </h2>
      </div>
      <div class="xl:col-span-2">
        <div class="gap-x-5 hidden xl:flex">
          <p class="text-6xl flex justify-end items-end text-left w-1/3">*</p>
          <div class="flex flex-col items-end gap-y-4 w-2/3">
            <h4
              class="bg-lime h-6 xl:h-8 w-full flex justify-center items-center text-border-orange text-xl"
            >
              <span class="rotate-[-8deg]">{{ data.category }}</span>
            </h4>
            <h4
              class="bg-orange h-6 xl:h-8 w-full flex justify-center items-center text-border-lime text-xl"
            >
              <span class="rotate-[8deg]">{{ data.country }}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class="grid xl:grid-cols-8">
      <div
        class="grid xl:col-span-3 xl:h-[68vh] border-black border-t-2 xl:border-t-0 xl:border-r-2 xl:p-5 xl:gap-y-5"
      >
        <div
          class="grid grid-cols-2 xl:flex px-5 xl:px-0 my-5 xl:my-0 gap-x-5 xl:gap-x-0"
        >
          <img
            class="flex object-cover w-full"
            :src="data.img"
            alt=""
            :class="
              closedForm ? 'h-[15vh] xl:h-[25vh]' : 'h-[15vh] xl:h-[55vh]'
            "
          />
          <div
            class="gap-x-5 xl:hidden flex flex-col justify-center items-end xl:justify-end xl:items-end"
          >
            <p class="text-6xl flex xl:w-1/3">*</p>
            <div
              class="flex flex-col justify-end items-end gap-y-4 w-full xl:w-2/3 mb-5 xl:mb-0"
            >
              <h4
                class="bg-orange h-6 xl:h-8 w-full flex justify-center items-center text-border-lime text-xl"
              >
                <span class="rotate-[-8deg]">{{ data.category }}</span>
              </h4>
              <h4
                class="bg-lime h-6 xl:h-8 w-full flex justify-center items-center text-border-orange text-xl"
              >
                <span class="rotate-[8deg]">{{ data.country }}</span>
              </h4>
            </div>
          </div>
        </div>

        <div
          class="order-2 border-black border-y-2 xl:border-none"
          :class="{ 'border-none': !closedForm }"
        >
          <p v-if="closedForm" class="px-5 my-5 xl:mb-5 xl:mt-0 xl:px-0">
            I N G R E D I E N T S
            <button @click="toggleIngredientsVisibility" class="xl:hidden">
              <span v-if="!ingredientsVisible"
                ><i class="fa-solid fa-caret-down"></i
              ></span>
              <span v-if="ingredientsVisible"
                ><i class="fa-solid fa-caret-up"></i
              ></span>
            </button>
          </p>

          <div
            v-if="closedForm && ingredientsVisible"
            class="overflow-auto scrollbar-thin scrollbar-thumb-lime scrollbar-track-orange xl:h-[20vh] w-full grid xl:grid-cols-2 gap-2 content-start pb-5 xl:pb-0 px-5 xl:px-0"
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
        </div>

        <div
          class="order-1 xl:order-3 border-black border-t-2 xl:border-none p-5 xl:p-0"
          :class="{ 'hidden, p-0': !closedForm }"
        >
          <button
            v-if="closedForm"
            @click="toggleVisibility"
            class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange xl:mb-5"
          >
            Add to weekly menu
          </button>
        </div>
      </div>

      <div class="grid xl:col-span-5 h-[60vh] xl:h-[68vh] p-5 mb-10">
        <p v-if="closedForm">
          H O W &nbsp&nbspT O &nbsp&nbspC O O K&nbsp&nbsp I T
        </p>
        <p v-else>
          A D D &nbsp&nbspT O &nbsp&nbspW E E K L Y &nbsp&nbspM E N U
        </p>

        <ol
          v-if="closedForm"
          class="list-decimal h-[43vh] xl:h-[55vh] overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime w-[98%] pl-10 pr-4 pt-8 pb-6 xl:pl-16 xl:pr-10 xl:pt-10 xl:pb-8 font-hand text-lg border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-background"
        >
          <li v-for="(step, i) in formattedSteps" :key="i" class="mb-3">
            {{ step }}
          </li>
        </ol>

        <!-- ADD WEEKLY CARD -->
        <form
          v-else
          class="h-[48vh] xl:h-[58vh] w-full p-5 border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-blueberry"
        >
          <div class="h-[10vh] flex items-start justify-end">
            <button @click="toggleVisibility" class="h-[40px] w-[40px] bg-lime">
              <p class="text-border-orange hover:text-2xl">X</p>
            </button>
          </div>

          <div v-if="!sent">
            <div
              class="grid grid-cols-4 gap-x-5 h-[18vh] xl:h-[30vh] w-[98%] xl:mt-[7vh]"
            >
              <div class="col-span-1 flex flex-col gap-y-5">
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

              <div
                class="col-span-3 w-full flex flex-col justify-between h-[30vh]"
              >
                <div class="flex flex-col gap-y-5">
                  <select
                    name="day"
                    id="day"
                    class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[4vh] xl:h-[5vh]"
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
                    class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[4vh] xl:h-[5vh]"
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

          <div v-else class="flex justify-center items-center xl:h-[37vh]">
            <p
              class="mb-10 text-lg xl:text-2xl text-center leading-8 xl:leading-10"
            >
              <span class="text-border-orange bg-lime py-2 px-5">{{
                data.name
              }}</span>
              <br />
              <span class="inline-block font-hand text-xl xl:text-xl my-3"
                >added on</span
              ><br />
              <span class="text-border-lime bg-orange py-2 px-5"
                >{{ selectedDay }} {{ selectedMeal }}</span
              >
            </p>
          </div>
          <button
            v-if="!sent"
            @click.prevent="addToWeeklyMenu"
            class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            Add to weekly menu
          </button>
          <button
            v-else
            @click.prevent="addToWeeklyMenu"
            class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            <router-link :to="`/schedule`">Check full menu</router-link>
          </button>
        </form>
        <!-- ADD WEEKLY CARD -->
      </div>
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
      ingredientsVisible: false,
    };
  },
  setup() {
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  created() {
    this.getRecipes();
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
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
    toggleIngredientsVisibility() {
      this.ingredientsVisible = !this.ingredientsVisible;
    },
    handleWindowResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1280) {
        this.ingredientsVisible = true;
      } else {
        this.ingredientsVisible = false;
      }
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
