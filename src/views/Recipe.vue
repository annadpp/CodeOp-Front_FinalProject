<template>
  <div
    v-if="loading"
    class="w-full h-[100vh] xl:h-[75vh] px-5 flex items-center"
  >
    <Loader class="w-full" />
  </div>
  <div v-else class="absolute z-0 w-full xl:static top-[10vh]">
    <div
      class="grid xl:grid-cols-10 items-center h-[15vh] xl:h-[17vh] pt-8 xl:px-5 xl:mb-2"
    >
      <!--RECIPE NAME -> data from API-->
      <div class="xl:col-span-8">
        <h2
          class="text-xl xl:text-4xl text-center xl:text-left leading-6 px-5 xl:p-0 dark:text-background"
        >
          {{ data.name }}
        </h2>
      </div>
      <!--RECIPE INFO (category + country) DESKTOP -> data from API-->
      <div class="xl:col-span-2">
        <div class="gap-x-5 hidden xl:flex">
          <p
            class="text-6xl flex justify-end items-end text-left w-1/3 dark:text-background"
          >
            *
          </p>
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
        class="grid xl:col-span-3 xl:h-[68vh] border-black dark:border-background border-t-2 xl:border-t-0 xl:border-r-2 xl:p-5 xl:gap-y-5"
      >
        <div
          class="grid grid-cols-2 xl:flex px-5 xl:px-0 my-5 xl:my-0 gap-x-5 xl:gap-x-0"
        >
          <!--IMG styles change on open/closed "add to weekly menu" form-->
          <img
            class="flex object-cover w-full"
            :src="data.img"
            alt=""
            :class="
              closedForm ? 'h-[15vh] xl:h-[25vh]' : 'h-[15vh] xl:h-[55vh]'
            "
          />
          <!--RECIPE INFO (category + country) MOBILE-->
          <div
            class="gap-x-5 xl:hidden flex flex-col justify-center items-end xl:justify-end xl:items-end"
          >
            <p class="text-6xl flex xl:w-1/3 dark:text-background">*</p>
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

        <!--RECIPE INFO (ingredients) -> data info from API-->
        <div
          class="order-2 border-black dark:border-background border-y-2 xl:border-none"
          :class="{ 'border-none': !closedForm }"
        >
          <p
            v-if="closedForm"
            class="px-5 my-5 xl:mb-5 xl:mt-0 xl:px-0 dark:text-background"
          >
            I N G R E D I E N T S
            <!--Button open filter ingredients MOBILE-->
            <button @click="toggleIngredientsVisibility" class="xl:hidden">
              <span v-if="!ingredientsVisible"
                ><i class="fa-solid fa-caret-down"></i
              ></span>
              <span v-if="ingredientsVisible"
                ><i class="fa-solid fa-caret-up"></i
              ></span>
            </button>
          </p>

          <!--Ingredients div only displayed when filter on-->
          <div
            v-if="closedForm && ingredientsVisible"
            class="overflow-auto scrollbar-thin scrollbar-thumb-lime scrollbar-track-orange xl:h-[20vh] w-full grid xl:grid-cols-2 gap-2 content-start pb-5 xl:pb-0 px-5 xl:px-0"
          >
            <!--Loops on info from API to get ingredient info-->
            <div
              v-for="ingredient in data.ingredients"
              class="flex justify-center items-center bg-blueberry h-[3vh] w-full dark:text-background"
            >
              <p class="font-hand">
                <u class="capitalize">{{ ingredient.name }}</u
                >: <i>{{ ingredient.measure }}</i>
              </p>
            </div>
          </div>
        </div>

        <!--Button add to weekly menu only displayed if filter on-->
        <div
          class="order-1 xl:order-3 border-black border-t-2 xl:border-none p-5 xl:p-0"
          :class="{ 'hidden, p-0': !closedForm }"
        >
          <button
            v-if="closedForm"
            @click="toggleVisibility"
            class="rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange xl:mb-5"
          >
            Add to weekly menu
          </button>
        </div>
      </div>

      <div
        class="grid xl:col-span-5 h-[60vh] xl:h-[68vh] p-5 mb-10 dark:text-background"
      >
        <p v-if="closedForm">
          H O W &nbsp&nbspT O &nbsp&nbspC O O K&nbsp&nbsp I T
        </p>
        <p v-else>
          A D D &nbsp&nbspT O &nbsp&nbspW E E K L Y &nbsp&nbspM E N U
        </p>

        <ol
          v-if="closedForm"
          class="list-decimal h-[43vh] xl:h-[55vh] overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime w-[98%] pl-10 pr-4 pt-8 pb-6 xl:pl-16 xl:pr-10 xl:pt-10 xl:pb-8 font-hand text-lg border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] bg-background dark:bg-stone-950"
        >
          <li v-for="(step, i) in formattedSteps" :key="i" class="mb-3">
            {{ step }}
          </li>
        </ol>

        <!--*********************ADD WEEKLY CARD-->
        <div
          v-else
          class="h-[48vh] xl:h-[58vh] w-full p-5 border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] bg-blueberry"
        >
          <div class="h-[10vh] flex items-start justify-end">
            <!--Close add to weekly button-->
            <button @click="toggleVisibility" class="h-[40px] w-[40px] bg-lime">
              <p class="text-border-orange hover:text-2xl text-black">X</p>
            </button>
          </div>

          <!--SELECT MEAL/DAY VALUES -> shown if information not sent-->
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

              <div
                class="col-span-3 w-full flex flex-col justify-between h-[30vh]"
              >
                <div class="flex flex-col gap-y-5">
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

          <!--RECIPE ADDED INFO (name, day, meal)-> Shown if information sent-->
          <div v-else class="flex justify-center items-center xl:h-[37vh]">
            <p
              class="mb-10 text-lg xl:text-2xl text-center leading-8 xl:leading-10"
            >
              <span class="text-border-orange bg-lime py-2 px-5 text-black">{{
                data.name
              }}</span>
              <br />
              <span class="inline-block font-hand text-xl xl:text-xl my-3"
                >added on</span
              ><br />
              <span class="text-border-lime bg-orange py-2 px-5 text-black"
                >{{ selectedDay }} {{ selectedMeal }}</span
              >
            </p>
          </div>

          <!--BUTTONS BOTTOM-->
          <!--Add to weekly menu -> if info not sent-->
          <button
            :disabled="!selectedDay || !selectedMeal"
            v-if="!sent"
            @click.prevent="addToWeeklyMenu"
            class="rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full"
            :class="{
              'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-stone-900 dark:border-stone-900 dark:text-stone-900 hover:dark:border-stone-900 hover:dark:text-stone-900 cursor-no-drop':
                !selectedDay || !selectedMeal,
              'hover:border-orange hover:text-orange':
                selectedDay || selectedMeal,
            }"
          >
            Add to weekly menu
            <span v-if="!selectedDay || !selectedMeal"
              >(fill in all the fields)</span
            >
          </button>
          <!--Check full menu -> if info sent-->
          <button
            v-else
            @click.prevent="addToWeeklyMenu"
            class="rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            <router-link :to="`/schedule`">Check full menu</router-link>
          </button>
        </div>
        <!-- ADD WEEKLY CARD -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../components/Loader.vue";
import { useSchedule } from "../stores/schedule";
import { useRecipe } from "../stores/recipes";
import { getRecipes } from "../firebase";
import { updateSchedule } from "../firebase";

export default {
  name: "Recipe",
  components: { Loader },
  data() {
    return {
      //Stores info gotten from API
      data: {
        img: "",
        name: "",
        ingredients: [],
        category: "",
        country: "",
        steps: "",
      },
      //Other values needed for functions
      loading: true,
      closedForm: true,
      weeklyMenu: [],
      selectedMeal: "",
      selectedDay: "",
      sent: false,
      ingredientsVisible: false,
    };
  },
  setup() {
    //Gets info from Pinia scheduleStore
    const scheduleStore = useSchedule();
    const recipesStore = useRecipe();
    return { scheduleStore, recipesStore };
  },
  created() {
    this.getRecipes();
    console.log("this.recipesStore.recipe", this.recipesStore.recipe);
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();

    // Getting recipes asynchronously
    getRecipes().then((newRecipe) => {
      this.recipesStore.recipe = newRecipe;
      this.getRecipes(); // Call getRecipes after setting this.recipesStore.recipe
      this.loading = false; // This could be placed here if loading relies on the completion of these initializations
    });

    setTimeout(() => {
      this.loading = false; //Sets loading to false after 1 second -> for fake loader
    }, 800);
  },
  methods: {
    //Used to get recipes info from API based on params.id received from Recipes
    getRecipes() {
      const idRecipe = Number(this.$route.params.id);

      if (idRecipe < 99999) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

        axios
          .get(apiUrl)
          .then((response) => {
            this.handleResponse(response);
          })
          .catch((error) => {
            console.error(`Error fetching recipe:`, error);
          });
      } else {
        this.handleNewRecipes();
      }
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
        //Info from API we're storing/using
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
    handleNewRecipes() {
      if (this.recipesStore.recipe && this.recipesStore.recipe.length > 0) {
        const thisRecipe = this.recipesStore.recipe.find(
          (recipe) => recipe.idMeal === Number(this.$route.params.id)
        );

        if (thisRecipe) {
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredientName = thisRecipe[`strIngredient${i}`];
            const measure = thisRecipe[`strMeasure${i}`];
            if (ingredientName) {
              ingredients.push({
                name: ingredientName,
                measure: measure,
              });
            }
          }

          this.data = {
            id: thisRecipe.idMeal,
            img: thisRecipe.strMealThumb,
            name: thisRecipe.strMeal,
            ingredients: ingredients,
            category: thisRecipe.strCategory,
            country: thisRecipe.strArea,
            steps: thisRecipe.strInstructions,
          };
        }
      }
    },
    toggleVisibility() {
      //Toggles closedForm to open/close add recipe form + changes sent status
      this.closedForm = !this.closedForm;
      this.sent = false;
      this.selectedDay = "";
      this.selectedMeal = "";
    },
    addToWeeklyMenu() {
      //Find an existing recipe in schedule that matches the day + meal of current recipe by checking the index.
      const existing = this.scheduleStore.schedule.findIndex(
        (recipe) =>
          recipe.day === this.selectedDay && recipe.meal === this.selectedMeal
      );

      if (existing !== -1) {
        //If an entry for the same day and meal already exists, updates it (we just want one recipe per meal/day)
        this.scheduleStore.schedule[existing] = {
          meal: this.selectedMeal,
          day: this.selectedDay,
          img: this.data.img,
          name: this.data.name,
          id: Number(this.$route.params.id),
          ingredients: this.data.ingredients.map(
            (ingredient) => ingredient.name
          ),
        };
      } else {
        //If no entry exists for the same day and meal, adds a new entry
        this.scheduleStore.schedule.push({
          meal: this.selectedMeal,
          day: this.selectedDay,
          img: this.data.img,
          name: this.data.name,
          id: Number(this.$route.params.id),
          ingredients: this.data.ingredients.map(
            (ingredient) => ingredient.name
          ),
        });
      }
      //Once filtering and adding is done, updates schedule array in Pinia
      updateSchedule(this.scheduleStore.schedule);
      this.sent = true;
    },
    toggleIngredientsVisibility() {
      this.ingredientsVisible = !this.ingredientsVisible;
    },
    handleWindowResize() {
      //Needed to close ingredients div on MOBILE (open default in DESKTOP)
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
      //Regex to give recipe steps consistency
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
