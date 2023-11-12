<template>
  <section
    class="flex flex-col justify-between items-center w-full text-md lg:text-lg xl:text-xl"
    :class="{
      'sm:max-h-[48vh] xl:max-h-[55vh]': meal,
      'max-h-[30vh] sm:max-h-[23vh] xl:max-h-[24vh]': !meal,
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
          'h-[12vh] sm:h-[26vh] xl:h-[32vh]': meal,
          'h-[20vh] sm:h-[15vh] ': !meal,
        }"
        :src="meal ? todaysMealImg || defaultImage : img"
        alt=""
      />
    </div>

    <!--MEAL NAME BLOCK-->
    <div
      class="flex items-center justify-center bg-blueberry w-full font-hand text-xl leading-4 sm:leading-5 dark:text-background"
      :class="{
        'h-[8vh] sm:h-[16vh] xl:h-[18vh]': meal,
        'h-[10vh] sm:h-[8vh] xl:h-[9vh]': !meal,
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
        {{ mealWithAsterisk }}
      </router-link>
    </div>
  </section>
</template>

<script>
import defaultImage from "../assets/hungry-cat.png";
import { useSchedule } from "../stores/schedule";
import { getSchedule } from "../firebase";

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
  mounted() {
    getSchedule().then((schedule) => {
      this.scheduleStore.schedule = schedule;
    });
  },
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
    mealWithAsterisk() {
      //Adds asterisk to the recipes that are already included in the schedule comparing if the meal name === in this.scheduleStore.schedule (Pinia)
      const mealName = this.meal
        ? this.scheduledMealHome(this.meal)
        : this.name;
      const isScheduled = this.scheduleStore.schedule.some(
        (item) => item.name === mealName
      );
      //Only returns * is meal included and is in card for Recipes (not Home)
      return isScheduled && !this.meal ? `${mealName}*` : mealName;
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
