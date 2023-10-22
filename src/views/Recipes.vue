<template>
  <div class="grid grid-cols-7 justify-center items-center">
    <div class="grid col-span-4 h-[85vh] border-black border-r-2 p-5">
      <div class="grid row-span-2 items-center h-[17vh]">
        <h2>What could I eat?</h2>
      </div>

      <div class="grid h-[65vh] border-black">
        <div class="flex h-[5vh]">
          <h3
            class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-2xl"
          >
            Recipes ({{ search ? filteredRecipes.length : totalRecipes }})
          </h3>
        </div>
        <div
          class="grid grid-cols-2 h-[55vh] gap-5 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime mt-6"
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

    <div class="grid col-span-3 h-[85vh]">
      <div
        class="flex flex-col justify-center items-center h-[20vh] gap-x-5 w-full px-8 gap-y-5"
      >
        <p>S E A R C H &nbsp&nbsp+ &nbsp&nbspF I L T E R</p>
        <input
          v-model="search"
          class="border-black drop-shadow-[8px_8px_0px_#000000] p-2 w-full h-[5vh]"
          type="text"
        />
      </div>

      <div
        class="flex flex-col justify-around border-black border-t-2 h-[65vh] p-5"
      >
        <div class="flex gap-x-5">
          <button
            :class="{
              'bg-orange text-border-lime': showCategories,
              'bg-lime text-border-orange': !showCategories,
            }"
            class="h-8 flex justify-center items-center text-xl w-1/2"
            @click="
              showCategories = true;
              showCountries = false;
              activeCountry = false;
            "
          >
            Category
          </button>

          <button
            :class="{
              'bg-orange text-border-lime': showCountries,
              'bg-lime text-border-orange': !showCountries,
            }"
            class="h-8 flex justify-center items-center text-xl w-1/2"
            @click="
              showCategories = false;
              showCountries = true;
            "
          >
            Country
          </button>
        </div>

        <div v-if="showCategories">
          <div
            class="grid grid-cols-2 gap-x-5 h-[50vh] justify-center items-center"
          >
            <button
              v-for="category in dataCategories"
              @click="handleCategories(category)"
              :class="[
                'rounded-full border-2 border-black h-[5vh] w-full',
                { 'hover:border-orange hover:text-orange': !selectedCategory },
                { 'border-orange text-orange': selectedCategory === category },
                {
                  'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300 cursor-no-drop	':
                    selectedCategory && selectedCategory !== category,
                },
              ]"
              :disabled="selectedCategory && selectedCategory !== category"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div v-else-if="showCountries">
          <div
            class="grid grid-cols-2 gap-x-5 h-[50vh] justify-center items-center"
          >
            <button
              v-for="country in dataCountries"
              @click="handleCountries(country)"
              :class="[
                'rounded-full border-2 border-black h-[5vh] w-full',
                { 'hover:border-orange hover:text-orange': !selectedCountry },
                { 'border-orange text-orange': selectedCountry === country },
                {
                  'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300 cursor-no-drop	':
                    selectedCountry && selectedCountry !== country,
                },
              ]"
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

export default {
  name: "Recipes",
  components: { Card },
  data() {
    return {
      data: [],
      dataCategories: [],
      loading: false,
      search: "",
      selectedCategory: null,
      activeCategory: true,
      selectedCountry: null,
      activeCountry: true,
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
      showCategories: true,
      showCountries: false,
    };
  },
  setup() {},
  mounted() {
    this.getRecipes();
    this.getCategories();
  },
  watch: {
    data: "totalRecipes",
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
    handleCategories(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null;
        this.activeCategory = true;
      } else {
        this.selectedCategory = category;
        this.activeCategory = false;
      }
    },
    handleResponseCountries() {
      this.dataCountries = response.data;
    },
    handleCountries(country) {
      if (this.selectedCountry === country) {
        this.selectedCountry = null;
        this.activeCountry = true;
      } else {
        this.selectedCountry = country;
        this.activeCountry = false;
      }
    },
  },
  computed: {
    totalRecipes() {
      return this.data.length + 1;
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
