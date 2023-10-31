<template>
  <div
    class="absolute z-0 w-full xl:static top-[10vh] grid grid-cols-1 xl:grid-cols-8 justify-center items-center"
  >
    <div class="grid xl:hidden items-center h-[15vh] p-5">
      <h2 class="text-4xl xl:text-left">What could I eat?</h2>
    </div>
    <div
      class="grid order-2 xl:order-1 col-span-1 xl:col-span-5 h-[67vh] xl:h-[85vh] xl:border-black xl:border-r-2 xl:p-5"
    >
      <div
        class="hidden xl:grid xl:row-span-2 items-center h-[15vh] xl:h-[17vh] p-5 xl:p-0"
      >
        <h2 class="text-6xl text-center xl:text-left">What could I eat?</h2>
      </div>
      <div class="grid h-[65vh] px-5 pt-8 xl:p-0">
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
        <div
          class="grid grid-cols-2 h-[52vh] gap-3 xl:gap-5 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime"
        >
          <Card
            v-for="recipe in search ? filteredRecipes : filtersRight"
            :key="recipe.id"
            heightcard="25"
            heightimg="15"
            heighttext="10"
            :id="recipe.id"
            :name="recipe.name"
            :img="recipe.img"
          />
        </div>
      </div>
    </div>

    <div
      class="grid order-1 xl:order-2 col-span-1 border-black border-y-2 xl:border-none xl:col-span-3 xl:h-[85vh]"
    >
      <div
        class="flex flex-col justify-center items-center xl:h-[20vh] gap-x-5 w-full px-8 py-5 xl:py-0 gap-y-5"
      >
        <p>S E A R C H &nbsp&nbsp+ &nbsp&nbspF I L T E R</p>
        <input
          v-model="search"
          class="border-black drop-shadow-[8px_8px_0px_#000000] p-2 w-full h-[4vh] xl:h-[5vh]"
          type="text"
        />
        <div class="xl:hidden flex justify-end w-full mt-1">
          <button
            @click="toggleFilter"
            class="item-right rounded-full border-2 border-black h-[4vh] w-2/3 sm:w-2/5 hover:border-orange hover:text-orange"
          >
            Advanced filter
          </button>
        </div>
      </div>

      <div
        v-if="showFilter"
        class="flex flex-col justify-around border-black border-t-2 h-[50vh] xl:h-[65vh] p-5"
      >
        <div class="flex gap-x-5">
          <button
            :class="{
              'bg-orange text-border-lime': showCategories,
              'bg-lime text-border-orange': !showCategories,
            }"
            class="h-6 xl:h-8 flex justify-center items-center text-xl w-1/2"
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
            class="h-6 xl:h-8 flex justify-center items-center text-xl w-1/2"
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

        <div v-if="showCategories">
          <div
            class="grid grid-cols-2 gap-x-3 xl:gap-x-5 h-[40vh] xl:h-[50vh] justify-center items-center"
          >
            <button
              v-for="category in dataCategories"
              @click="handleCategories(category)"
              :class="[
                'rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full',
                {
                  'hover:border-orange hover:text-orange': !selectedCategory,
                },
                {
                  'border-orange text-orange': selectedCategory === category,
                },
                {
                  'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300 cursor-no-drop	':
                    selectedCategory && selectedCategory !== category,
                },
              ]"
              class="bg-background"
              :disabled="selectedCategory && selectedCategory !== category"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div v-else-if="showCountries">
          <div
            class="grid grid-cols-2 gap-x-3 xl:gap-x-5 h-[40vh] xl:h-[50vh] justify-center items-center"
          >
            <button
              v-for="country in dataCountries"
              @click="handleCountries(country)"
              :class="[
                'rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full',
                { 'hover:border-orange hover:text-orange': !selectedCountry },
                { 'border-orange text-orange': selectedCountry === country },
                {
                  'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300 cursor-no-drop	':
                    selectedCountry && selectedCountry !== country,
                },
              ]"
              class="bg-background"
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
import { useSchedule } from "../stores/schedule";

export default {
  name: "Recipes",
  components: { Card },
  data() {
    return {
      data: [],
      dataCategories: [],
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
      loading: false,
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
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  mounted() {
    this.getRecipes();
    this.getCategories();
    this.scheduleStore.handleInfo = "";
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  watch: {
    search: function () {
      this.selectedCountry = null;
      this.selectedCategory = null;
    },
  },
  methods: {
    async getRecipes() {
      this.loading = true;
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
      this.loading = false;
    },
    handleResponse(response) {
      const recipes = response.data.meals.map((recipe) => ({
        name: recipe.strMeal,
        img: recipe.strMealThumb,
        id: recipe.idMeal,
        category: recipe.strCategory,
        country: recipe.strArea,
      }));
      this.data = this.data.concat(recipes);
    },
    getCategories() {
      this.loading = true;
      const apiUrlCategories =
        "https://www.themealdb.com/api/json/v1/1/categories.php";
      axios
        .get(apiUrlCategories)
        .then(this.handleResponseCategories)
        .finally(() => {
          this.loading = false;
        });
    },
    handleResponseCategories(response) {
      this.dataCategories = response.data.categories.map(
        (category) => category.strCategory
      );
    },
    async handleCategories(category) {
      this.search = null;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (this.selectedCategory === category) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
        this.selectedCountry = null;
      }
      this.activeCategory = !this.activeCategory;
      this.activeCountry = false;
    },
    switchCategories() {
      this.showCategories = true;
      this.showCountries = false;
    },
    handleResponseCountries() {
      this.dataCountries = response.data;
    },
    async handleCountries(country) {
      this.search = null;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (this.selectedCountry === country) {
        this.selectedCountry = null;
      } else {
        this.selectedCountry = country;
        this.selectedCategory = null;
      }
      this.activeCountry = !this.activeCountry;
      this.activeCategory = false;

      this.search = null;
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
    totalRecipes() {
      return this.data.length;
    },
    filteredRecipes() {
      const input = this.search.toLowerCase();
      return this.data.filter((recipe) =>
        recipe.name.toLowerCase().includes(input)
      );
    },
    filteredCategories() {
      if (this.selectedCategory) {
        const category = this.selectedCategory.toLowerCase();
        return this.data.filter(
          (recipe) => recipe.category.toLowerCase() === category
        );
      }
      return this.data;
    },
    filteredCountries() {
      if (this.selectedCountry) {
        const country = this.selectedCountry.toLowerCase();
        return this.data.filter(
          (recipe) => recipe.country.toLowerCase() === country
        );
      }
      return this.data;
    },
    filtersRight() {
      return this.selectedCategory
        ? this.filteredCategories
        : this.filteredCountries;
    },
  },
};
</script>

<style></style>
