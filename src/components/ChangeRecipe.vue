<template>
  <div
    :class="{
      'bg-blueberry': this.scheduleStore.handleInfo !== '',
      'bg-background': this.scheduleStore.handleInfo === '',
    }"
    class="fixed p-8 top-[30vh] left-[10vw] w-[80vw] h-[60vh] border-2 border-black drop-shadow-[8px_8px_0px_#000000]"
  >
    <div class="h-full flex flex-col justify-center">
      <div class="flex justify-between">
        <h3 class="h-[10vh] flex text-2xl">
          CURRENT MEAL <span class="text-6xl"> *</span>
        </h3>

        <!--BUTTON CLOSE FORM -> emits to Recipe-->
        <button
          class="flex flex-row items-center justify-center h-[35px] w-[40px] bg-lime"
          @click="closeForm"
        >
          <p class="text-border-orange hover:text-2xl">X</p>
        </button>
      </div>

      <!--CURENT MEAL INFORMATION -> receives info from Pinia scheduleStore-->
      <div
        class="grid mb-10"
        :class="{
          'xl:flex justify-center': this.scheduleStore.handleInfo === '',
          'xl:grid-cols-3 ': this.scheduleStore.handleInfo !== '',
        }"
      >
        <!--CURRENT MEAL NAME/NO MEAL-->
        <div class="flex flex-col xl:col-span-2 xl:mb-0">
          <router-link
            v-if="this.scheduleStore.handleInfo !== ''"
            :to="`/recipes/${this.scheduleStore.handleInfo.id}`"
            class="font-hand text-3xl mb-10 hover:underline"
          >
            {{ this.scheduleStore.handleInfo.name }}
          </router-link>
          <div
            v-else
            class="flex justify-start font-hand text-3xl mb-10 w-full"
          >
            <p>NO MEAL</p>
          </div>
          <img
            v-if="this.scheduleStore.handleInfo !== ''"
            class="hidden xl:flex flex-col object-cover w-full mb-12 h-[17vh]"
            :src="this.scheduleStore.handleInfo.img"
            alt=""
          />
          <img
            v-else
            class="hidden xl:flex flex-col object-contain mb-12 h-[17vh]"
            src="../assets/hungry-cat.png"
            alt=""
          />
        </div>

        <!--DAY/MEAL/IMAGE-->
        <div
          :class="{
            'grid-cols-1': this.scheduleStore.handleInfo === '',
            'grid-cols-2': this.scheduleStore.handleInfo !== '',
          }"
          class="grid xl:flex gap-5 justify-center"
        >
          <div
            v-if="this.scheduleStore.handleInfo !== ''"
            class="flex flex-col w-full items-start justify-center xl:items-end gap-5"
          >
            <div
              class="bg-lime h-8 flex justify-center items-center text-border-orange text-xl w-full xl:w-2/3"
            >
              {{ this.scheduleStore.handleInfo.day }}
            </div>

            <div
              class="bg-orange h-8 flex justify-center items-center text-border-lime text-xl w-full xl:w-2/3"
            >
              {{ this.scheduleStore.handleInfo.meal }}
            </div>
          </div>
          <div>
            <img
              v-if="this.scheduleStore.handleInfo !== ''"
              class="xl:hidden flex-col object-cover w-full xl:mb-12 h-[13vh] xl:h-[17vh]"
              :src="this.scheduleStore.handleInfo.img"
              alt=""
            />
            <img
              v-else
              class="xl:hidden flex-col object-contain w-full mb-12 h-[13vh] xl:h-[17vh]"
              src="../assets/hungry-cat.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <!--BUTTONS-->
      <div class="flex flex-col xl:flex-row gap-3 xl:gap-5">
        <!--router-link to Recipes-->
        <button
          class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <router-link :to="`/recipes`"
            ><p v-if="this.scheduleStore.handleInfo === ''">
              Go to recipes & add meal
            </p>
            <p v-else>Go to recipes & change meal</p></router-link
          >
        </button>
        <!--Removes recipe -> emits to Recipe + deletes from Schedule-->
        <button
          v-if="this.scheduleStore.handleInfo !== ''"
          @click="removeRecipe(this.scheduleStore.handleInfo.id)"
          class="rounded-full border-2 border-black h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          Delete meal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useSchedule } from "../stores/schedule";
import { getSchedule } from "../firebase";
import { updateSchedule } from "../firebase";

export default {
  name: "ChangeRecipe",
  props: {
    closedForm: Boolean,
  },
  setup() {
    //Gets info from Pinia scheduleStore
    const scheduleStore = useSchedule();
    return { scheduleStore };
  },
  mounted() {
    //Gets info from Firebase -> async function in firebase.js
    getSchedule().then((schedule) => {
      this.scheduleStore.schedule = schedule;
    });
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
