const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const submitButton = document.getElementById("submit");
const bmiElement = document.getElementById("bmi");

submitButton.addEventListener("click", function () {
  const height = heightInput.value;
  const weight = weightInput.value;
  bmiElement.textContent = weight / Math.pow(height/100, 2);
});
