<template>
  <div
    v-if="sent"
    class="bg-blueberry fixed p-8 top-[30vh] left-[10vw] w-[80vw] h-[60vh] border-2 border-black dark:border-background drop-shadow-[8px_8px_0px_#000000] dark:drop-shadow-[8px_8px_0px_#F2EEE8]"
  >
    <div class="h-full flex flex-col justify-center">
      <div class="flex justify-between">
        <h3 class="h-[10vh] flex text-2xl dark:text-background">
          NEW RECIPE ADDED <span class="text-6xl"> *</span>
        </h3>

        <button
          class="flex flex-row items-center justify-center h-[35px] w-[40px] bg-lime"
          @click="emitSentStatus"
        >
          <p class="text-border-orange hover:text-2xl dark:text-black">X</p>
        </button>
      </div>

      <div class="grid mb-10 xl:grid-cols-3">
        <div
          class="flex flex-col xl:col-span-2 xl:mb-0 font-hand text-3xl mb-10 dark:text-background"
        >
          <p class="xl:mb-5">{{ this.name }}</p>
          <img
            class="hidden xl:flex flex-col object-cover w-full mb-12 h-[17vh]"
            alt=""
          />
        </div>

        <div
          class="grid grid-cols-2 xl:flex gap-5 justify-center items-center bg-red"
        >
          <div
            class="flex flex-col w-full items-start justify-center xl:items-end gap-5"
          >
            <div
              class="bg-lime h-8 flex justify-center items-center text-border-orange text-xl w-full xl:w-2/3"
            >
              {{ this.category }}
            </div>

            <div
              class="bg-orange h-8 flex justify-center items-center text-border-lime text-xl w-full xl:w-2/3"
            >
              {{ this.country }}
            </div>
          </div>
          <img
            class="xl:hidden flex-col object-cover w-full xl:mb-12 h-[17vh]"
            alt=""
            :src="this.image"
          />
        </div>
      </div>
      <!--BUTTONS-->
      <div
        class="flex flex-col xl:flex-row gap-3 xl:gap-5 dark:text-background w-full"
      >
        <router-link
          :to="`/recipes/${this.id}`"
          class="flex justify-center items-center rounded-full border-2 border-black dark:border-background h-[4vh] xl:h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          <button>See meal</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    //Props from NewRecipe
    "name",
    "image",
    "category",
    "country",
    "sent",
    "id",
  ],
  created() {
    console.log(this.id);
  },
  methods: {
    emitSentStatus() {
      this.$emit("sent-status", false);
    },
  },
};
</script>

<style></style>
