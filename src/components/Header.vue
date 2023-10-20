<template>
  <header
    class="grid grid-cols-2 border-black border-b-2 px-5 h-[10vh] bg-background"
  >
    <div></div>
    <div class="flex justify-between items-center font-sans">
      <router-link to="/schedule"
        ><button :class="{ 'bg-black text-background': menu === 'schedule' }">
          SCHEDULE
        </button></router-link
      >
      <router-link to="/grocery"
        ><button :class="{ 'bg-black text-background': menu === 'grocery' }">
          GROCERY
        </button></router-link
      >
      <router-link to="/recipes"
        ><button :class="{ 'bg-black text-background': menu === 'recipes' }">
          RECIPES
        </button></router-link
      >
      <router-link to="/"
        ><button :class="{ 'bg-black text-background': menu === 'home' }">
          HOME
        </button></router-link
      >
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["menu"],
};
</script>

<style scoped>
button {
  height: 2.8rem;
  width: 8rem;
}
</style>
