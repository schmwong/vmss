/* -----------------------
Toggle Form Open and Close
----------------------- */

const banner = document.querySelector("#Image1");
const closeBtn = document.querySelector("#close-btn");
const overlay = document.querySelector("#overlay-form");

banner.onclick = openForm = () => overlay.style.display = "block";
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
const buildingRegex = /^[A-Z]/;

const validateBuilding = (building) => buildingRegex.test(building);

//

/* -------------------------
Update DOM and close overlay
------------------------- */

const updateBtn = document.querySelector("input[name='ButtonSubmit']")

updateBtn.onclick = updateDOM = () => {
    let idValue = idInput.value.trim().toUpperCase();
    if (validateID(idValue) == true) {
        document.querySelector("#lblLastFour").innerText = idValue;
    }

    let nameValue = nameInput.value.trim();
    if (validateName(nameValue)) {
        document.querySelector("#lblName").innerText = nameValue;
    }

    let buildingValue = buildingInput.value;
    if (validateBuilding(buildingValue)) {
        document.querySelector("#lblBuilding").innerText = buildingValue;
    }

    overlay.style.display = "none";
}