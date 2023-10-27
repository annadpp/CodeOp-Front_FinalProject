<template>
  <div class="grid grid-cols-8 justify-center items-center">
    <div class="grid col-span-5 h-[85vh] border-black border-r-2 p-5">
      <div class="grid row-span-2 items-center h-[17vh]">
        <h2>Grocery list</h2>
      </div>
      <GroceryFilters />
    </div>

    <div class="grid col-span-3 h-[85vh]">
      <div class="flex justify-center gap-x-5 w-full px-8">
        <div class="flex flex-col justify-center text-[1.8rem] h-[10vh]">
          <p>WEEK <span class="font-hand">2</span></p>
        </div>
      </div>

      <div
        class="flex flex-col justify-center items-center gap-y-5 border-black border-y-2 h-[35vh] p-10"
      >
        <p>A D D &nbsp&nbspE X I S T I N G &nbsp&nbspP R O D U C T</p>
        <form
          class="flex flex-col w-full gap-y-5"
          @submit.prevent="addExistingProduct"
        >
          <select
            name="existingProduct"
            id="existingProduct"
            v-model="existingProduct.name"
            class="p-1 mt-4 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
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
            class="mt-6 rounded-full border-2 border-black h-[5vh] w-full bg-background hover:border-orange hover:text-orange"
          >
            Add existing product
          </button>
        </form>
      </div>
      <div
        class="flex flex-col p-10 items-center gap-y-5 h-[40vh] justify-center"
      >
        <p>A D D &nbsp&nbspN E W &nbsp&nbspP R O D U C T</p>
        <form
          class="flex flex-col w-full gap-y-5"
          @submit.prevent="addNewProduct"
        >
          <input
            class="p-2 mt-4 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
            type="text"
            placeholder="Add a new product"
            v-model="newProduct.name"
          />
          <select
            name="newProduct"
            id="newProduct"
            class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
            v-model="newProduct.category"
          >
            <option disabled value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Others">Others</option>
          </select>
          <button
            class="mt-6 rounded-full border-2 border-black h-[5vh] w-full bg-background hover:border-orange hover:text-orange"
          >
            Add new product
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import GroceryFilters from "../components/GroceryFilters.vue";
import { useSchedule } from "../stores/schedule";
import { useGrocery } from "../stores/grocery";
// import { getRemovedIngredients } from "../firebase";
import { getCommonIngredients } from "../firebase";
// import { getFilteredIngredients } from "../firebase";
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
    // getFilteredIngredients().then((filteredIngredients) => {
    //   this.groceryStore.filteredIngredients = filteredIngredients;
    // });
    // getRemovedIngredients().then((removedIngredients) => {
    //   this.groceryStore.removedIngredients = removedIngredients;
    // });
    getCommonIngredients().then((commonIngredients) => {
      this.groceryStore.commonIngredients = commonIngredients;
    });
  },
  data() {
    return {
      newProduct: {
        name: "",
        category: "",
      },
      existingProduct: {
        name: "",
      },
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
    addExistingProduct() {
      const isProductAlreadyAdded = this.groceryStore.filteredIngredients.some(
        (item) => item.ingredient === this.existingProduct.name
      );

      if (!isProductAlreadyAdded) {
        this.groceryStore.filteredIngredients.push({
          ingredient: this.existingProduct.name,
        });
        updateFilteredIngredients(this.groceryStore.filteredIngredients);
      }
    },
  },
};
</script>

<style></style>

<style></style>
