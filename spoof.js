// Spoofing the dates, times, ID

document.querySelector(
  "#lblThankYou"
).innerText = `${getDate()} ${getRegTime()}`;
document.querySelector(
  "#lblMeetingEvent"
).innerText = `${getDate()} ${getClassTime()}`;
document.querySelector("#lblLastFour").innerText = getRndID();


// Formatting the Date and Time without using Moment.js or any external libraries

function getDate() {
  let today = new Date();
  let dd = today.getDate().toString().padStart(2, "0");
  let mmm = today.toString().split(" ")[1];
  let yyyy = today.getFullYear();
  return `${dd}-${mmm}-${yyyy}`;
}

function getRegTime() {
  let period = "AM";
  let today = new Date();
  let hh = today.toTimeString().split(" ")[0].split(":")[0];
  if (hh > 12) {
    hh -= 12;
    period = "PM";
  } else if (hh == 0) {
    hh = 12;
  }
  hh = hh.toString().padStart(2, "0");
  let mm = today.toTimeString().split(" ")[0].split(":")[1].padStart(2, "0");
  return `${hh}:${mm} ${period}`;
}

function swapPeriod() {
  let period = getRegTime().split(" ")[1];
  if (period == "AM") {
    return "PM";
  } else if (period == "PM") {
    return "AM";
  }
}


// Sets Class Time to the next half hour block after Registration Time
function getClassTime() {
  let regTime = getRegTime();
  let hh = regTime.split(" ")[0].split(":")[0];
  let mm = parseInt(regTime.split(" ")[0].split(":")[1], 10);
  let period = regTime.split(" ")[1];
  if (hh <= 9 && period == "AM") {
    return "09:00 AM";
  }
  if (mm > 30) {
    mm = "00";
    hh += 1;
    if (hh == 12) {
      swapPeriod();
    }
    if (hh > 12) {
      hh -= 12;
      swapPeriod();
    }
  } else if (mm > 0) {
    mm = 30;
  }
  hh = hh.toString().padStart(2, "0");
  return `${hh}:${mm} ${period}`;
}


// Get Random ID (last 4 characters)
function getRndID() {
  let num = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  return `${num}${letter}`;
}
