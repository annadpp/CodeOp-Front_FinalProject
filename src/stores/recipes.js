import { defineStore } from "pinia";

export const useRecipe = defineStore("recipe", {
  state: () => ({
    recipe: [],
  }),
});