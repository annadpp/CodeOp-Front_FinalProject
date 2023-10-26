<template>
  <div
    :class="{
      'bg-blueberry': this.scheduleStore.handleInfo !== '',
      'bg-background': this.scheduleStore.handleInfo === '',
    }"
    class="fixed p-8 top-[30vh] left-[10vw] w-[80vw] h-[60vh] border-2 border-black drop-shadow-[8px_8px_0px_#000000]"
  >
    <div class="grid grid-cols-2 gap-x-5">
      <div class="h-full flex flex-col justify-center">
        <h3 class="h-[10vh] flex text-2xl">
          CURRENT MEAL <span class="text-6xl"> *</span>
        </h3>
        <router-link
          v-if="this.scheduleStore.handleInfo !== ''"
          :to="`/recipes/${this.scheduleStore.handleInfo.id}`"
          class="h-[10.5vh] font-hand text-3xl mb-5 hover:underline"
        >
          {{ this.scheduleStore.handleInfo.name }}
        </router-link>
        <div v-else class="font-hand text-3xl h-[35vh]">
          <p>NO MEAL</p>
          <!--Add image-->
          <img src="" alt="" />
        </div>

        <img
          v-if="this.scheduleStore.handleInfo !== ''"
          class="object-cover w-full mb-12 h-[17vh]"
          :src="this.scheduleStore.handleInfo.img"
          alt=""
        />

        <button
          v-if="this.scheduleStore.handleInfo !== ''"
          class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/recipes`"
            >Go to recipes and change meal</router-link
          >
        </button>
      </div>

      <div class="h-full flex flex-col justify-center">
        <div
          class="flex items-start justify-end"
          :class="{
            'h-[10vh]': this.scheduleStore.handleInfo !== '',
            'h-[45vh]': this.scheduleStore.handleInfo === '',
          }"
        >
          <button class="h-[35px] w-[40px] bg-lime" @click="closeForm">
            <p class="text-border-orange hover:text-2xl">X</p>
          </button>
        </div>
        <div
          v-if="this.scheduleStore.handleInfo !== ''"
          class="h-[35vh] flex flex-col items-end gap-y-5 justify-center"
        >
          <div
            class="bg-lime h-8 flex justify-center items-center text-border-orange text-xl w-1/2"
          >
            {{ this.scheduleStore.handleInfo.day }}
          </div>

          <div
            class="bg-orange h-8 flex justify-center items-center text-border-lime text-xl w-1/2"
          >
            {{ this.scheduleStore.handleInfo.meal }}
          </div>
        </div>

        <div>
          <button
            v-if="this.scheduleStore.handleInfo !== ''"
            @click="removeRecipe(this.scheduleStore.handleInfo.id)"
            class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            Delete meal
          </button>
        </div>
      </div>
    </div>
    <button
      v-if="this.scheduleStore.handleInfo === ''"
      class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
    >
      <router-link :to="`/recipes`"
        >Go to recipes and change add meal</router-link
      >
    </button>
  </div>
</template>

<script>
import { useSchedule } from "../stores/schedule";
import { updateSchedule } from "../firebase";

export default {
  name: "ChangeRecipe",
  props: {
    closedForm: Boolean,
  },
  setup() {
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
      this.scheduleStore.handleInfo = "";
    },
    removeRecipe(id) {
      this.scheduleStore.schedule = this.scheduleStore.schedule.filter(
        (item) => item.id !== id
      );
      this.scheduleStore.handleInfo = "";
      updateSchedule(this.scheduleStore.schedule);
    },
  },
};
</script>

<style></style>
