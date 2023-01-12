/* -----------------------
Toggle Form Open and Close
----------------------- */

const banner = document.querySelector("#Panel1");
const footer = document.querySelector("#Image2")
const closeBtn = document.querySelector("#close-btn");
const overlay = document.querySelector("#overlay-form");

banner.onclick = openForm = () => overlay.style.display = "block";
footer.onclick = openForm = () => overlay.style.display = "block";
closeBtn.onclick = closeForm = () => overlay.style.display = "none";

//

/* -------------------------
Input Validation Functions
------------------------- */

const idInput = document.querySelector("input[name='txtLastFour']");
const idRegex = /^\d{3}[A-Z]$/;

const validateID = (id) => idRegex.test(id);

const nameInput = document.querySelector("input[name='txtName']");
const nameRegex = /^\w+/;

const validateName = (name) => nameRegex.test(name);

const buildingInput = document.querySelector("select[name='ddlBuilding']");
const buildingRegex = /^\w/;

const validateBuilding = (building) => buildingRegex.test(building);

//

/* -------------------------
Update DOM and close overlay
------------------------- */

const updateBtn = document.querySelector("input[name='ButtonSubmit']")

updateBtn.onclick = updateDOM = () => {
    let idValue = idInput.value.trim().toUpperCase();
    borderColorChange(validateID, idValue, idInput, "#lblLastFour");

    let nameValue = nameInput.value.trim();
    borderColorChange(validateName, nameValue, nameInput, "#lblName");

    console.log(originalBuilding); // from spoof.js
    let buildingValue = buildingInput.value;
    borderColorChange(validateBuilding, buildingValue, buildingInput, "#lblBuilding");
    
    // resets to use Building value at page load
    if (buildingValue.length == 0) {
        document.querySelector("#lblBuilding").innerText = originalBuilding;
    }

    overlay.style.display = "none";
}

function borderColorChange (validatorFn, inputValue, inputBox, domSelector) {
    if (validatorFn(inputValue)) {
        document.querySelector(domSelector).innerText = inputValue;
        inputBox.style.borderColor = "green";
    } else if (inputValue.length > 0) {
        inputBox.style.borderColor = "red";
    } else {
        inputBox.style.borderColor = "goldenrod";
    }
}
