<template>
  <div class="col-span-3 xl:h-[85vh]">
    <div
      class="flex justify-center gap-x-5 w-full px-8 border-black dark:border-background border-t-2 xl:border-none dark:text-background"
    >
      <!--CURRENT WEEK-->
      <div class="flex flex-col justify-center text-2xl h-[10vh]">
        <p>
          Week
          <span class="font-hand text-3xl">{{
            dateStore.currentWeekOfYear
          }}</span>
        </p>
      </div>
      <div class="text-6xl mt-3 flex items-center">
        <p>*</p>
      </div>
    </div>

    <!--ADD PRODUCTS-->
    <div
      class="flex flex-col justify-center items-center gap-y-5 border-black dark:border-background border-y-2 xl:h-[35vh] p-5 xl:p-10 dark:text-background"
    >
      <p>
        A D D &nbsp&nbspE X I S T I N G &nbsp&nbspP R O D U C T
        <!--Triangle button -> OPENS/CLOSES ADD EXISTING PRODUCT MOBILE-->
        <button
          @click="toggleFormExistingVisibility"
          class="xl:hidden inline-block"
        >
          <span v-if="!formExistingVisible"
            ><i class="fa-solid fa-caret-down"></i
          ></span>

          <span v-if="formExistingVisible"
            ><i class="fa-solid fa-caret-up"></i
          ></span>
        </button>
      </p>

      <!--ADD EXISTING PRODUCT FORM-->
      <form
        v-if="formExistingVisible"
        class="flex flex-col w-full gap-y-5"
        @submit.prevent="addExistingProduct"
      >
        <!--v-model passes information-->
        <select
          name="existingProduct"
          id="existingProduct"
          v-model="existingProduct.name"
          @change="updateCategory"
          class="p-1 mt-1 xl:mt-4 border-black drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] w-full h-[4vh] xl:h-[5vh] dark:bg-stone-900"
        >
          <option disabled value="">Select a product</option>
          <!--Gets info from hardcoded array in Pinia-->
          <option
            v-for="ingredient in this.groceryStore.commonIngredients"
            :value="ingredient.name"
            :key="ingredient.name"
          >
            {{ ingredient.name }}
          </option>
        </select>
        <!--Button trigers form submit-->
        <button
          class="mt-3 xl:mt-6 rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full bg-background dark:bg-stone-950 hover:border-orange hover:text-orange"
        >
          Add existing product
        </button>
      </form>
    </div>

    <div
      class="flex flex-col p-5 xl:p-10 items-center gap-y-5 xl:h-[40vh] justify-center border-black dark:border-background border-b-2 xl:border-none dark:text-background"
    >
      <p>
        A D D &nbsp&nbspN E W &nbsp&nbspP R O D U C T
        <!--Triangle button -> OPENS/CLOSES ADD NEW PRODUCT MOBILE-->
        <button @click="toggleFormNewVisibility" class="xl:hidden">
          <span v-if="!formNewVisible"
            ><i class="fa-solid fa-caret-down"></i
          ></span>
          <span v-if="formNewVisible"
            ><i class="fa-solid fa-caret-up"></i
          ></span>
        </button>
      </p>
      <form
        v-if="formNewVisible"
        class="flex flex-col w-full gap-y-5"
        @submit.prevent="addNewProduct"
      >
        <!--v-model passes information-->
        <input
          class="p-2 mt-1 xl:mt-4 border-black drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] w-full h-[4vh] xl:h-[5vh] dark:bg-stone-900 placeholder-black dark:placeholder-background"
          type="text"
          placeholder="Add a new product"
          v-model="newProduct.name"
        />
        <select
          name="newProduct"
          id="newProduct"
          class="p-1 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] w-full h-[4vh] xl:h-[5vh] dark:bg-stone-900"
          v-model="newProduct.category"
        >
          <option disabled value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Others">Others</option>
        </select>
        <!--Button trigers form submit-->
        <button
          class="mt-2 xl:mt-6 rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full bg-background dark:bg-stone-950 hover:border-orange hover:text-orange"
        >
          Add new product
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useDate } from "../stores/date";

export default {
  props: [
    //Props from Grocery
    "groceryStore",
    "formExistingVisible",
    "formNewVisible",
    "newProduct",
    "existingProduct",
  ],
  setup() {
    //Gets info from Pinia dateStore
    const dateStore = useDate();
    return { dateStore };
  },
  methods: {
    addNewProduct() {
      //Triggers the appropriate action in Grocery to update the grocery list by adding the new product
      this.$emit("addNewProduct");
    },
    updateCategory() {
      //Informs the parent about the selected product category so it can update an existing product based on the user's selection
      this.$emit("updateCategory");
    },
    addExistingProduct() {
      //Indicates the addition of an existing product to the grocery list so the parent can update it
      this.$emit("addExistingProduct");
    },
    toggleFormExistingVisibility() {
      //Emits an event to show the change recipe form so it changes formExistingVisible status in the parent to change form visibility
      this.$emit("toggleFormExistingVisibility");
    },
    toggleFormNewVisibility() {
      //Emits an event to show the change recipe form so it changes formNewVisible status in the parent to change form visibility
      this.$emit("toggleFormNewVisibility");
    },
  },
};
</script>

<style></style>
