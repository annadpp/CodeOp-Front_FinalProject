import { defineStore } from "pinia";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const useDate = defineStore("date", {
  state: () => ({
    currentDate: new Date(),
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  }),
  getters: {
    formattedDate() {
      const dayOfWeek = this.getFormattedDayToday(); // Use the local method, not 'this'
      const dayOfMonth = this.currentDate.getDate();
      const month = this.months[this.currentDate.getMonth()];
      const year = this.currentDate.getFullYear();
      const yearLastTwoDigits = year.toString().slice(-2);

      return `<p>${dayOfWeek}</p>
        <p>${dayOfMonth} <span class="font-hand">${month.toUpperCase()}</span> '${yearLastTwoDigits}</p>`;
    },
    currentWeekOfYear() {
      // Calculate current week of the year
      const currentDate = this.currentDate;
      const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
      const diff = currentDate - startOfYear;
      const oneDay = 1000 * 60 * 60 * 24;
      const week = Math.floor(diff / oneDay / 7);

      return week;
    },
  },
  actions: {
    getFormattedDayToday() {
      const currentDate = this.currentDate; // Get the date from the store state
      return daysOfWeek[currentDate.getDay()];
    },
    getFormattedDayTomorrow() {
      const currentDate = this.currentDate;
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      return daysOfWeek[tomorrow.getDay()];
    },
    updateCurrentDate() {
      this.currentDate = new Date(); // Update the current date in the store
    },
  },
});
