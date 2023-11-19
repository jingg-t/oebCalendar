const date = new Date();

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


const renderCalendar = () => {

  date.setDate(1);

  const monthDays = document.querySelector(".days"); //change the days 

  // Specific dates 
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1
  const months = [ // used for all the months
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
      days += `<div class="matchDay" id="${i}" onclick="renderDetails(this.id)"><u><strong>${i}</strong></u></div>`; // pass id number as code
    } else if (decMatchDays.has(i) && date.getMonth() == 11) { 
      days += `<div class="matchDay" id="${i}" onclick="renderDetails(this.id)"><u><strong>${i}</strong></u></div>`;
    } else if (janMatchDays.has(i) && date.getMonth() == 0) { 
      days += `<div class="matchDay" id="${i}" onclick="renderDetails(this.id)"><u><strong>${i}</strong></u></div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) { // print out the daysof the next month differently
    days += `<div class="next-date">${j}</div>`

  }
  monthDays.innerHTML = days;
}
let matchClicked = 0;
//open form 
function openForm(finalClick) {
  document.getElementById("myForm").style.display = "block"
  matchClicked = finalClick;
}
const formEL = document.querySelector('.formContainer'); 
//WRITE TO JSON HERE 
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function renderDetails(matchDay) { // show the details of the match
  const matchDetails = document.querySelector(".matchDetails")

  let keyMonth = date.getMonth() + 1; // getmonth() returns index value, increment by 1 to match real value
  let searchKey = ("" + keyMonth + matchDay); // concatenate two ints into a string, form search key
  
  let match = ""; // read from db to render match details unique to the day
  fetch ('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/posts.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA')
    .then(res => res.json())
    .then(data => {
      let parseData = data["read"][searchKey]; // point to the day clicked
      
      for (let i = 1; i < parseData.length; i++){
        let start = parseData[i].start;
        let end = parseData[i].end;
        let moderator = parseData[i].moderator; // print out the information read from the data 
        match += `<p class="specificMatch" onclick="openForm(this.id)" id="${i}"><b>Start Time:</b> ${start} </br> <b>End Time:</b> ${end} </br> <b>Moderator:</b> ${moderator}</p>`
      }
      matchDetails.innerHTML = match;
    });
  
  
  formEL.addEventListener('submit', event => { // event listener to form submission
    event.preventDefault();
    const formData = new FormData(formEL);
    
    const data = Object.fromEntries(formData);
    
    //generates its own unique key in the form of month, day, match number (1 to n)
    fetch ('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/posts/write/' + searchKey + matchClicked + '.json/?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // actual content being written to db from form submission
    })

    
  })
}


// event listeners to change months
document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1)
  renderCalendar()
})

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1)
  renderCalendar()
})


renderCalendar()