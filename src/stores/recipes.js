import { defineStore } from "pinia";

export const useRecipe = defineStore("recipe", {
  state: () => ({
    //Stores new custom recipes information
    recipe: [],
    //Keeps track of id in order to generate new custom recipe pages
    id: 99999,
  }),
});
