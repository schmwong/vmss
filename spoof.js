/* ----------------------------------
  Spoofing the Names, Dates, Times, ID
---------------------------------- */

const currentDate = getDate();
// const currentDate = "06-Jan-2023"; // testing: School of Accountancy
// const currentDate = "11-Jan-2023"; // testing: School of Economics/School of Computing & Information Systems 2
// const currentDate = "17-Feb-2023"; // testing: Lee Kong Chian School of Business

// Modifying Date and Time for Registration and Event elements in the DOM
document.querySelector(
  "#lblThankYou"
).innerText = `${currentDate} ${getRegTime()}`;
document.querySelector(
  "#lblMeetingEvent"
).innerText = `${currentDate} ${getClassTime()}`;
document.querySelector("#lblLastFour").innerText = getRndID();

// Call function to parse random firstname and lastname from json and modify "Name as in ID" field in the DOM
fetchNames()
  .then((names) => {
    const numberFirstnames = Object.keys(names.firstnames).length;
    const numberLastnames = Object.keys(names.lastnames).length;
    console.log(numberFirstnames);
    console.log(numberLastnames);
    const firstName = names.firstnames[getRndInt(1, numberFirstnames)];
    const lastName = names.lastnames[getRndInt(1, numberLastnames)];
    return { firstName, lastName };
  })
  .then(({ firstName, lastName }) => {
    console.log(firstName);
    console.log(lastName);
    document.querySelector("#lblName").innerText = `${firstName} ${lastName}`;
  });

// Call function to retrieve class schedule as json array (key Date: value Classroom), checks if current date is in the keys, then modifies the "Building" field in the DOM with the correct value
fetchSchedule()
  .then((schedule) => {
    const classDates = Object.keys(schedule);
    // console.log(classDates);
    let classroom;
    if (schedule.hasOwnProperty(currentDate)) {
      classroom = schedule[currentDate];
      // console.log(classroom);
    } else {
      classroom = "YPHSL";
    }
    return classroom;
  })
  .then((classroom) => {
    console.log(classroom);
    let building;
    // Regex to match substring at beginning of string (school building)
    // https://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript
    switch (classroom) {
      case classroom.match(/^SOA/)?.input:
        building = "School of Accountancy";
        break;
      case classroom.match(/^SOE\/SCIS2/)?.input:
        building =
          "School of Economics/School of Computing & Information Systems 2";
        break;
      case classroom.match(/^LKCSB/)?.input:
        building = "Lee Kong Chian School of Business";
        break;
      default:
        building = "Yong Pung How School of Law/Kwa Geok Choo Law Library";
    }
    console.log(building);
    return building;
  })
  .then((building) => {
    document.querySelector("#lblBuilding").innerText = building;
  });

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
  let hh = parseInt(today.toTimeString().split(" ")[0].split(":")[0], 10);
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
  let hh = parseInt(regTime.split(" ")[0].split(":")[0], 10);
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
    } else if (hh > 12) {
      hh = parseInt(hh, 10) - 12;
      swapPeriod();
    }
  } else if (mm < 30) {
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

// Get random integer for JSON keys
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRndInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function LoadFile() {
//   var oFrame = document.getElementById("frmFile");
//   var strRawContents =
//     oFrame.contentWindow.document.body.childNodes[0].innerHTML;
//   while (strRawContents.indexOf("\r") >= 0)
//     strRawContents = strRawContents.replace("\r", "");
//   var arrLines = strRawContents.split("\n");
//   alert("File " + oFrame.src + " has " + arrLines.length + " lines");
//   for (var i = 0; i < arrLines.length; i++) {
//     var curLine = arrLines[i];
//     alert("Line #" + (i + 1) + " is: '" + curLine + "'");
//   }
// }

/* ------------------------------------------------
Functions to fetch remote json files asynchronously
 ----------------------------------------------- */
async function fetchNames() {
  let names;

  // Use try/catch instead of `Promise.catch`
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/schmwong/vms/main/data/names.json"
      // "./data/names.json"
    );
    // Use the `.json` method on the fetch response object
    names = await response.json();
  } catch (error) {
    console.log("error", error);
  }

  console.log(names);
  return names;
}
//

//
async function fetchSchedule() {
  let schedule;
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/schmwong/vms/main/data/smu_cc1_dates.json"
    );
    schedule = await response.json();
  } catch (error) {
    console.log("error", error);
  }
  schedule = schedule[0];
  console.log(schedule);
  return schedule;
}
