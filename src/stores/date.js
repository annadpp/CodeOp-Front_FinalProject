import { defineStore } from "pinia";

export const useDate = defineStore("date", {
  state: () => ({
    currentDate: new Date(),
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
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
      //Gathers information processed in actions and formats it as desired
      const dayOfWeek = this.getFormattedDayToday();
      const dayOfMonth = this.currentDate.getDate();
      const month = this.months[this.currentDate.getMonth()];
      const year = this.currentDate.getFullYear();
      const yearLastTwoDigits = year.toString().slice(-2);

      //Returns the html code with formatted date
      return `<p>${dayOfWeek}</p>
        <p>${dayOfMonth} <span class="font-hand">${month.toUpperCase()}</span> '${yearLastTwoDigits}</p>`;
    },
    currentWeekOfYear() {
      //Calculates current week of the year
      const currentDate = this.currentDate;
      //Sets the reference date to the beginning of the current year and calculates difference in ms
      const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
      const diff = currentDate - startOfYear;
      const oneDay = 1000 * 60 * 60 * 24;
      //Calculates the week number by dividing the difference by milliseconds in a week and adding 1
      const week = Math.floor(diff / oneDay / 7) + 1;

      return week;
    },
  },
  actions: {
    getFormattedDayToday() {
      //Gets the date for today by retrieving the day of the week name by accessing the corresponding index in daysOfWeek
      const currentDate = this.currentDate;
      return this.days[currentDate.getDay()];
    },
    getFormattedDayTomorrow() {
      //Creates a new Date object for tomorrow based on the current date by adding 1
      const currentDate = this.currentDate;
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      return this.days[tomorrow.getDay()];
    },
    updateCurrentDate() {
      //Updates the current date
      this.currentDate = new Date();
    },
  },
});
