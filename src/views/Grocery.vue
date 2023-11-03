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
