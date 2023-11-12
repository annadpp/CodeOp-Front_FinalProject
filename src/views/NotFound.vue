<template>
  <div
    class="absolute z-0 w-full xl:static top-[10vh] justify-center items-center"
  >
    <div
      class="h-[85vh] border-black xl:p-5 xl:mb-0 flex items-center justify-center"
    >
      <div
        class="w-full h-[43vh] xl:h-[50vh] flex flex-col text-xl md:text-2xl items-center justify-center py-8 px-5 bg-blueberry dark:text-background"
      >
        <img
          src="../assets/mad-cat.png"
          alt=""
          class="object-contain h-[20vw] md:h-[11vw] xl:h-[9vw]"
        />
        <p class="font-hand mt-5">404 ERROR</p>
        <p class="font-hand mt-5 text-center">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "404",
};
</script>

<style lang="scss" scoped></style>
