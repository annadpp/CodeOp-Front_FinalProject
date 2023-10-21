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
            Recipes ({{ totalRecipes }})
          </h3>
        </div>
        <div
          class="grid grid-cols-2 h-[55vh] gap-5 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime mt-6"
        >
          <Card
            v-for="recipe in data"
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
          class="border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
          type="text"
        />
      </div>

      <div
        class="flex flex-col justify-around border-black border-t-2 h-[65vh] p-5"
      >
        <div class="flex gap-x-5">
          <button
            class="bg-lime h-8 flex justify-center items-center text-border-orange text-xl w-1/2"
          >
            Ingredient
          </button>

          <button
            class="bg-orange h-8 flex justify-center items-center text-border-lime text-xl w-1/2"
          >
            Country
          </button>
        </div>

        <div class="flex gap-x-5 h-[55vh] justify-center items-center">
          <button
            class="rounded-full border-2 border-black h-[5vh] w-1/2 hover:border-orange hover:text-orange"
          >
            button
          </button>
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
      loading: false,
    };
  },
  setup() {},
  mounted() {
    this.getRecipes();
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
          console.error(
            `No recipes with letter ${String.fromCharCode(letter)}`,
            error
          );
        }
      }

      this.loading = false;
    },
    handleResponse(response) {
      const recipes = response.data.meals.map((recipe) => ({
        name: recipe.strMeal,
        img: recipe.strMealThumb,
        id: recipe.idMeal,
      }));
      this.data = this.data.concat(recipes); // Concatenate recipes for each letter
    },
  },
  computed: {
    totalRecipes() {
      return this.data.length + 1;
    },
  },
};
</script>

<style>
.text-border-lime {
  text-shadow: rgb(208, 238, 82) 5px 0px 0px,
    rgb(208, 238, 82) 4.90033px 0.993347px 0px,
    rgb(208, 238, 82) 4.60531px 1.94709px 0px,
    rgb(208, 238, 82) 4.12668px 2.82321px 0px,
    rgb(208, 238, 82) 3.48353px 3.58678px 0px,
    rgb(208, 238, 82) 2.70151px 4.20736px 0px,
    rgb(208, 238, 82) 1.81179px 4.6602px 0px,
    rgb(208, 238, 82) 0.849836px 4.92725px 0px,
    rgb(208, 238, 82) -0.145998px 4.99787px 0px,
    rgb(208, 238, 82) -1.13601px 4.86924px 0px,
    rgb(208, 238, 82) -2.08073px 4.54649px 0px,
    rgb(208, 238, 82) -2.94251px 4.04248px 0px,
    rgb(208, 238, 82) -3.68697px 3.37732px 0px,
    rgb(208, 238, 82) -4.28444px 2.57751px 0px,
    rgb(208, 238, 82) -4.71111px 1.67494px 0px,
    rgb(208, 238, 82) -4.94996px 0.7056px 0px,
    rgb(208, 238, 82) -4.99147px -0.291871px 0px,
    rgb(208, 238, 82) -4.83399px -1.27771px 0px,
    rgb(208, 238, 82) -4.48379px -2.2126px 0px,
    rgb(208, 238, 82) -3.95484px -3.05929px 0px,
    rgb(208, 238, 82) -3.26822px -3.78401px 0px,
    rgb(208, 238, 82) -2.4513px -4.35788px 0px,
    rgb(208, 238, 82) -1.53666px -4.75801px 0px,
    rgb(208, 238, 82) -0.560763px -4.96845px 0px,
    rgb(208, 238, 82) 0.437495px -4.98082px 0px,
    rgb(208, 238, 82) 1.41831px -4.79462px 0px,
    rgb(208, 238, 82) 2.34258px -4.41727px 0px,
    rgb(208, 238, 82) 3.17346px -3.86382px 0px,
    rgb(208, 238, 82) 3.87783px -3.15633px 0px,
    rgb(208, 238, 82) 4.4276px -2.32301px 0px,
    rgb(208, 238, 82) 4.80085px -1.39708px 0px,
    rgb(208, 238, 82) 4.98271px -0.415447px 0px;
}

.text-border-orange {
  text-shadow: rgb(253, 95, 9) 5px 0px 0px,
    rgb(253, 95, 9) 4.90033px 0.993347px 0px,
    rgb(253, 95, 9) 4.60531px 1.94709px 0px,
    rgb(253, 95, 9) 4.12668px 2.82321px 0px,
    rgb(253, 95, 9) 3.48353px 3.58678px 0px,
    rgb(253, 95, 9) 2.70151px 4.20736px 0px,
    rgb(253, 95, 9) 1.81179px 4.6602px 0px,
    rgb(253, 95, 9) 0.849836px 4.92725px 0px,
    rgb(253, 95, 9) -0.145998px 4.99787px 0px,
    rgb(253, 95, 9) -1.13601px 4.86924px 0px,
    rgb(253, 95, 9) -2.08073px 4.54649px 0px,
    rgb(253, 95, 9) -2.94251px 4.04248px 0px,
    rgb(253, 95, 9) -3.68697px 3.37732px 0px,
    rgb(253, 95, 9) -4.28444px 2.57751px 0px,
    rgb(253, 95, 9) -4.71111px 1.67494px 0px,
    rgb(253, 95, 9) -4.94996px 0.7056px 0px,
    rgb(253, 95, 9) -4.99147px -0.291871px 0px,
    rgb(253, 95, 9) -4.83399px -1.27771px 0px,
    rgb(253, 95, 9) -4.48379px -2.2126px 0px,
    rgb(253, 95, 9) -3.95484px -3.05929px 0px,
    rgb(253, 95, 9) -3.26822px -3.78401px 0px,
    rgb(253, 95, 9) -2.4513px -4.35788px 0px,
    rgb(253, 95, 9) -1.53666px -4.75801px 0px,
    rgb(253, 95, 9) -0.560763px -4.96845px 0px,
    rgb(253, 95, 9) 0.437495px -4.98082px 0px,
    rgb(253, 95, 9) 1.41831px -4.79462px 0px,
    rgb(253, 95, 9) 2.34258px -4.41727px 0px,
    rgb(253, 95, 9) 3.17346px -3.86382px 0px,
    rgb(253, 95, 9) 3.87783px -3.15633px 0px,
    rgb(253, 95, 9) 4.4276px -2.32301px 0px,
    rgb(253, 95, 9) 4.80085px -1.39708px 0px,
    rgb(253, 95, 9) 4.98271px -0.415447px 0px;
}
</style>
