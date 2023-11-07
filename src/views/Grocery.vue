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
      <!--GROCERY LIST + FILTERS DESKTOP-->
      <GroceryFilters class="hidden xl:flex xl:flex-col" />
    </div>

    <!--ADD GROCERY PRODUCTS-->
    <GroceryAdd
      :groceryStore="groceryStore"
      :formExistingVisible="formExistingVisible"
      :formNewVisible="formNewVisible"
      :newProduct="newProduct"
      :existingProduct="existingProduct"
      @addNewProduct="addNewProduct"
      @updateCategory="updateCategory"
      @addExistingProduct="addExistingProduct"
      @toggleFormExistingVisibility="toggleFormExistingVisibility"
      @toggleFormNewVisibility="toggleFormNewVisibility"
      @handleWindowResize="handleWindowResize"
    />

    <!--GROCERY LIST FILTERS MOBILE-->
    <GroceryFilters class="xl:hidden" />
  </div>
</template>

<script>
import GroceryFilters from "../components/GroceryFilters.vue";
import GroceryAdd from "../components/GroceryAdd.vue";
import { useSchedule } from "../stores/schedule";
import { useGrocery } from "../stores/grocery";
import { getCommonIngredients } from "../firebase";
import { updateFilteredIngredients } from "../firebase";
import { updateCommonIngredients } from "../firebase";

export default {
  name: "Grocery",
  components: { GroceryFilters, GroceryAdd },
  setup() {
    //Gets info from Pinia scheduleStore + groceryStore
    const scheduleStore = useSchedule();
    const groceryStore = useGrocery();
    return { scheduleStore, groceryStore };
  },
  mounted() {
    //Gets info from Firebase -> async function in firebase.js
    getCommonIngredients().then((commonIngredients) => {
      this.groceryStore.commonIngredients = commonIngredients;
    });
    //Gets screen size info
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  data() {
    return {
      //Objects to store newProduct + existingProduct info
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
      if (
        //Checks if the new product doesn't exist in commonIngredients (Pinia)
        this.newProduct.name &&
        this.newProduct.category &&
        !this.groceryStore.commonIngredients.some(
          (item) =>
            item.name === this.newProduct.name &&
            item.category === this.newProduct.category
        )
      ) {
        //Pushes the new product to commonIngredients + updates the filtered ingredients in Firebase
        this.groceryStore.commonIngredients.push(this.newProduct);
        updateCommonIngredients(this.groceryStore.commonIngredients);

        //Then checks if the new product doesn't exist in filteredIngredients + pushes it to filteredIngredients (Pinia)
        if (
          !this.groceryStore.filteredIngredients.some(
            (item) => item.ingredient === this.existingProduct.name
          )
        ) {
          this.groceryStore.filteredIngredients.push({
            ingredient: this.newProduct.name,
            category: this.newProduct.category,
          });
          //Updates the filtered ingredients in Firebase
          updateFilteredIngredients(this.groceryStore.filteredIngredients);
        }
        //Resets newProduct to be used in the future
        this.newProduct = {};
      }
    },
    updateCategory() {
      //Looks for the selected product from commonIngredients (Pinia)
      const selectedProduct = this.groceryStore.commonIngredients.find(
        (ingredient) => ingredient.name === this.existingProduct.name
      );
      if (selectedProduct) {
        //If matching product in commonIngredients -> updates the category of the existing product
        this.existingProduct.category = selectedProduct.category;
      } else {
        //If no matching product -> category keeps blank
        this.existingProduct.category = "";
      }
    },
    addExistingProduct() {
      //Checks if the existing product doesn't exist in filteredIngredients (Pinia)
      if (this.existingProduct.name) {
        const isProductAlreadyAdded =
          this.groceryStore.filteredIngredients.some(
            (item) =>
              item.ingredient === this.existingProduct.name &&
              item.category === this.existingProduct.category
          );
        //If not, adds the existing product to the filteredIngredients in Pinia
        if (!isProductAlreadyAdded) {
          this.groceryStore.filteredIngredients.push({
            ingredient: this.existingProduct.name,
            category: this.existingProduct.category,
          });
          //Updates filteredIngredients in Firebase
          updateFilteredIngredients(this.groceryStore.filteredIngredients);
        }
        //Resets existingProduct for the next entry
        this.existingProduct = { name: "", category: "" };
      }
    },
    toggleFormExistingVisibility() {
      //Toggles the visibility of the form for adding existing products
      this.formExistingVisible = !this.formExistingVisible;
    },
    toggleFormNewVisibility() {
      //Toggles the visibility of the form for adding new products
      this.formNewVisible = !this.formNewVisible;
    },
    handleWindowResize() {
      //Needed to close add ingredient divs on MOBILE (open default in DESKTOP)
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
