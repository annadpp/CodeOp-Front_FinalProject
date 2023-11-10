<template>
  <div
    class="absolute z-0 w-full xl:static top-[10vh] grid grid-cols-1 xl:grid-cols-8 justify-center items-center"
  >
    <div class="grid xl:hidden items-center h-[15vh] p-5">
      <h2
        class="text-center text-4xl xl:text-left text-black dark:text-background"
      >
        What could I eat?
      </h2>
    </div>

    <!--GRID LEFT-->
    <div
      class="grid order-2 xl:order-1 col-span-1 xl:col-span-5 h-[50vh] md:h-[58vh] xl:h-[85vh] xl:border-black dark:xl:border-background xl:border-r-2 xl:p-5"
    >
      <div
        class="hidden xl:grid xl:row-span-2 items-center h-[15vh] xl:h-[17vh] p-5 xl:p-0"
      >
        <h2
          class="text-6xl text-center xl:text-left text-black dark:text-background"
        >
          What could I eat?
        </h2>
      </div>
      <div class="grid h-[42vh] md:h-[30vh] xl:h-[58vh] px-5 pt-8 xl:p-0">
        <!--RECIPES COUNTER-->
        <div class="flex h-[5vh]">
          <h3
            class="bg-orange h-7 xl:h-8 w-full flex justify-center items-center text-border-lime text-xl xl:text-2xl"
          >
            <span class="rotate-[8deg]"
              >Recipes ({{
                search ? filteredRecipes.length : filtersRight.length
              }})</span
            >
          </h3>
        </div>

        <!--LOADER FOR RECIPES-->
        <div
          v-if="loading"
          class="h-[5vh] md:h-[3vh] xl:h-[52vh] w-full flex xl:items-center"
        >
          <Loader class="w-full md:mt-8 xl:mt-0" />
        </div>
        <!--RECIPES -> info received from API-->
        <div
          v-else
          class="h-[30vh] md:h-[32vh] mb-4 xl:mb-0 xl:h-[50vh] gap-3 xl:gap-5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime"
          :class="{
            'flex items-center': loading,
            'grid grid-cols-2': !loading && filteredRecipes.length >= 1,
          }"
        >
          <!--Recipes card -> checks filter to show info + passes props-->
          <Card
            v-show="filteredRecipes.length >= 1"
            v-for="recipe in search ? filteredRecipes : filtersRight"
            :key="recipe.id"
            heightcard="25"
            heightimg="15"
            heighttext="10"
            :id="recipe.id"
            :name="recipe.name"
            :img="recipe.img"
          />
          <!--IMAGE IN CASE THERE ARE NO ITEMS IN filteredItems-->
          <div
            v-show="filteredRecipes.length < 1"
            class="w-full h-[43vh] xl:h-[50vh] flex flex-col text-xl md:text-2xl items-center justify-center py-8 px-5 bg-blueberry dark:text-background"
          >
            <img
              src="../assets/mad-cat.png"
              alt=""
              class="object-contain h-[20vw] md:h-[11vw] xl:h-[9vw]"
            />
            <p class="font-hand mt-5">NO RECIPES</p>
          </div>
        </div>
      </div>
      <div
        v-if="!loading"
        class="xl:h-[9vh] flex items-center w-full md:mb-8 xl:mb-0 px-5 xl:px-0"
      >
        <router-link
          class="flex items-center justify-center rounded-full border-2 xl:text-lg bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange mb-6 dark:text-background"
          :to="`/recipes/new`"
          ><button>Add new custom recipe</button></router-link
        >
      </div>
    </div>

    <!--GRID RIGHT-->
    <div
      class="grid order-1 xl:order-2 col-span-1 xl:col-span-3 xl:h-[85vh]"
      :class="{
        'border-black dark:border-background border-b-2 xl:border-none':
          showFilter,
      }"
    >
      <div
        class="flex flex-col justify-center items-center xl:h-[20vh] gap-x-5 w-full px-8 py-5 xl:py-0 gap-y-5 border-black dark:border-background dark:text-background dark:xl:border-background border-y-2"
        :class="{
          'border-black pb-[2.35vh]': loading,
        }"
      >
        <p>S E A R C H &nbsp&nbsp+ &nbsp&nbspF I L T E R</p>
        <input
          placeholder="Look for a new recipe"
          v-model="search"
          class="border-black dark:border-background dark:bg-stone-900 dark:text-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] p-2 w-full h-[4vh] xl:h-[5vh]"
          type="text"
        />
        <div class="xl:hidden flex justify-end w-full mt-1">
          <!--Button open/close category/country filters MOBILE -> text depends on open/closed-->
          <button
            @click="toggleFilter"
            class="item-right rounded-full border-2 border-black dark:border-background text-sm md:text-base h-[4vh] w-2/3 sm:w-2/5 hover:border-orange hover:text-orange"
          >
            <span v-if="!showFilter">More filters</span
            ><span v-else>Less filters</span>
          </button>
        </div>
      </div>

      <!--LOADER FOR FILTERS-->
      <div v-if="loading" class="w-full px-5 xl:h-[20vh] flex items-center">
        <Loader class="hidden xl:flex w-full" img="8" />
      </div>

      <div
        v-else
        v-if="showFilter"
        class="flex flex-col justify-start xl:justify-around dark:border-background h-[44vh] xl:h-[65vh] p-5"
      >
        <!--CATEGORY/COUNTRIES BUTTONS-->
        <div class="flex gap-x-5">
          <button
            :class="{
              'bg-orange text-border-lime': showCategories,
              'bg-lime text-border-orange': !showCategories,
            }"
            class="mb-6 xl:mb-0 h-6 xl:h-8 flex justify-center items-center text-xl w-1/2"
            @click="
              showCategories = true;
              showCountries = false;
            "
          >
            <span
              :class="{
                'rotate-[-8deg]': !showCategories,
                'rotate-[8deg]': showCategories,
              }"
              >Category</span
            >
          </button>

          <button
            :class="{
              'bg-orange text-border-lime': showCountries,
              'bg-lime text-border-orange': !showCountries,
            }"
            class="mb-6 h-6 xl:h-8 flex justify-center items-center text-xl w-1/2"
            @click="
              showCategories = false;
              showCountries = true;
            "
          >
            <span
              :class="{
                'rotate-[-8deg]': !showCountries,
                'rotate-[8deg]': showCountries,
              }"
              >Country</span
            >
          </button>
        </div>

        <!--Different categories/countries to be filtered button -> depends on which of buttons above is selected-->
        <div v-if="showCategories">
          <div
            class="grid grid-cols-2 gap-y-[1vh] gap-x-3 xl:gap-x-5 h-[29vh] xl:h-[50vh] justify-center items-center"
          >
            <!--Adds a button for each category stored in dataCategories-->
            <button
              v-for="category in dataCategories"
              @click="handleCategories(category)"
              :class="[
                'rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full text-sm md:text-base',
                {
                  'hover:border-orange hover:text-orange dark:hover:border-orange dark:hover:text-orange':
                    !selectedCategory,
                },
                {
                  'border-orange text-orange dark:border-orange dark:text-orange':
                    selectedCategory === category,
                },
                {
                  'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300 dark:border-stone-900 dark:text-stone-900 hover:dark:border-stone-900 hover:dark:text-stone-900 cursor-no-drop	':
                    selectedCategory && selectedCategory !== category,
                },
              ]"
              class="bg-background dark:bg-stone-950"
              :disabled="selectedCategory && selectedCategory !== category"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div v-else-if="showCountries">
          <div
            class="grid grid-cols-2 gap-y-[1vh] gap-x-3 xl:gap-x-5 h-[29vh] xl:h-[50vh] justify-center items-center"
          >
            <!--Adds a button for each country stored in dataCountries-->
            <button
              v-for="country in dataCountries"
              @click="handleCountries(country)"
              :class="[
                'rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full text-sm md:text-base',
                { 'hover:border-orange hover:text-orange': !selectedCountry },
                { 'border-orange text-orange': selectedCountry === country },
                {
                  'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300 cursor-no-drop	':
                    selectedCountry && selectedCountry !== country,
                },
              ]"
              class="bg-background dark:bg-stone-950"
              :disabled="selectedCountry && selectedCountry !== country"
            >
              {{ country }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "../components/Card.vue";
import Loader from "../components/Loader.vue";
import { useSchedule } from "../stores/schedule";
import { useRecipe } from "../stores/recipes";
import { getRecipes } from "../firebase";

export default {
  name: "Recipes",
  components: { Card, Loader },
  data() {
    return {
      data: [],
      dataCategories: [],
      //Hardcoded as there is no way to access them through the free API info
      dataCountries: [
        "French",
        "Chinese",
        "Greek",
        "Indian",
        "Italian",
        "Japanese",
        "Mexican",
        "Moroccan",
        "Russian",
        "Argentinian",
        "Vietnamese",
        "Syrian",
        "Spanish",
        "Kenyan",
      ],
      loading: true,
      search: "",
      selectedCategory: null,
      activeCategory: true,
      selectedCountry: null,
      activeCountry: true,
      showCategories: true,
      showCountries: false,
      showFilter: true,
      screenWidth: window.innerWidth,
    };
  },
  setup() {
    //Gets info from Pinia recipesStore + scheduleStore
    const scheduleStore = useSchedule();
    const recipesStore = useRecipe();
    return { scheduleStore, recipesStore };
  },
  mounted() {
    //Gets information on mounted so it's correctly updated from other parts of the app
    this.getRecipes();
    this.getCategories();
    this.scheduleStore.handleInfo = ""; //Makes sure no remaining information from previous computations is still stored -> could lead to code failure
    //Checks screen width -> for filters open/closed MOBILE
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    //Gets info from Firebase -> async function in firebase.js
    getRecipes().then((newRecipe) => {
      this.recipesStore.recipe = newRecipe;
    });
  },
  watch: {
    search: function () {
      this.selectedCountry = null;
      this.selectedCategory = null;
    },
  },
  methods: {
    async getRecipes() {
      //Runs through all alphabet letters -> API doesn't get info from all recipes at once, just per first letter
      for (
        let letter = "a".charCodeAt(0);
        letter <= "z".charCodeAt(0);
        letter++
      ) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${String.fromCharCode(
          letter
        )}`;
        try {
          const response = await axios.get(apiUrl);
          this.handleResponse(response);
        } catch (error) {
          console.error`No recipes with letter ${String.fromCharCode(letter)}`,
            error;
        }
      }
      this.handleNewRecipes();
      this.loading = false;
    },
    handleResponse(response) {
      //Loops through new recipes in API, gets the information and passes it to data
      const recipes = response.data.meals.map((recipe) => ({
        name: recipe.strMeal,
        img: recipe.strMealThumb,
        id: recipe.idMeal,
        category: recipe.strCategory,
        country: recipe.strArea,
      }));
      this.data = this.data.concat(recipes);
    },
    handleNewRecipes() {
      //Loops through new recipes in Pinia, gets the information and passes it to data
      const newRecipes = this.recipesStore.recipe.map((recipe) => ({
        name: recipe.strMeal,
        img: recipe.strMealThumb,
        id: recipe.idMeal,
        category: recipe.strCategory,
        country: recipe.strArea,
      }));
      this.data = this.data.concat(newRecipes);
    },
    getCategories() {
      //Used to get info from all categories in API -> API provides this option
      const apiUrlCategories =
        "https://www.themealdb.com/api/json/v1/1/categories.php";
      axios
        .get(apiUrlCategories)
        .then(this.handleResponseCategories)
        .finally(() => {
          this.loadingFilters = false;
        });
    },
    handleResponseCategories(response) {
      //Extracts category names from the API response and stores them in dataCategories
      this.dataCategories = response.data.categories.map(
        (category) => category.strCategory
      );
    },
    async handleCategories(category) {
      //Resets the search input
      this.search = null;
      //Awaits the next animation frame for smoother UI updates
      await new Promise((resolve) => requestAnimationFrame(resolve));
      //Toggles the selected category -> if it's already selected, deselect, otherwise select and deselect country
      if (this.selectedCategory === category) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
        this.selectedCountry = null;
      }
      //Toggles the active state of the category dropdown + resets the search input
      this.activeCategory = !this.activeCategory;
      this.activeCountry = false;
      this.search = null;
      if (this.screenWidth < 1280) {
        this.showFilter = false;
      }
    },
    async handleCountries(country) {
      //Resets the search input
      this.search = null;
      //Awaits the next animation frame for smoother UI updates
      await new Promise((resolve) => requestAnimationFrame(resolve));
      //Toggles the selected country -> if it's already selected, deselect, otherwise select and deselect category
      if (this.selectedCountry === country) {
        this.selectedCountry = null;
      } else {
        this.selectedCountry = country;
        this.selectedCategory = null;
      }
      //Toggles the active state of the category dropdown + resets the search input
      this.activeCountry = !this.activeCountry;
      this.activeCategory = false;
      this.search = null;
      if (this.screenWidth < 1280) {
        this.showFilter = false;
      }
    },
    //Methods below are self-explanatory
    switchCategories() {
      this.showCategories = true;
      this.showCountries = false;
    },
    switchCountries() {
      this.showCategories = false;
      this.showCountries = true;
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    handleWindowResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1280) {
        this.showFilter = true;
      } else {
        this.showFilter = false;
      }
    },
  },
  computed: {
    filteredRecipes() {
      //Filters recipes based on search input  -> lowercase so it's case insensitive
      const input = this.search.toLowerCase();
      return this.data.filter((recipe) =>
        recipe.name.toLowerCase().includes(input)
      );
    },
    filteredCategories() {
      //Checks if a category is selected -> lowercase so it's case insensitive
      if (this.selectedCategory) {
        const category = this.selectedCategory.toLowerCase();
        //Filters recipes whose category matches the selected category
        return this.data.filter(
          (recipe) => recipe.category.toLowerCase() === category
        );
      }
      //If no category is selected, returns all recipes
      return this.data;
    },
    filteredCountries() {
      // Filters recipes based on the selected country -> returns all recipes if no country is selected
      if (this.selectedCountry) {
        const country = this.selectedCountry.toLowerCase();
        //Filters recipes whose country matches the selected country
        return this.data.filter(
          (recipe) => recipe.country.toLowerCase() === country
        );
      }
      //If no country is selected, returns all recipes
      return this.data;
    },
    filtersRight() {
      //Returns the appropriate filter function (Countries/Categories) based on the selected category
      return this.selectedCategory
        ? this.filteredCategories
        : this.filteredCountries;
    },
  },
};
</script>

<style></style>
