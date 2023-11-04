<template>
  <section
    class="flex flex-col justify-between items-center w-full text-md lg:text-lg xl:text-xl"
    :class="{
      'sm:max-h-[48vh] xl:max-h-[55vh]': meal,
    }"
  >
    <!--LUNCH/DINNER-->
    <h5 v-if="title" class="flex my-4 dark:text-background">{{ title }}</h5>
    <!--MEAL IMAGE-->
    <div class="flex items-center justify-center w-full">
      <!--Depends on lunch/dinner info (Home/meal) or no info (Recipes/!meal)-->
      <img
        class="w-full"
        :class="{
          'object-cover': (meal && todaysMealImg) || !meal,
          'object-contain': meal && !todaysMealImg,
          'h-[12vh] sm:h-[26vh] xl:h-[30vh]': meal,
          'sm:h-[15vh] ': !meal,
        }"
        :src="meal ? todaysMealImg || defaultImage : img"
        alt=""
      />
    </div>

    <!--MEAL NAME BLOCK-->
    <div
      class="flex items-center justify-center bg-blueberry w-full font-hand text-xl leading-4 sm:leading-5 dark:text-background"
      :class="{
        'h-[8vh] sm:h-[16vh] xl:h-[20vh]': meal,
        'h-[10vh] sm:h-[8vh] xl:h-[10vh]': !meal,
      }"
    >
      <!--Depends on lunch/dinner info (Home/meal) or no info (Recipes/!meal) -> router-link depending on API's recipe id-->
      <router-link
        :to="meal ? `/recipes/${todaysMealId}` : `/recipes/${id}`"
        :class="[
          meal
            ? 'text-xl xl:text-2xl hover:underline p-5 text-center leading-5 xl:leading-7'
            : 'hover:underline p-5 text-center',
        ]"
      >
        {{ meal ? scheduledMealHome(meal) : name }}
      </router-link>
    </div>
  </section>
</template>

<script>
import defaultImage from "../assets/hungry-cat.png";
import { useSchedule } from "../stores/schedule";

export default {
  name: "Card",
  props: [
    //Props passed for meal info
    "title",
    "id",
    "name",
    "img",
    "category",
    "day",
    "meal",
  ],
  setup() {
    //Gets info from Pinia scheduleStore
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  data() {
    return {
      todaysMealId: "",
      todaysMealImg: "",
    };
  },
  computed: {
    //Handles hungry-cat.png
    defaultImage() {
      return defaultImage;
    },
  },
  methods: {
    scheduledMealHome(meal) {
      //Compares props passed "meal" + "day" with data in Pinia scheduleStore -> match: displays meal name / no match: "No meal"
      for (const item of this.scheduleStore.schedule) {
        if (meal === item.meal && this.day === item.day) {
          this.todaysMealId = item.id;
          this.todaysMealImg = item.img;
          return item.name;
        }
      }
      return "NO MEAL";
    },
  },
};
</script>

<style></style>
