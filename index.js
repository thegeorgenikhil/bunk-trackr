import { showToast, formatDateToReplaceMonthName } from "./utils.js";
const subjectOptionsUl = document.getElementById("subject-options-ul");
const datePicker = document.getElementById("date-picker");
const trackBunkBtn = document.getElementById("track-bunk-btn");
const tableDiv = document.getElementById("table-div");
const subjectTemplateDiv = document.getElementById("subject-template-div");
const toastEl = document.getElementById("snackbar");
let setTimeoutId;

let bunkData = JSON.parse(localStorage.getItem("bunkData"));
if (!bunkData) {
  const bunkObj = {
    classes: {},
    index: 0,
  };
  localStorage.setItem("bunkData", JSON.stringify(bunkObj));
  bunkData = bunkObj;
}

if (Object.keys(bunkData.classes).length == 0) {
  subjectTemplateDiv.style.display = "block";

  // templates
  const templateCSE = document.getElementById("template-cse");
  const templateCSSE = document.getElementById("template-csse");
  const templateIT = document.getElementById("template-it");

  templateCSE.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("bunkData", JSON.stringify(CSETEMPLATE));
    location.reload();
  });

  templateCSSE.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("bunkData", JSON.stringify(CSSETEMPLATE));
    location.reload();
  });

  templateIT.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("bunkData", JSON.stringify(ITTEMPLATE));
    location.reload();
  });
}

setCurrentDateToDatePicker(datePicker);
createSubjectOptions(subjectOptionsUl, bunkData);
updateTable(tableDiv, bunkData);

trackBunkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const subject = document.querySelector("input[name='subject']:checked");
  if (!subject) {
    showToast(toastEl, "Please select a subject", setTimeoutId, "red");
    return;
  }
  const date = datePicker.value;
  if (date == "") {
    showToast(toastEl, "Please select a date", setTimeoutId, "red");
    return;
  }
  const subjectName = subject.id;
  const dateObj = { id: Date.now(), date: date };
  bunkData.classes[subjectName].bunks.push(dateObj);
  showToast(toastEl, "Bunk Tracked!", setTimeoutId, "green");
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
    subjectInput.checked = false;
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
    subjectHeading.className = "table-heading";
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
      tableBodyDate.textContent = formatDateToReplaceMonthName(
        bunkData.classes[key].bunks[i].date
      );
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

var CSETEMPLATE = {
  classes: {
    0: {
      name: "DBMS",
      bunks: [],
    },
    1: {
      name: "AFL",
      bunks: [],
    },
    2: {
      name: "OS",
      bunks: [],
    },
    3: {
      name: "COA",
      bunks: [],
    },
    4: {
      name: "PDC",
      bunks: [],
    },
    5: {
      name: "WT",
      bunks: [],
    },
    6: {
      name: "BCOM-L",
      bunks: [],
    },
    7: {
      name: "DBMS-L",
      bunks: [],
    },
    8: {
      name: "OS-L",
      bunks: [],
    },
    9: {
      name: "WT-L",
      bunks: [],
    },
  },
  index: 10,
};

var CSSETEMPLATE = {
  classes: {
    0: {
      name: "DAA",
      bunks: [],
    },
    1: {
      name: "PS",
      bunks: [],
    },
    2: {
      name: "OS",
      bunks: [],
    },
    3: {
      name: "COA",
      bunks: [],
    },
    4: {
      name: "MMI",
      bunks: [],
    },
    5: {
      name: "DBMS",
      bunks: [],
    },
    6: {
      name: "DAA-L",
      bunks: [],
    },
    7: {
      name: "OS-L",
      bunks: [],
    },
    8: {
      name: "DBMS-L",
      bunks: [],
    },
    9: {
      name: "B.COM-L",
      bunks: [],
    },
  },
  index: 10,
};

var ITTEMPLATE = {
  classes: {
    0: {
      name: "WT",
      bunks: [],
    },
    1: {
      name: "DEC",
      bunks: [],
    },
    2: {
      name: "OS",
      bunks: [],
    },
    3: {
      name: "COA",
      bunks: [],
    },
    4: {
      name: "AFL",
      bunks: [],
    },
    5: {
      name: "DBMS",
      bunks: [],
    },
    6: {
      name: "WT-L",
      bunks: [],
    },
    7: {
      name: "OS-L",
      bunks: [],
    },
    8: {
      name: "DBMS-L",
      bunks: [],
    },
    9: {
      name: "B.COM-L",
      bunks: [],
    },
  },
  index: 10,
};
