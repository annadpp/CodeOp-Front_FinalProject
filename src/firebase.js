import { getDatabase, ref, set, get, child } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNmH3GyGBh5edK5qNsMMDo2T9Md1nzT1k",
  authDomain: "final-project-codeop.firebaseapp.com",
  databaseURL: "https://final-project-codeop-default-rtdb.firebaseio.com",
  projectId: "final-project-codeop",
  storageBucket: "final-project-codeop.appspot.com",
  messagingSenderId: "11610116552",
  appId: "1:11610116552:web:ceec225154f321105170fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

//setter method
export function updateSchedule(scheduleArray) {
  set(ref(db, "schedule"), scheduleArray);
}

//getter method
export async function getSchedule() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "schedule"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}
