<template>
  <div
    v-if="loading"
    class="w-full h-[100vh] xl:h-[75vh] px-5 flex items-center"
  >
    <Loader class="w-full" />
  </div>

  <div v-else class="absolute z-0 w-full xl:static top-[10vh]">
    <div
      class="flex flex-col justify-center xl:grid xl:grid-cols-10 xl:h-[17vh] xl:pt-8 xl:px-5 xl:mb-2"
    >
      <!--RECIPE NAME-->
      <div
        class="xl:col-span-8 h-[15vh] xl:h-auto flex items-center px-5 xl:px-0"
      >
        <input
          v-model="name"
          placeholder="Add recipe name"
          class="w-full text-xl xl:text-4xl text-center xl:text-left leading-6 px-5 xl:p-0 dark:text-background bg-background"
        />
      </div>
      <!--RECIPE INFO (category + country)-->
      <div class="xl:col-span-2 xl:mt-5" :class="{ 'opacity-20': sent }">
        <div class="gap-x-5 flex">
          <p
            class="hidden xl:flex text-6xl justify-end items-end text-left w-1/3"
          >
            *
          </p>
          <div
            class="h-[8.5vh] xl:h-auto flex flex-row xl:flex-col items-end gap-4 w-full xl:w-2/3 p-5 xl:p-0 border-black border-t-2 xl:border-none"
          >
            <h4
              class="bg-lime h-6 xl:h-8 w-full flex justify-center items-center text-lg"
            >
              <input
                v-model="category"
                placeholder="Add category"
                class="rotate-[-8deg] bg-transparent text-center text-border-orange w-full"
              />
            </h4>
            <h4
              class="bg-orange h-6 xl:h-8 w-full flex justify-center items-center text-lg"
            >
              <input
                required
                v-model="country"
                placeholder="Add country"
                class="rotate-[8deg] bg-transparent text-center text-border-lime w-full"
              />
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="xl:grid xl:grid-cols-8 pt-[35vh] xl:pt-0"
    :class="{ 'opacity-20': sent }"
  >
    <div
      class="grid col-span-3 xl:h-[57vh] border-black dark:border-background border-t-2 xl:border-t-0 xl:border-r-2"
    >
      <!--ADD IMAGE-->
      <div
        class="flex flex-col px-5 my-5 xl:my-0 gap-x-5 xl:gap-x-0 xl:h-[25.5vh] xl:border-black xl:border-b-2"
      >
        <p class="dark:text-background">A D D&nbsp;&nbsp; I M A G E</p>
        <div class="flex flex-col justify-center xl:h-[19vh] gap-y-5 xl:mt-2">
          <div class="h-[8vh] xl:h-[16vh] flex items-center">
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
              class="flex object-cover w-full h-[7vh] xl:h-[12vh] mt-3 xl:mt-0"
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
        class="py-5 xl:py-0 border-black dark:border-background border-y-2 xl:border-none px-5"
      >
        <p class="px-5 xl:mt-0 xl:px-0 dark:text-background mb-5">
          A D D &nbsp;&nbsp;I N G R E D I E N T S
        </p>
        <div
          class="h-[7vh] xl:h-[13vh] xl:pt-0 overflow-y-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime mb-5"
        >
          <div
            v-for="(item, i) in ingredients"
            :key="i"
            class="grid grid-cols-2 gap-x-3 xl:gap-x-5 gap-y-2 mb-2"
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
        <div
          class="grid gap-x-3 xl:gap-x-5"
          :class="{
            'grid-cols-1': ingredients.length < 1,
            'grid-cols-2': ingredients.length > 1,
          }"
        >
          <button
            @click="addIngredientField"
            class="item-end rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            More <span class="hidden sm:inline-block">ingredients</span>
          </button>

          <!-- Conditionally show the "Less" button -->
          <button
            v-if="ingredients.length > 1"
            @click="removeIngredientField"
            class="item-end rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            Less <span class="hidden sm:inline-block">ingredients</span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="xl:grid xl:col-span-5 xl:h-[57vh] p-5 xl:py-0 pb-5 dark:text-background"
    >
      <p>A D D &nbsp;&nbsp;S T E P S</p>
      <div
        class="h-[27vh] xl:h-[48vh] mt-5 xl:mt-0 mb-3 xl:mb-0 w-[99%] pl-10 pr-4 pt-8 xl:pl-16 xl:pr-10 xl:pt-10 pb-8 border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] bg-background dark:bg-stone-950"
      >
        <div
          class="mb-5 h-[13vh] xl:h-[32vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime flex flex-col"
        >
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="xl:mb-3 w-full flex font-hand text-xl"
          >
            <span class="px-2 py-1">{{ i + 1 }}.</span>
            <input
              v-model="step.step"
              placeholder="Write step"
              class="h-[4vh] w-full bg-background"
            />
          </div>
        </div>

        <div
          class="grid pr-5 gap-x-3 xl:gap-x-5"
          :class="{
            'grid-cols-1': steps.length < 1,
            'grid-cols-2': steps.length > 1,
          }"
        >
          <button
            @click="addStepField"
            class="rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            More <span class="hidden sm:inline-block">steps</span>
          </button>
          <button
            v-if="steps.length > 1"
            @click="removeStepField"
            class="rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            Less <span class="hidden sm:inline-block">steps</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    :class="{ 'opacity-20': sent }"
    class="pb-12 px-5 xl:p-5 h-[16vh] xl:h-[10vh] border-black border-t-2 flex items-center"
  >
    <button
      @click="addNewRecipe"
      :disabled="!isFormComplete"
      :class="{
        'border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300':
          !isFormComplete,
        'hover:border-orange hover:text-orange': isFormComplete,
      }"
      class="text-lg rounded-full border-2 bg-background dark:bg-stone-950 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full"
    >
      Add new recipe
      <span v-if="!isFormComplete">(fill in all the fields)</span>
    </button>
  </div>

  <NewRecipeAdded
    :name="name"
    :image="image"
    :category="category"
    :country="country"
    :sent="sent"
    :id="id"
    @sent-status="handleSentStatus"
  />
</template>

<script>
import Loader from "../components/Loader.vue";
import NewRecipeAdded from "../components/NewRecipeAdded.vue";
import { useRecipe } from "../stores/recipes";
import { updateRecipes } from "../firebase";
import { getRecipesId } from "../firebase";
import { updateRecipesId } from "../firebase";

export default {
  name: "NewRecipe",
  components: { Loader, NewRecipeAdded },
  setup() {
    //Gets info from Pinia recipesStore
    const recipesStore = useRecipe();
    return { recipesStore };
  },
  mounted() {
    getRecipesId().then((newRecipeId) => {
      this.recipesStore.id = newRecipeId;
    });
  },
  data() {
    return {
      loading: false,
      addImageInfoClicked: false,
      id: this.recipesStore.id,
      name: "",
      image: "",
      category: "",
      country: "",
      ingredients: [{ ingredient: "", measure: "" }],
      steps: [{ step: "" }],
      sent: false,
    };
  },
  methods: {
    addIngredientField() {
      this.ingredients.push({ ingredient: "", measure: "" });
    },
    addStepField() {
      this.steps.push({ step: "" });
    },
    removeIngredientField() {
      if (this.ingredients.length > 1) {
        this.ingredients.pop(); // Removes the last ingredient field
      }
    },
    removeStepField() {
      if (this.steps.length > 1) {
        this.steps.pop(); // Removes the last step field
      }
    },
    addNewRecipe() {
      //Creates a new object to hold the information
      const newRecipe = {
        idMeal: this.recipesStore.id++,
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
        strInstructions: this.steps.map((step) => step.step).join(". "),
      };

      // Append the new recipe to the existing list
      this.recipesStore.recipe.push(newRecipe);

      // Update the entire list of recipes in the store and Firebase
      updateRecipes(this.recipesStore.recipe);
      updateRecipesId(this.recipesStore.id);

      //Increments the counter for the next id

      //To open sent form
      this.sent = true;
    },
    handleSentStatus(sentStatus) {
      //Gets info emitted from Child
      this.sent = sentStatus;
      //Resets fields for the next entry
      this.name = this.name = "";
      this.image = "";
      this.category = "";
      this.country = "";
      this.ingredients = [{ ingredient: "", measure: "" }];
      this.steps = [{ step: "" }];
      this.addImageInfoClicked = false;
    },
  },
  computed: {
    isFormComplete() {
      // Check if all required fields are filled
      return (
        this.name &&
        this.image &&
        this.category &&
        this.country &&
        this.ingredients.every((item) => item.ingredient && item.measure) &&
        this.steps.every((step) => step.step)
      );
    },
  },
};
</script>

<style></style>
