<template>
  <div class="grid grid-cols-8 justify-center items-center">
    <div class="grid col-span-5 h-[85vh] border-black border-r-2 p-5">
      <div class="grid row-span-2 items-center h-[17vh]">
        <h2>Grocery list</h2>
      </div>

      <div class="grid h-[65vh] border-black">
        <div class="grid grid-cols-4 h-[5vh] gap-x-5 mb-5">
          <button
            class="bg-orange h-8 w-full flex justify-center items-center text-border-lime text-2xl"
          >
            All
          </button>
          <button
            class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-2xl"
          >
            Food
          </button>
          <button
            class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-2xl"
          >
            Cleaning
          </button>
          <button
            class="bg-lime h-8 w-full flex justify-center items-center text-border-orange text-2xl"
          >
            Others
          </button>
        </div>

        <div class="h-[60vh] flex flex-col gap-y-2 justify-start">
          <div
            class="flex items-center justify-between px-5 bg-blueberry h-[5vh] w-full"
          >
            <p class="font-hand text-xl">asfsferte</p>
            <button
              class="rounded-full border-2 border-black h-[5vh] w-[10vw] bg-background hover:border-orange hover:text-orange"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid col-span-3 h-[85vh]">
      <div class="flex justify-center gap-x-5 w-full px-8">
        <div class="flex flex-col justify-center text-[1.8rem] h-[10vh]">
          <p>WEEK <span class="font-hand">2</span></p>
        </div>
      </div>

      <div
        class="flex flex-col justify-center items-center gap-y-5 border-black border-y-2 h-[35vh] p-10"
      >
        <p>A D D &nbsp&nbspE X I S T I N G &nbsp&nbspP R O D U C T</p>
        <form class="flex flex-col w-full gap-y-5" action="/action_page.php">
          <select
            name="cars"
            id="cars"
            class="p-1 mt-4 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
          >
            <option value="xxxx">xxxx</option>
          </select>
          <button
            class="mt-6 rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            Add existing product
          </button>
        </form>
      </div>

      <div
        class="flex flex-col p-10 items-center gap-y-5 h-[40vh] justify-center"
      >
        <p>A D D &nbsp&nbspN E W &nbsp&nbspP R O D U C T</p>
        <form class="flex flex-col w-full gap-y-5" action="/action_page.php">
          <input
            class="mt-4 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
            type="list"
          />
          <select
            name="cars"
            id="cars"
            class="p-1 border-black drop-shadow-[8px_8px_0px_#000000] w-full h-[5vh]"
          >
            <option value="xxxx">xxxx</option>
          </select>
          <button
            class="mt-6 rounded-full border-2 border-black h-[5vh] w-full hover:border-orange hover:text-orange"
          >
            Add new product
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
