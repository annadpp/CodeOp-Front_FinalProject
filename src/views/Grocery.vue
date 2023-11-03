<template>
  <div
    class="absolute z-0 w-full xl:static top-[10vh] grid grid-cols-1 xl:grid-cols-8 justify-center items-center"
  >
    <div
      class="grid col-span-1 xl:col-span-5 xl:h-[85vh] xl:border-black dark:xl:border-background xl:border-r-2 xl:p-5"
    >
      <div
        class="grid xl:row-span-2 items-center h-[15vh] xl:h-[17vh] p-5 xl:p-0"
      >
        <h2
          class="text-4xl xl:text-6xl text-center xl:text-left dark:text-background"
        >
          Grocery List
        </h2>
      </div>
      <GroceryFilters class="hidden xl:flex xl:flex-col" />
    </div>

    <!--FILTERS-->
    <div class="col-span-3 xl:h-[85vh]">
      <div
        class="flex justify-center gap-x-5 w-full px-8 border-black dark:border-background border-t-2 xl:border-none dark:text-background"
      >
        <div class="flex flex-col justify-center text-[1.3rem] h-[10vh]">
          <p>WEEK <span class="font-hand">2</span></p>
        </div>
        <div class="text-5xl flex items-center">
          <p>*</p>
        </div>
      </div>

      <div
        class="flex flex-col justify-center items-center gap-y-5 border-black dark:border-background border-y-2 xl:h-[35vh] p-5 xl:p-10 dark:text-background"
      >
        <p>
          A D D &nbsp&nbspE X I S T I N G &nbsp&nbspP R O D U C T
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
        <form
          v-if="formExistingVisible"
          class="flex flex-col w-full gap-y-5"
          @submit.prevent="addExistingProduct"
        >
          <select
            name="existingProduct"
            id="existingProduct"
            v-model="existingProduct.name"
            @change="updateCategory"
            class="p-1 mt-1 xl:mt-4 border-black drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8] w-full h-[4vh] xl:h-[5vh] dark:bg-stone-900"
          >
            <option disabled value="">Select a product</option>
            <option
              v-for="ingredient in this.groceryStore.commonIngredients"
              :value="ingredient.name"
              :key="ingredient.name"
            >
              {{ ingredient.name }}
            </option>
          </select>
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
          <button
            class="mt-2 xl:mt-6 rounded-full border-2 border-black dark:border-background dark:text-background h-[4vh] xl:h-[5vh] w-full bg-background dark:bg-stone-950 hover:border-orange hover:text-orange"
          >
            Add new product
          </button>
        </form>
      </div>
    </div>

    <GroceryFilters class="xl:hidden" />
  </div>
</template>

<script>
import GroceryFilters from "../components/GroceryFilters.vue";
import { useSchedule } from "../stores/schedule";
import { useGrocery } from "../stores/grocery";
import { getCommonIngredients } from "../firebase";
import { updateFilteredIngredients } from "../firebase";
import { updateCommonIngredients } from "../firebase";

export default {
  name: "Grocery",
  components: { GroceryFilters },
  setup() {
    const scheduleStore = useSchedule();
    const groceryStore = useGrocery();

    return { scheduleStore, groceryStore };
  },
  mounted() {
    getCommonIngredients().then((commonIngredients) => {
      this.groceryStore.commonIngredients = commonIngredients;
    });
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  data() {
    return {
      newProduct: {
        name: "",
        category: "",
      },
      existingProduct: {
        name: "",
        category: "",
      },
      formExistingVisible: false,
      formNewVisible: false,
    };
  },
  methods: {
    addNewProduct() {
      const isProductAlreadyAdded = this.groceryStore.filteredIngredients.some(
        (item) => item.ingredient === this.existingProduct.name
      );

      if (
        this.newProduct.name &&
        this.newProduct.category &&
        !this.groceryStore.commonIngredients.some(
          (item) =>
            item.name === this.newProduct.name &&
            item.category === this.newProduct.category
        )
      ) {
        this.groceryStore.commonIngredients.push(this.newProduct);
        updateCommonIngredients(this.groceryStore.commonIngredients);
        if (
          !this.groceryStore.filteredIngredients.some(
            (item) => item.ingredient === this.existingProduct.name
          )
        ) {
          this.groceryStore.filteredIngredients.push({
            ingredient: this.newProduct.name,
            category: this.newProduct.category,
          });
          updateFilteredIngredients(this.groceryStore.filteredIngredients);
        }
        this.newProduct = {};
      }
    },
    updateCategory() {
      const selectedProduct = this.groceryStore.commonIngredients.find(
        (ingredient) => ingredient.name === this.existingProduct.name
      );
      if (selectedProduct) {
        this.existingProduct.category = selectedProduct.category;
      } else {
        this.existingProduct.category = "";
      }
    },
    addExistingProduct() {
      if (this.existingProduct.name) {
        const isProductAlreadyAdded =
          this.groceryStore.filteredIngredients.some(
            (item) =>
              item.ingredient === this.existingProduct.name &&
              item.category === this.existingProduct.category
          );

        if (!isProductAlreadyAdded) {
          this.groceryStore.filteredIngredients.push({
            ingredient: this.existingProduct.name,
            category: this.existingProduct.category,
          });
          updateFilteredIngredients(this.groceryStore.filteredIngredients);
        }

        this.existingProduct = { name: "", category: "" }; // Reset existingProduct for the next entry
      }
    },
    toggleFormExistingVisibility() {
      this.formExistingVisible = !this.formExistingVisible;
    },
    toggleFormNewVisibility() {
      this.formNewVisible = !this.formNewVisible;
    },
    handleWindowResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1280) {
        this.formExistingVisible = true;
        this.formNewVisible = true;
      } else {
        this.formExistingVisible = false;
        this.formNewVisible = false;
      }
    },
  },
};
</script>

<style></style>
