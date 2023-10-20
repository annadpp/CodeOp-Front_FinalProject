<template>
  <div class="justify-center items-center">
    <div class="h-[85vh] border-black p-5">
      <div class="grid row-span-2 items-center h-[17vh]">
        <h2>Weekly schedule</h2>
      </div>

      <div class="h-[65vh] border-black">
        <div class="h-[3vh] gap-x-5 mb-3 text-right">WEEK 2</div>
        <div class="h-[56vh] grid grid-cols-7">
          <DailySchedule day="Monday" /><DailySchedule
            day="Tuesday"
          /><DailySchedule day="Wednesday" /><DailySchedule
            day="Thursday"
          /><DailySchedule day="Friday" /><DailySchedule
            day="Saturday"
          /><DailySchedule day="Sunday" />
        </div>
      </div>
    </div>

    <!--CHANGE RECIPE CARD-->
    <div
      class="hidden fixed p-8 grid grid-cols-2 top-[30vh] left-[10vw] gap-x-5 bg-blueberry w-[80vw] h-[60vh] border-2 border-black drop-shadow-[8px_8px_0px_#000000]"
    >
      <div class="h-full flex flex-col justify-center">
        <h3 class="h-[10vh] flex text-2xl">
          CURRENT MEAL <span class="text-6xl"> *</span>
        </h3>
        <p class="h-[35vh] font-hand text-3xl">Meal</p>
        <button
          class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          Go to recipes and change meal
        </button>
      </div>

      <div class="h-full flex flex-col justify-center">
        <div class="h-[10vh] flex items-start justify-end">
          <button class="h-[40px] w-[40px] bg-lime">X</button>
        </div>
        <div class="h-[35vh] flex flex-col items-end gap-y-5 justify-center">
          <button
            class="bg-lime h-8 flex justify-center items-center text-border-orange text-xl w-1/2"
          >
            Thursday
          </button>

          <button
            class="bg-orange h-8 flex justify-center items-center text-border-lime text-xl w-1/2"
          >
            Lunch
          </button>
        </div>

        <div>
          <button
            class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            Delete meal
          </button>
        </div>
      </div>
    </div>
    <!--CHANGE RECIPE CARD-->
  </div>
</template>

<script>
import DailySchedule from "../components/DailySchedule.vue";
export default {
  components: { DailySchedule },
};
</script>

<style></style>
