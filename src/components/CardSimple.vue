<template>
  <div
    class="h-[25vh] w-1/2 border-2 border-black drop-shadow-[8px_8px_0px_#000000] bg-background"
  >
    <div
      class="flex border-b-2 w-full h-[5vh] border-black justify-center items-center"
    >
      {{ title }}
    </div>
    <div class="h-[20vh] font-hand flex justify-center items-center">
      <p>dafsdfasdfs</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSimple",
  props: ["title"],
};
</script>

<style lang="scss" scoped></style>
