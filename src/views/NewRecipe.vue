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
      <!--RECIPE NAME-->
      <div class="xl:col-span-8">
        <input
          v-model="name"
          placeholder="Add new recipe"
          class="w-full text-xl xl:text-4xl text-center xl:text-left leading-6 px-5 xl:p-0 dark:text-background bg-background"
        />
      </div>
      <!--RECIPE INFO (category + country)-->
      <div class="xl:col-span-2">
        <div class="gap-x-5 hidden xl:flex">
          <p class="text-6xl flex justify-end items-end text-left w-1/3">*</p>
          <div class="flex flex-col items-end gap-y-4 w-2/3">
            <h4
              class="bg-lime h-6 xl:h-8 w-full flex justify-center items-center text-lg"
            >
              <input
                v-model="category"
                placeholder="ADD CATEGORY"
                class="rotate-[-8deg] bg-transparent text-center text-border-orange w-full"
              />
            </h4>
            <h4
              class="bg-orange h-6 xl:h-8 w-full flex justify-center items-center text-lg"
            >
              <input
                v-model="country"
                placeholder="ADD COUNTRY"
                class="rotate-[8deg] bg-transparent text-center text-border-lime"
              />
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid xl:grid-cols-8">
    <div
      class="grid xl:col-span-3 xl:h-[57vh] border-black dark:border-background border-t-2 xl:border-t-0 xl:border-r-2 xl:gap-y-5"
    >
      <!--ADD IMAGE-->
      <div
        class="xl:flex flex-col px-5 my-5 xl:my-0 gap-x-5 xl:gap-x-0 h-[25.5vh] border-black border-b-2"
      >
        <p class="dark:text-background">A D D&nbsp;&nbsp; I M A G E</p>
        <div class="flex flex-col justify-center h-[19vh] gap-y-5 mt-2">
          <div class="h-[16vh] flex items-center">
            <input
              v-if="!addImageInfoClicked"
              placeholder="Write image url"
              v-model="image"
              class="border-black dark:bg-stone-900 dark:text-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] p-2 w-[99%] h-[4vh] xl:h-[5vh]"
              type="text"
            />
            <img
              v-else
              :src="image"
              class="flex object-cover w-full h-[12vh]"
              alt=""
            />
          </div>

          <div>
            <button
              v-if="!addImageInfoClicked"
              class="rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
              @click="addImageInfoClicked = true"
            >
              Add image
            </button>
            <button
              v-else
              class="rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
            >
              Change image
            </button>
          </div>
        </div>
      </div>

      <!--ADD INGREDIENTS-->
      <div
        class="border-black dark:border-background border-y-2 xl:border-none px-5"
      >
        <p class="px-5 xl:mb-5 xl:mt-0 xl:px-0 dark:text-background">
          A D D &nbsp;&nbsp;I N G R E D I E N T S
        </p>
        <div
          class="h-[11vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime mb-5"
        >
          <div
            v-for="(item, i) in ingredients"
            :key="i"
            class="grid grid-cols-2 gap-2 mb-2"
          >
            <input
              v-model="item.ingredient"
              :placeholder="'Ingredient ' + (i + 1)"
              class="bg-blueberry dark:text-background p-2 w-full h-[3vh] font-hand"
              type="text"
            />
            <input
              v-model="item.measure"
              :placeholder="'Measure ' + (i + 1)"
              class="bg-blueberry dark:text-background p-2 w-full h-[3vh] font-hand"
              type="text"
            />
          </div>
        </div>
        <button
          @click="addIngredientField"
          class="item-end rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          More ingredients
        </button>
      </div>
    </div>

    <div
      class="grid xl:col-span-5 h-[60vh] xl:h-[57vh] px-5 pb-5 dark:text-background"
    >
      <p>A D D &nbsp;&nbsp;S T E P S</p>
      <div
        class="h-[43vh] xl:h-[48vh] w-[98%] pl-10 pr-4 pt-8 pb-6 xl:pl-16 xl:pr-10 xl:pt-10 xl:pb-8 border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] bg-background dark:bg-stone-950"
      >
        <div
          class="mb-5 h-[32vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime flex flex-col"
        >
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="mb-3 w-full flex font-hand text-xl"
          >
            <span class="px-2 py-1">{{ i + 1 }}.</span>
            <input
              v-model="step.step"
              placeholder="Write step"
              class="h-[4vh] w-full bg-background"
            />
          </div>
        </div>

        <div>
          <button
            @click="addStepField"
            class="rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            More steps
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="p-5 h-[10vh] border-black border-t-2 flex items-center">
    <button
      @click="addNewRecipe"
      class="text-lg rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
    >
      Add new recipe
    </button>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import { useRecipe } from "../stores/recipes";
import { updateRecipes } from "../firebase";

export default {
  name: "NewRecipe",
  components: { Loader },
  setup() {
    //Gets info from Pinia recipesStore
    const recipesStore = useRecipe();
    return { recipesStore };
  },
  data() {
    return {
      loading: false,
      addImageInfoClicked: false,
      name: "",
      image: "",
      category: "",
      country: "",
      ingredients: [{ ingredient: "", measure: "" }],
      steps: [{ step: "" }],
    };
  },
  methods: {
    addIngredientField() {
      this.ingredients.push({ ingredient: "", measure: "" });
    },
    addStepField() {
      this.steps.push({ step: "" });
    },
    addNewRecipe() {
      //Creates a new object to hold the information
      const newRecipe = {
        strMeal: this.name,
        strMealThumb: this.image,
        strCategory: this.category,
        strArea: this.country,
        //Restructures ingredients
        ...this.ingredients.reduce((result, item, i) => {
          result[`strIngredient${i + 1}`] = item.ingredient;
          result[`strMeasure${i + 1}`] = item.measure;
          return result;
        }, {}),
        //Collects steps' input values
        strInstructions: this.steps.map((step) => step.step).join("."),
      };

      // Push the new recipe to the recipesStore (Pinia) + updates Firebase
      this.recipesStore.recipe.push(newRecipe);
      updateRecipes(this.recipesStore.recipe);

      // Reset fields for the next entry
      this.name = "";
      this.image = "";
      this.category = "";
      this.country = "";
      this.ingredients = [{ ingredient: "", measure: "" }];
      this.steps = [{ step: "" }];
      this.addImageInfoClicked = false;
      console.log("Recipes store", this.recipesStore.recipe);
    },
  },
};
</script>

<style></style>
