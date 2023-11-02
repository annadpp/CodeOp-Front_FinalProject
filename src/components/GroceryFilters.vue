<template>
  <div class="grid xl:h-[65vh] border-black p-5 xl:p-0">
    <div
      class="grid grid-cols-2 xl:grid-cols-4 xl:h-[5vh] pt-5 xl:pt-0 gap-3 xl:gap-y-0 xl:gap-x-5 mb-5"
    >
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
        class="h-6 xl:h-8 w-full flex justify-center items-center text-lg xl:text-xl"
      >
        <span
          :class="{
            'rotate-[-8deg]': selectedCategory !== category,
            'rotate-[8deg]': selectedCategory === category,
          }"
          >{{ category }}</span
        >
      </button>
    </div>
    <div
      class="h-[38vh] xl:h-[52vh] flex flex-col gap-y-2 justify-start overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-lime mb-16 xl:mb-8"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="flex items-center justify-between px-5 bg-blueberry h-[4vh] xl:h-[5vh] w-full"
      >
        <p class="font-hand text-xl">{{ item.ingredient }}</p>
        <button
          @click="removeIngredient(item)"
          class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-[7rem] xl:w-[10vw] bg-background hover:border-orange hover:text-orange"
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
  name: "GroceryFilters",
  data() {
    return {
      selectedCategory: "All",
      categoryOptions: ["All", "Food", "Cleaning", "Others"],
      loading: false,
    };
  },
  computed: {
    //Filters for buttons All/Food/Cleaning/Others -> on click, displays only the items with requested category
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
    //Gets info from Pinia scheduleStore + groceryStore
    const scheduleStore = useSchedule();
    const groceryStore = useGrocery();
    return { scheduleStore, groceryStore };
  },
  async beforeRouteUpdate() {
    //Will be used for loaders
    this.loading = true;

    try {
      //Fetches updated ingredients, removed items, and schedule data from Firebase and assigns it to Pinia when the route changes
      this.groceryStore.filteredIngredients = await getFilteredIngredients();
      this.groceryStore.removedIngredients = await getRemovedIngredients();
      this.scheduleStore.schedule = await getSchedule();

      //Clears groceryList and refilters ingredients and schedule updates by running methods
      this.groceryStore.groceryList = [];
      this.getIngredients();
      this.filterIngredients();
      this.scheduleUpdates();
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    this.loading = false;
  },

  mounted() {
    this.loading = true;

    //Fetches initial data from Firebase and updates Pinia when the component is mounted
    Promise.all([
      getFilteredIngredients(),
      getRemovedIngredients(),
      getSchedule(),
    ])
      .then(([filteredIngredients, removedIngredients, schedule]) => {
        // Updates the store data with fetched initial data
        this.groceryStore.filteredIngredients = filteredIngredients;
        this.groceryStore.removedIngredients = removedIngredients;
        this.scheduleStore.schedule = schedule;

        //Clears groceryList and refilters ingredients and schedule updates by running methods
        this.groceryStore.groceryList = [];
        this.getIngredients();
        this.filterIngredients();
        this.scheduleUpdates();
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    //Gets ingredients from the meals in the schedule and passes their info to groceryList array
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
    },
    filterIngredients() {
      for (const groceryItem of this.groceryStore.groceryList) {
        //FILTERS IF INGREDIENT IN BLACKLIST (removedIngredients) -> We don't want to add an ingredient that has been previously removed
        //Checks if there is a match between any "groceryItem" ingredient/meal/day and any their counterparts in "removedIngredients" (we want to know if the user has deleted the ingredients so they won't appear again)
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
          //If there is no match -> checks if there's a matching ingredient in "filteredIngredients" (we want to know whether to update ID or to add new ingredient)
          const matchingFiltered = this.groceryStore.filteredIngredients.find(
            (filteredItem) => {
              return groceryItem.ingredient === filteredItem.ingredient;
            }
          );
          if (matchingFiltered) {
            //UPDATES ID
            //If there's a match -> updates the "id" of the matching "filteredItem" with "groceryItem.id" (gets the highest ID number so if it's deleted all instances of the ingredient disappear)
            matchingFiltered.id = groceryItem.id;
          } else {
            //ALL FILTERS PASSED -> PASSES INFORMATION TO FILTEREDINGREDIENTS
            //If there's no match  -> adds a new item to "filteredIngredients" (FILTERED INGREDIENTS WILL PROVIDE FINAL INFORMATION)
            this.groceryStore.filteredIngredients.push({
              ingredient: groceryItem.ingredient,
              id: groceryItem.id,
              meal: groceryItem.meal,
              day: groceryItem.day,
              name: groceryItem.name,
            });
          }
        }
      }
    },
    scheduleUpdates() {
      //Checks if name of ingredient in filtered is in groceryList ingredients list -> Works for deleted recipes from Schedule
      const groceryItemNames = this.groceryStore.groceryList.map(
        (item) => item.name
      );

      this.groceryStore.filteredIngredients =
        this.groceryStore.filteredIngredients.filter((item) => {
          if (item.name === undefined || groceryItemNames.includes(item.name)) {
            return true; //Keeps the item if its name matches any in the grocery list (or there is no name)
          }
          return false; //Removes the item if its name doesn't match any in the grocery list
        });
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
    //Assigns the value of the category parameter to the selectedCategory
    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style></style>
