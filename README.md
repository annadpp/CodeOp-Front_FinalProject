# Meal Planning App - CodeOp Front-End final project

## What is Meal Planning App about

- Meal Planning App is about making households easier to plan both weekly menus in order to save money, waste less food, eat healthier and find it easier coming up with new recipes.

- The app has a user-friendly UI, with a homepage showing at a glance the most important information regarding meal planning and clear menus in order to make interactions simple and intuitive.

- The main features are:
  - Planning weekly meal schedule;
  - Generating the grocery list based on weekly meal schedule;
  - Recipes database;
  - Recipe and shopping list customization

## Install dependencies

- Run `npm install` in project directory.

## How to use the website

- On the main page, you will see the current date along with the recipes corresponding to today and tomorrow.
- If you haven't selected any recipe for today or tomorrow, you have the option to access the Recipes section, where you can browse through a wide range of recipes, either obtained from an API or saved by the user.
- If you've already organized your meal planning, you can also access the page with the entire schedule, from where you can delete them and have access to the page to change/add recipes.

## Looking for recipes

- On the Recipes page, you can search for recipes in various ways. You can either scroll through the complete list of recipes, use the customized search bar, or apply filters by category and country.
- Once you've selected a recipe, simply click on its name in the respective card, and you'll be redirected to its individual section.
- If you can't find a recipe that suits your preferences, you can contribute to the database by adding your own recipes. Access the corresponding section with the "Add new custom recipe" button.

## Adding recipes to weekly schedule

- Once you've accessed the individual page of the recipe you want to add to the weekly planning, where you'll find all the necessary information about it, click on the "Add to weekly menu" button.
- A menu will open where you'll need to select the day and the meal you want to add the recipe to. Once you've made your choices, the "Add to weekly menu" button will activate. If you click it, your selection will be saved.
- Also, the ingredients needed to cook this recipe will be included to your grocery list.

## Removing recipes from weekly schedule

- On the Schedule page, click on the "Change" button (only meal spots with a recipe saved will show the message "Change". Also, they'll be purple).
- In the menu that will appear, you can select the "Delete meal" option. Once you click on it, the information related to the saved recipe will be removed.
- If you wish to replace the meal with another recipe, you should click on the "Go to Recipes & change meal" button. This action will redirect you to the Recipes screen, where you'll need to follow the steps outlined in the "Adding recipes to the weekly schedule" section.

## Adding a new custom recipe

- On the Recipes screen, click on the "Add new custom recipe" button.
- You'll be redirected to a new page where you'll need to fill in all the text fields. You'll also need to upload an image by copying the URL of the image into the indicated field and then clicking on the "Add Image" button.
- If you want to add more ingredients or steps, you can click on the "More ingredients/steps" buttons. Once you've added more than one ingredient or step, the "Less ingredients/steps" button will appear, allowing you to delete the last added step/ingredient.
- Once all the information is correctly entered, the "Add new custom recipe" button will activate. Clicking on it will save the information you've entered, and your recipe will be available among the Recipes on the Recipes page. Additionally, the ingredients will appear in the shopping list.

## Adding new items to the grocery list

- The ingredients from the recipes you add to the menu will automatically appear in your shopping list.
- If you want to add more ingredients, you can do so by selecting the pre-saved items you'll find in the dropdown menu. Once selected, the "Add existing product" button will become active, and clicking it will add the ingredient to your shopping list.
- If you don't find the desired ingredient/object, you can always add it manually by typing it in the bottom right field and selecting the corresponding category to properly filter it. Once selected, the "Add existing product" button will be enabled, and clicking it will add the ingredient to both your shopping list and the list of pre-saved ingredients/objects.

## Removing items from the grocery list

- To delete ingredients from the shopping list, you can simply go to the Schedule page and click on the respective "Remove" button. You can do this from both the "All" list or from the filtered categories. This action will remove the selected ingredient from your shopping list.

## Technologies used

    * HTML
    * CSS
    * Javascript
    * Vue
    * Vue Router
    * Vue Pinia
    * Tailwind
    * Axios
    * Firebase
    * Postman
    * Tailwind scrollbar plugin

## API used

    * The Meal DB (https://www.themealdb.com/api.php)

## Planning tools

    * Trello
    * Figma (https://www.figma.com/file/S8sl3LK1LAshUZKnOHB0XY/Final-Project-CodeOp?type=design&node-id=81%3A486&mode=design&t=I6nqf42byYluSrpc-1)

## Feature Extensions

- Login for multiple users
- Extend schedule for more than one week
- Integration with supermarket price comparison API
- Code refactoring where needed

## Notes

_This is a student project that was created by Anna de Pablo Puig at [CodeOp](http://CodeOp.tech), a front-end development bootcamp in Barcelona._
