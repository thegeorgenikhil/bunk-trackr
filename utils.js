export function formatDateToReplaceMonthName(date) {
  const dateObj = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    dateObj.getDate() +
    " " +
    monthNames[dateObj.getMonth()] +
    " " +
    dateObj.getFullYear()
  );
}

export function showToast(toastEl, message, setTimeoutId, color = "#2cb67d") {
  toastEl.className = "";

  if (!!setTimeoutId) {
    clearTimeout(setTimeoutId);
  }

  // Add the "show" class to DIV
  toastEl.className = "show";
  toastEl.textContent = message;
  toastEl.style.backgroundColor = color;
  // After 2 seconds, remove the show class from DIV
  setTimeoutId = setTimeout(function () {
    toastEl.className = "";
  }, 2000);
}

