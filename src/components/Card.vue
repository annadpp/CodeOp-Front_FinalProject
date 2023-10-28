<template>
  <section
    class="flex flex-col justify-between items-center w-full text-md xl:text-xl"
    :style="'max-height: ' + heightcard + 'vh'"
  >
    <h5 v-if="title" class="flex my-4">{{ title }}</h5>
    <div class="flex items-center justify-center w-full">
      <img
        v-if="meal"
        class="object-cover w-full"
        :style="'height: ' + adjustedImg + 'vh'"
        :src="todaysMealImg"
        alt=""
      />
      <img
        v-else
        class="object-cover w-full"
        :style="'height: ' + adjustedImg + 'vh'"
        :src="img"
        alt=""
      />
    </div>
    <div
      class="flex items-center justify-center bg-blueberry w-full font-hand text-xl"
      :style="'height: ' + adjustedText + 'vh'"
    >
      <router-link
        v-if="meal"
        :to="`/recipes/${todaysMealId}`"
        class="text-xl xl:text-2xl hover:underline p-5 text-center"
        >{{ scheduledMealHome(meal) }}</router-link
      >
      <router-link
        v-else
        :to="`/recipes/${id}`"
        class="hover:underline p-5 text-center"
        >{{ name }}</router-link
      >
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
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  data() {
    return {
      todaysMealId: "",
      todaysMealImg: "",
      screenWidth: window.innerWidth,
      adjustedImg: 0,
      adjustedText: 0,
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
    handleWindowResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1280) {
        this.adjustedImg = this.heightimg;
        this.adjustedText = this.heighttext;
      } else {
        this.adjustedImg = this.heightimg - 18;
        this.adjustedText = this.heighttext - 12;
      }
    },
  },
};
</script>

<style></style>
