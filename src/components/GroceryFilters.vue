<template>
  <div class="grid h-[65vh] border-black">
    <div class="grid grid-cols-4 h-[5vh] gap-x-5 mb-5">
      <button
        v-for="category in categoryOptions"
        :key="category"
        @click="selectCategory(category)"
        :class="{
          'bg-orange': selectedCategory === category,
          'text-border-lime': selectedCategory === category,
          'bg-lime': selectedCategory !== category,
          'text-border-orange': selectedCategory !== category,
        }"
        class="h-8 w-full flex justify-center items-center text-2xl"
      >
        {{ category }}
      </button>
    </div>
    <div
      class="h-[52vh] flex flex-col gap-y-2 justify-start overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime mb-8"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="flex items-center justify-between px-5 bg-blueberry h-[5vh] w-full"
      >
        <p class="font-hand text-xl">{{ item.ingredient }}</p>
        <button
          @click="removeIngredient(item)"
          class="rounded-full border-2 border-black h-[5vh] w-[10vw] bg-background hover:border-orange hover:text-orange"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useSchedule } from "../stores/schedule";
import { useGrocery } from "../stores/grocery";
import { getSchedule } from "../firebase";
import { getFilteredIngredients } from "../firebase";
import { getRemovedIngredients } from "../firebase";
import { updateRemovedIngredients } from "../firebase";
import { updateFilteredIngredients } from "../firebase";

export default {
  name: "Grocery Filters",
  components: {},
  data() {
    return {
      selectedCategory: "All",
      categoryOptions: ["All", "Food", "Cleaning", "Others"],
    };
  },
  computed: {
    filteredItems() {
      if (this.selectedCategory === "All") {
        return this.groceryStore.filteredIngredients;
      } else if (this.selectedCategory === "Food") {
        return this.groceryStore.filteredIngredients.filter(
          (item) => item.category === "Food" || !item.category
        );
      } else {
        return this.groceryStore.filteredIngredients.filter(
          (item) => item.category === this.selectedCategory
        );
      }
    },
  },
  setup() {
    const scheduleStore = useSchedule();
    const groceryStore = useGrocery();
    return { scheduleStore, groceryStore };
  },
  mounted() {
    getFilteredIngredients().then((filteredIngredients) => {
      this.groceryStore.filteredIngredients = filteredIngredients;
    });
    getRemovedIngredients().then((removedIngredients) => {
      this.groceryStore.removedIngredients = removedIngredients;
    });
    getSchedule()
      .then((schedule) => {
        this.scheduleStore.schedule = schedule;
      })
      .then(() => {
        this.getIngredients();
      });
  },
  methods: {
    getIngredients() {
      for (const item of this.scheduleStore.schedule) {
        for (let ingredient of item.ingredients) {
          this.groceryStore.groceryList.push({
            ingredient: ingredient,
            day: item.day,
            meal: item.meal,
            name: item.name,
            id: this.groceryStore.counter++,
          });
        }
      }
      this.filterIngredients();
    },
    removeIngredient(ingredientToRemove) {
      const index = this.groceryStore.filteredIngredients.findIndex(
        (item) => item.id === ingredientToRemove.id
      );

      if (index !== -1) {
        this.groceryStore.filteredIngredients.splice(index, 1);

        this.groceryStore.removedIngredients.push(ingredientToRemove);
        updateRemovedIngredients(this.groceryStore.removedIngredients);
        updateFilteredIngredients(this.groceryStore.filteredIngredients);
      }
    },
    filterIngredients() {
      const groceryList = this.groceryStore.groceryList;
      const filteredIngredients = this.groceryStore.filteredIngredients;

      for (const groceryItem of groceryList) {
        const isMatch = this.groceryStore.removedIngredients.some(
          (removedItem) => {
            return (
              groceryItem.ingredient === removedItem.ingredient &&
              groceryItem.meal === removedItem.meal &&
              groceryItem.day === removedItem.day
            );
          }
        );

        if (!isMatch) {
          const matchingFiltered = filteredIngredients.find((filteredItem) => {
            return groceryItem.ingredient === filteredItem.ingredient;
          });
          if (matchingFiltered) {
            matchingFiltered.id = groceryItem.id;
          } else {
            filteredIngredients.push({
              ingredient: groceryItem.ingredient,
              id: groceryItem.id,
              meal: groceryItem.meal,
              day: groceryItem.day,
            });
          }
        }
      }
      this.groceryStore.filteredIngredients = filteredIngredients;
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style></style>
