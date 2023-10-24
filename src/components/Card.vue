<template>
  <section
    class="flex flex-col justify-between items-center w-full"
    :style="'max-height: ' + heightcard + 'vh'"
  >
    <h5 v-if="title" class="flex my-4">{{ title }}</h5>
    <div class="flex items-center justify-center w-full">
      <img
        v-if="meal"
        class="object-cover w-full"
        :style="'height: ' + heightimg + 'vh'"
        :src="todaysMealImg"
        alt=""
      />
      <img
        v-else
        class="object-cover w-full"
        :style="'height: ' + heightimg + 'vh'"
        :src="img"
        alt=""
      />
    </div>
    <div
      class="flex items-center justify-center bg-blueberry w-full font-hand text-xl"
      :style="'height: ' + heighttext + 'vh'"
    >
      <router-link v-if="meal" :to="`/recipes/${todaysMealId}`">{{
        scheduledMealHome(meal)
      }}</router-link>
      <router-link v-else :to="`/recipes/${id}`">{{ name }}</router-link>
    </div>
  </section>
</template>

<script>
import { useSchedule } from "../stores/schedule";

export default {
  name: "Card",
  props: [
    "title",
    "heightcard",
    "heightimg",
    "heighttext",
    "id",
    "name",
    "img",
    "category",
    "day",
    "meal",
  ],
  setup() {
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  data() {
    return {
      todaysMealId: "",
      todaysMealImg: "",
    };
  },
  methods: {
    scheduledMealHome(meal) {
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
