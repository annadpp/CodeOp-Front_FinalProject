import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import { createPinia } from "pinia";
import { Vue3Mq } from "vue3-mq";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.use(createPinia());
app.use(Vue3Mq, {
  preset: "tailwind",
});
app.mount("#app");
