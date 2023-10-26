import { defineStore } from "pinia";

export const useGrocery = defineStore("grocery", {
  state: () => ({
    groceryList: [],
    removedIngredients: [],
    counter: 0,
    filteredIngredients: [],
  }),
});
