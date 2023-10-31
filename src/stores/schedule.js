import { defineStore } from "pinia";

export const useSchedule = defineStore("schedule", {
  state: () => ({
    schedule: [],
    handleInfo: "",
  }),
});
