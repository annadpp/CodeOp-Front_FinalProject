import Home from "./views/Home.vue";
import Recipes from "./views/Recipes.vue";
import Grocery from "./views/Grocery.vue";
import Schedule from "./views/Schedule.vue";

import Recipe from "./views/Recipe.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/recipes", component: Recipes, name: Recipes },
  { path: "/grocery", component: Grocery, name: Grocery },
  { path: "/schedule", component: Schedule, name: Schedule },

  { path: "/recipe/:id", component: Recipe, name: Recipe },
];
