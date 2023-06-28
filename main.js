const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const submitButton = document.getElementById("submit");
const bmiElement = document.getElementById("bmi");
const descriptionElement = document.getElementById("description");

submitButton.addEventListener("click", function () {
  const categories = [
    { name: "Underweight (Severe thinness) ", min: 0, max: 16 },
    { name: "Underweight (Moderate thinness) ", min: 16, max: 17 },
    { name: "Underweight (Mild thinness) ", min: 17, max: 18.5 },
    { name: "Normal range ", min: 18.5, max: 25 },
    { name: "Overweight (Pre-obese)", min: 25, max: 30 },
    { name: "Obese (Class I) ", min: 30, max: 35 },
    { name: "Obese (Class II) ", min: 35, max: 40 },
    { name: "Obese (Class III) ", min: 40, max: 1 * Math.pow(10, 99) },
  ];
  const height = heightInput.value;
  const weight = weightInput.value;
  const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 100) / 100;
  bmiElement.textContent = bmi;
  descriptionElement.textContent = categories.find(
    (x) => bmi >= x.min && bmi < x.max
  ).name;
});
