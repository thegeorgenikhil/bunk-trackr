const addSubjectBtn = document.getElementById("add-subject-btn");
const addSubjectInput = document.getElementById("add-subject-input");
const bunkData = JSON.parse(localStorage.getItem("bunkData"));

addSubjectBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const subjectName = addSubjectInput.value;
  if (subjectName == "") {
    alert("Please enter a subject name");
    return;
  }
  for (let key in bunkData.classes) {
    if (bunkData.classes[key].name == subjectName) {
      alert("Subject already exists");
      return;
    }
  }
  const subjectObj = {
    name: subjectName,
    bunks: [],
  };
  bunkData.classes[bunkData.index] = subjectObj;
  bunkData.index++;
  localStorage.setItem("bunkData", JSON.stringify(bunkData));
});
