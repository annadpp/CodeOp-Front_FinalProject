<template>
  <section
    class="flex flex-col justify-between items-center w-full"
    :style="'max-height: ' + heightcard + 'vh'"
  >
    <h5 v-if="title" class="flex my-4">{{ title }}</h5>
    <div class="flex items-center justify-center w-full">
      <img
        class="object-cover w-full"
        :style="'height: ' + heightimg + 'vh'"
        :src="img"
        alt=""
      />
    </div>
    <div
      class="flex items-center justify-center bg-blueberry w-full font-hand text-xl"
      :style="'height: ' + heighttext + 'vh'"
    >
      {{ name }}
    </div>
  </section>
</template>

<script>
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
  ],
};
</script>

<style></style>
