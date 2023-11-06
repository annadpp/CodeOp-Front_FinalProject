<template>
  <div v-if="loading" class="w-full px-5 h-[20vh] flex items-center">
    <Loader class="w-full" img="8" />
  </div>

  <div
    v-else
    v-if="showFilter"
    class="flex flex-col justify-around dark:border-background h-[50vh] xl:h-[65vh] p-5"
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
            'rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full',
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
          class="bg-background dark:bg-stone-950"
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
            'rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full',
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
</template>

<script>
import Loader from "../components/Loader.vue";
import { useSchedule } from "../stores/schedule";

export default {
  name: "Recipes",
  components: { Loader },
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

<style lang="scss" scoped></style>
