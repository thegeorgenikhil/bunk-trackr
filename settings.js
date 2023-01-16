import { showToast, formatDateToReplaceMonthName } from "./utils.js";
const addSubjectBtn = document.getElementById("add-subject-btn");
const addSubjectInput = document.getElementById("add-subject-input");
const deleteSubjectInputDiv = document.getElementById(
  "delete-subject-input-div"
);
const deleteSubjectBtn = document.getElementById("delete-subject-btn");
const resetSubjectsBtn = document.getElementById("reset-subjects-btn");
const deleteClassesDiv = document.getElementById("delete-classes-div");
const toastEl = document.getElementById("snackbar");
const bunkData = JSON.parse(localStorage.getItem("bunkData"));
let setTimeoutId;

addDeleteSubjectOptions(deleteSubjectInputDiv, bunkData);
addDeleteClassesTable(deleteClassesDiv, bunkData);

addSubjectBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const subjectName = addSubjectInput.value;
  if (subjectName == "") {
    showToast(toastEl, "Please enter a subject name", setTimeoutId, "red");
    return;
  }
  for (let key in bunkData.classes) {
    if (bunkData.classes[key].name == subjectName) {
      showToast(toastEl, "Subject already exists", setTimeoutId, "red");
      return;
    }
  }
  const subjectObj = {
    name: subjectName,
    bunks: [],
  };
  bunkData.classes[bunkData.index] = subjectObj;
  bunkData.index++;
  showToast(toastEl, "Subject added", setTimeoutId, "green");
  localStorage.setItem("bunkData", JSON.stringify(bunkData));
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});

deleteSubjectBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const deleteSubjectInput = document.getElementsByName("delete-subject");
  let subjectToDelete = "";
  for (let i = 0; i < deleteSubjectInput.length; i++) {
    if (deleteSubjectInput[i].checked) {
      subjectToDelete = deleteSubjectInput[i].value;
      break;
    }
  }
  if (subjectToDelete == "") {
    showToast(
      toastEl,
      "Please select a subject to delete",
      setTimeoutId,
      "red"
    );
    return;
  }
  if (!confirm("Are you sure you want to delete this subject?")) {
    return;
  }
  delete bunkData.classes[subjectToDelete];
  showToast(toastEl, "Subject deleted", setTimeoutId, "red");
  localStorage.setItem("bunkData", JSON.stringify(bunkData));
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});

resetSubjectsBtn.addEventListener("click", () => {
  if (!confirm("Are you sure? This will delete all the existing data.")) {
    return;
  }
  if (!confirm("Asking you again just to be sure. Sure na?")) {
    return;
  }
  if (!confirm("Last time, no more, will delete everything after this!")) {
    return;
  }
  const bunkObj = {
    classes: {},
    index: 0,
  };
  localStorage.setItem("bunkData", JSON.stringify(bunkObj));
  showToast(toastEl, "All data deleted", setTimeoutId);
  setTimeout(() => {
    console.log("hello");
    window.location.reload();
  }, 1000);
});

function addDeleteSubjectOptions(deleteSubjectInput, bunkData) {
  const deleteSubjectFragment = document.createDocumentFragment();
  for (let key in bunkData.classes) {
    const div = document.createElement("div");
    div.className = "delete-subject-option";

    // radio button for each subject
    const deleteSubjectOption = document.createElement("input");
    deleteSubjectOption.type = "radio";
    deleteSubjectOption.name = "delete-subject";
    deleteSubjectOption.value = key;
    deleteSubjectOption.id = key;
    div.appendChild(deleteSubjectOption);

    // label for each subject
    const deleteSubjectLabel = document.createElement("label");
    deleteSubjectLabel.htmlFor = key;
    deleteSubjectLabel.innerText = bunkData.classes[key].name;
    div.appendChild(deleteSubjectLabel);

    deleteSubjectFragment.appendChild(div);
  }
  deleteSubjectInput.appendChild(deleteSubjectFragment);
}

function addDeleteClassesTable(deleteClassesDiv, bunkData) {
  deleteClassesDiv.innerHTML = "";
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

    const tableHeadDelete = document.createElement("th");
    tableHeadDelete.textContent = "Delete";
    tableHeadRow.appendChild(tableHeadNumber);
    tableHeadRow.appendChild(tableHeadDate);
    tableHeadRow.appendChild(tableHeadDelete);
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

      const tableBodyDelete = document.createElement("td");
      const tableBodyDeleteBtn = document.createElement("button");
      tableBodyDeleteBtn.className = "delete-class-btn";
      tableBodyDeleteBtn.textContent = "Delete";
      tableBodyDeleteBtn.addEventListener("click", () => {
        if (!confirm("Are you sure?")) {
          return;
        }
        bunkData.classes[key].bunks.splice(i, 1);
        showToast(toastEl, "Class deleted", setTimeoutId, "red");
        localStorage.setItem("bunkData", JSON.stringify(bunkData));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
      tableBodyDelete.appendChild(tableBodyDeleteBtn);
      tableBodyRow.appendChild(tableBodyNumber);
      tableBodyRow.appendChild(tableBodyDate);
      tableBodyRow.appendChild(tableBodyDelete);
      tableBody.appendChild(tableBodyRow);
    }
    table.appendChild(tableBody);
    tableFragment.appendChild(subjectHeading);
    tableFragment.appendChild(table);
  }
  deleteClassesDiv.appendChild(tableFragment);
}
