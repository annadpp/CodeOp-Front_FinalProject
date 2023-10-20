<template>
  <div class="grid grid-cols-2 items-center h-[17vh] pt-8 px-5">
    <div class="col-span-1"><h2>Name of recipe</h2></div>
    <div class="col-span-1">
      <div class="flex gap-x-5">
        <p class="text-6xl flex justify-end items-end text-right w-2/3">*</p>
        <div class="flex flex-col items-end gap-y-2 w-1/3">
          <h4
            class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
          >
            Vegetarian
          </h4>
          <h4
            class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-xl"
          >
            Filipino
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-7">
    <div class="grid col-span-3 h-[68vh] border-black border-r-2 p-5 gap-y-5">
      <img
        class="h-[25vh] object-cover w-full"
        src="https://www.themealdb.com/images/media/meals/ewcikl1614348364.jpg"
        alt=""
      />
      <p>I N G R E D I E N T S</p>

      <div class="h-[20vh] w-full grid grid-cols-2 gap-2 content-start">
        <div
          class="flex justify-center items-center bg-blueberry h-[3vh] w-full"
        >
          <p class="font-hand">Beef</p>
        </div>
        <div
          class="flex justify-center items-center bg-blueberry h-[3vh] w-full"
        >
          <p class="font-hand">Beef</p>
        </div>
        <div
          class="flex justify-center items-center bg-blueberry h-[3vh] w-full"
        >
          <p class="font-hand">Beef</p>
        </div>
        <div
          class="flex justify-center items-center bg-blueberry h-[3vh] w-full"
        >
          <p class="font-hand">Beef</p>
        </div>
      </div>

      <button
        class="rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
      >
        Add to weekly menu
      </button>
    </div>

    <div class="grid col-span-4 h-[68vh] p-5">
      <p>H O W &nbsp&nbspT O &nbsp&nbspC O O K&nbsp&nbsp I T</p>

      <div
        class="h-[58vh] overflow-auto w-[98%] p-5 font-hand border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-background"
      >
        añlsjfñalsj
      </div>

      <!--ADD WEEKLY CARD-->
      <form
        class="hidden h-[58vh] w-full p-5 border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-blueberry"
      >
        <div class="h-[10vh] flex items-start justify-end">
          <button class="h-[40px] w-[40px] bg-lime">X</button>
        </div>

        <div class="grid grid-cols-4 gap-x-5 h-[25vh] w-[98%] mt-[7vh]">
          <div class="col-span-1 flex flex-col h-[30vh] gap-y-5">
            <div class="h-[5vh] flex items-center">
              <h4
                class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-xl"
              >
                Meal
              </h4>
            </div>

            <div class="h-[5vh] flex items-center">
              <h4
                class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-xl"
              >
                Day
              </h4>
            </div>
          </div>

          <div class="col-span-3 w-full flex flex-col justify-between h-[30vh]">
            <div class="flex flex-col gap-y-5">
              <select
                name="meal"
                id="meal"
                class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
              >
                <option value="xxxx">xxxx</option>
              </select>
              <select
                name="day"
                id="day"
                class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
              >
                <option value="xxxx">xxxx</option>
              </select>
            </div>
          </div>
        </div>
        <button
          class="mt-6 rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
        >
          Add new product
        </button>
      </form>
      <!--ADD WEEKLY CARD-->
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  components: { Card },
};
</script>

<style>
.text-border-lime {
  text-shadow: rgb(208, 238, 82) 5px 0px 0px,
    rgb(208, 238, 82) 4.90033px 0.993347px 0px,
    rgb(208, 238, 82) 4.60531px 1.94709px 0px,
    rgb(208, 238, 82) 4.12668px 2.82321px 0px,
    rgb(208, 238, 82) 3.48353px 3.58678px 0px,
    rgb(208, 238, 82) 2.70151px 4.20736px 0px,
    rgb(208, 238, 82) 1.81179px 4.6602px 0px,
    rgb(208, 238, 82) 0.849836px 4.92725px 0px,
    rgb(208, 238, 82) -0.145998px 4.99787px 0px,
    rgb(208, 238, 82) -1.13601px 4.86924px 0px,
    rgb(208, 238, 82) -2.08073px 4.54649px 0px,
    rgb(208, 238, 82) -2.94251px 4.04248px 0px,
    rgb(208, 238, 82) -3.68697px 3.37732px 0px,
    rgb(208, 238, 82) -4.28444px 2.57751px 0px,
    rgb(208, 238, 82) -4.71111px 1.67494px 0px,
    rgb(208, 238, 82) -4.94996px 0.7056px 0px,
    rgb(208, 238, 82) -4.99147px -0.291871px 0px,
    rgb(208, 238, 82) -4.83399px -1.27771px 0px,
    rgb(208, 238, 82) -4.48379px -2.2126px 0px,
    rgb(208, 238, 82) -3.95484px -3.05929px 0px,
    rgb(208, 238, 82) -3.26822px -3.78401px 0px,
    rgb(208, 238, 82) -2.4513px -4.35788px 0px,
    rgb(208, 238, 82) -1.53666px -4.75801px 0px,
    rgb(208, 238, 82) -0.560763px -4.96845px 0px,
    rgb(208, 238, 82) 0.437495px -4.98082px 0px,
    rgb(208, 238, 82) 1.41831px -4.79462px 0px,
    rgb(208, 238, 82) 2.34258px -4.41727px 0px,
    rgb(208, 238, 82) 3.17346px -3.86382px 0px,
    rgb(208, 238, 82) 3.87783px -3.15633px 0px,
    rgb(208, 238, 82) 4.4276px -2.32301px 0px,
    rgb(208, 238, 82) 4.80085px -1.39708px 0px,
    rgb(208, 238, 82) 4.98271px -0.415447px 0px;
}

.text-border-orange {
  text-shadow: rgb(253, 95, 9) 5px 0px 0px,
    rgb(253, 95, 9) 4.90033px 0.993347px 0px,
    rgb(253, 95, 9) 4.60531px 1.94709px 0px,
    rgb(253, 95, 9) 4.12668px 2.82321px 0px,
    rgb(253, 95, 9) 3.48353px 3.58678px 0px,
    rgb(253, 95, 9) 2.70151px 4.20736px 0px,
    rgb(253, 95, 9) 1.81179px 4.6602px 0px,
    rgb(253, 95, 9) 0.849836px 4.92725px 0px,
    rgb(253, 95, 9) -0.145998px 4.99787px 0px,
    rgb(253, 95, 9) -1.13601px 4.86924px 0px,
    rgb(253, 95, 9) -2.08073px 4.54649px 0px,
    rgb(253, 95, 9) -2.94251px 4.04248px 0px,
    rgb(253, 95, 9) -3.68697px 3.37732px 0px,
    rgb(253, 95, 9) -4.28444px 2.57751px 0px,
    rgb(253, 95, 9) -4.71111px 1.67494px 0px,
    rgb(253, 95, 9) -4.94996px 0.7056px 0px,
    rgb(253, 95, 9) -4.99147px -0.291871px 0px,
    rgb(253, 95, 9) -4.83399px -1.27771px 0px,
    rgb(253, 95, 9) -4.48379px -2.2126px 0px,
    rgb(253, 95, 9) -3.95484px -3.05929px 0px,
    rgb(253, 95, 9) -3.26822px -3.78401px 0px,
    rgb(253, 95, 9) -2.4513px -4.35788px 0px,
    rgb(253, 95, 9) -1.53666px -4.75801px 0px,
    rgb(253, 95, 9) -0.560763px -4.96845px 0px,
    rgb(253, 95, 9) 0.437495px -4.98082px 0px,
    rgb(253, 95, 9) 1.41831px -4.79462px 0px,
    rgb(253, 95, 9) 2.34258px -4.41727px 0px,
    rgb(253, 95, 9) 3.17346px -3.86382px 0px,
    rgb(253, 95, 9) 3.87783px -3.15633px 0px,
    rgb(253, 95, 9) 4.4276px -2.32301px 0px,
    rgb(253, 95, 9) 4.80085px -1.39708px 0px,
    rgb(253, 95, 9) 4.98271px -0.415447px 0px;
}
</style>
