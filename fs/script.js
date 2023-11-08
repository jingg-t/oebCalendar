const date = new Date();

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'";
import { getAnalytics } from "'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA",
  authDomain: "oebcalendar-c34e0.firebaseapp.com",
  databaseURL: "https://oebcalendar-c34e0-default-rtdb.firebaseio.com",
  projectId: "oebcalendar-c34e0",
  storageBucket: "oebcalendar-c34e0.appspot.com",
  messagingSenderId: "1043573677372",
  appId: "1:1043573677372:web:4978178c657d44f6e81239",
  measurementId: "G-9LX414H8FZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/

const novMatchDays = new Set([ // NOVEMBER hardcoded set of exhibition match days
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
])

const decMatchDays = new Set([ // DECEMBER hardcoded set of exhibition match days
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22
])

const janMatchDays = new Set([ // JANUARY hardcoded set of exhibition match days
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26
])

const novMatchDetails = ([]);

const renderCalendar = () => {

  date.setDate(1);

  const monthDays = document.querySelector(".days"); //change the days 

  // Specific dates 
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1
  const months = [ // used for al the months
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  // write month and date dynamically 
  document.querySelector('.date h1').innerHTML = months[date.getMonth()]
  document.querySelector('.date p').innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date"> ${prevLastDay - x + 1}</div>`
  }

  for (let i = 1; i <= lastDay; i++) { // print days from beginning to end
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`; // when elements are today
    } else if (novMatchDays.has(i) && date.getMonth() == 10) { // hard coded month of exhibition matches
      days += `<div class="matchDay" id="${i}" onclick="renderDetails(this.id)"><u><strong>${i}</strong></u></div>`;
    } else if (decMatchDays.has(i) && date.getMonth() == 11) { // hard coded month of exhibition matches
      days += `<div class="matchDay" id="${i}" onclick="renderDetails(this.id)"><u><strong>${i}</strong></u></div>`;
    } else if (janMatchDays.has(i) && date.getMonth() == 0) { // hard coded month of exhibition matches
      days += `<div class="matchDay" id="${i}" onclick="renderDetails(this.id)"><u><strong>${i}</strong></u></div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`

  }
  monthDays.innerHTML = days;
}


//open form 
function openForm() {
  document.getElementById("myForm").style.display = "block"
}

//WRITE TO JSON HERE 
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function renderDetails(matchDay) { // show the details of the match
  const matchDetails = document.querySelector(".matchDetails")

  let keyMonth = date.getMonth() + 1; // getmonth() returns index value, increment by 1 to match real value
  let searchKey = ("" + keyMonth + matchDay); // concatenate two ints into a string, form search key

  
  let match = "";


  if (matchDay == 13) {
    match += `<p onclick="openForm()"><b>Start Time:</b> 99:99 </br> <b>End Time:</b> 99:99</br> <b>Moderator:</b> Ryan Yi</p>`
    match += `<p onclick="openForm()"><b>Start Time:</b> 99:99 </br> <b>End Time:</b> 99:99</br> <b>Moderator:</b> Jing Tang</p>`
    match += `<p onclick="openForm()"><b>Start Time:</b> 99:99 </br> <b>End Time:</b> 99:99</br> <b>Moderator:</b> Ellen Edmonds-Whyte</p>`
  }

  matchDetails.innerHTML = match;
  console.log(searchKey);
}

document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1)
  renderCalendar()
})

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1)
  renderCalendar()
})


renderCalendar()