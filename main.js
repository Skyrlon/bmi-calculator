const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const submitButton = document.getElementById("submit");
const bmiElement = document.getElementById("bmi");
const scaleElement = document.getElementById("scale");
const categoriesElements = document.getElementsByClassName("categories");
const bmiTextElement = document.getElementById("bmi-text");

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

const maxBMI = 50;

submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
  getBMI();
  createScale();
}

function getBMI() {
  const height = heightInput.value;
  const weight = weightInput.value;
  const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 100) / 100;
  bmiElement.textContent = bmi;
}

function createScale() {
  if (!scaleElement.classList.contains("show")) {
    scaleElement.classList.add("show");
    categories.forEach((category, index, array) => {
      let span = document.createElement("span");

      span.textContent = category.name;
      categoriesElements[array.length - 1 - index].append(span);
      if (category.max > maxBMI) {
        categoriesElements[array.length - 1 - index].style.height =
          ((maxBMI - category.min) / maxBMI) * 100 + "%";
      } else {
        categoriesElements[array.length - 1 - index].style.height =
          ((category.max - category.min) / maxBMI) * 100 + "%";
      }
    });
    bmiTextElement.style.top = "50%";
  }
}
