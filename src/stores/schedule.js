import { defineStore } from "pinia";

export const useSchedule = defineStore("schedule", {
  state: () => ({
    //Stores scheduled meals info
    schedule: [],
    //Stores momentarily information to be computed
    handleInfo: "",
  }),
});
