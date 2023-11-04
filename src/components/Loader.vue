<template>
  <div
    class="bg-blueberry flex items-end justify-center"
    :class="img ? 'h-[' + (img - 3) + 'vh]' : 'h-[7vh] md:h-[10vh]'"
  >
    <img
      src="../assets/waiting-cat.png"
      alt=""
      :class="img ? 'h-[' + img + 'vh]' : 'h-[12vh] md:h-[15vh]'"
      class="moving-image"
    />
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ["img"],
};
</script>

<style scoped>
.moving-image {
  transform: translateX(-100%);
  animation: moveImage 2s linear forwards infinite;
}

@keyframes moveImage {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
