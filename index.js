const subjectOptionsUl = document.getElementById("subject-options-ul");
const datePicker = document.getElementById("date-picker");
const trackBunkBtn = document.getElementById("track-bunk-btn");
const tableDiv = document.getElementById("table-div");

let bunkData = JSON.parse(localStorage.getItem("bunkData"));
if (!bunkData) {
  const bunkObj = {
    classes: {},
    index: 0,
  };
  localStorage.setItem("bunkData", JSON.stringify(bunkObj));
  bunkData = bunkObj;
}

setCurrentDateToDatePicker(datePicker);
createSubjectOptions(subjectOptionsUl, bunkData);
updateTable(tableDiv, bunkData);

trackBunkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const subject = document.querySelector("input[name='subject']:checked");
  if (!subject) {
    alert("Please select a subject");
    return;
  }
  const date = datePicker.value;
  if (date == "") {
    alert("Please select a date");
    return;
  }
  const subjectName = subject.id;
  const dateObj = { id: Date.now(), date: date };
  bunkData.classes[subjectName].bunks.push(dateObj);
  updateTable(tableDiv, bunkData);
  localStorage.setItem("bunkData", JSON.stringify(bunkData));
});

function setCurrentDateToDatePicker(datePicker) {
  const currentDate = new Date();
  datePicker.value =
    currentDate.getFullYear().toString() +
    "-" +
    (currentDate.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    currentDate.getDate().toString().padStart(2, 0);
}

function createSubjectOptions(ul, bunkData) {
  const subjectFragment = document.createDocumentFragment();
  for (let key in bunkData.classes) {
    const subjectLi = document.createElement("li");
    const subjectInput = document.createElement("input");
    subjectInput.type = "radio";
    subjectInput.id = key;
    subjectInput.name = "subject";
    const subjectLabel = document.createElement("label");
    subjectLabel.htmlFor = key;
    subjectLabel.textContent = bunkData.classes[key].name;
    subjectLi.appendChild(subjectInput);
    subjectLi.appendChild(subjectLabel);
    subjectFragment.appendChild(subjectLi);
  }
  ul.appendChild(subjectFragment);
}

function updateTable(tableDiv, bunkData) {
  tableDiv.innerHTML = "";
  const tableFragment = document.createDocumentFragment();
  for (let key in bunkData.classes) {
    if (bunkData.classes[key].bunks.length == 0) {
      continue;
    }
    const subjectHeading = document.createElement("h2");
    subjectHeading.textContent = `${bunkData.classes[key].name}: ${bunkData.classes[key].bunks.length} bunks`;
    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableHeadRow = document.createElement("tr");
    const tableHeadNumber = document.createElement("th");
    tableHeadNumber.textContent = "#";
    const tableHeadDate = document.createElement("th");
    tableHeadDate.textContent = "Date";
    tableHeadRow.appendChild(tableHeadNumber);
    tableHeadRow.appendChild(tableHeadDate);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);

    const tableBody = document.createElement("tbody");
    for (let i = 0; i < bunkData.classes[key].bunks.length; i++) {
      const tableBodyRow = document.createElement("tr");
      const tableBodyNumber = document.createElement("td");
      tableBodyNumber.textContent = i + 1;
      const tableBodyDate = document.createElement("td");
      tableBodyDate.textContent = bunkData.classes[key].bunks[i].date;
      tableBodyRow.appendChild(tableBodyNumber);
      tableBodyRow.appendChild(tableBodyDate);
      tableBody.appendChild(tableBodyRow);
    }
    table.appendChild(tableBody);
    tableFragment.appendChild(subjectHeading);
    tableFragment.appendChild(table);
  }
  tableDiv.appendChild(tableFragment);
}
