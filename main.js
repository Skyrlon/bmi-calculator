const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const submitButton = document.getElementById("submit");
const bmiElement = document.getElementById("bmi");
const scaleElement = document.getElementById("scale");
const categoriesElements = document.getElementsByClassName("categories");
const categoriesTextElements =
  document.getElementsByClassName("categories-text");
const bmiTextElement = document.getElementById("bmi-text");
const bmiBarElement = document.getElementById("bmi-bar");
const flagsContainer = document.getElementById("flags-container");
const flagsElements = document.getElementsByClassName("flags");

const categories = [
  {
    name: { gb: "Underweight (Severe thinness)", fr: "Dénutrition " },
    min: 0,
    max: 16,
    color: "navy",
  },
  {
    name: { gb: "Underweight (Moderate thinness)", fr: "Maigreur" },
    min: 16,
    max: 17,
    color: "blue",
  },
  {
    name: { gb: "Underweight (Mild thinness)", fr: "Légére maigreur" },
    min: 17,
    max: 18.5,
    color: "aqua",
  },
  {
    name: { gb: "Normal range", fr: "Poids normal" },
    min: 18.5,
    max: 25,
    color: "green",
  },
  {
    name: { gb: "Overweight (Pre-obese)", fr: "Surpoids" },
    min: 25,
    max: 30,
    color: "yellow",
  },
  {
    name: { gb: "Obese (Class I)", fr: "Obésité modérée" },
    min: 30,
    max: 35,
    color: "orange",
  },
  {
    name: { gb: "Obese (Class II)", fr: "Obésité sévère" },
    min: 35,
    max: 40,
    color: "red",
  },
  {
    name: { gb: "Obese (Class III)", fr: "Obésité morbide" },
    min: 40,
    max: 1 * Math.pow(10, 99),
    color: "darkred",
  },
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
  return bmi;
}

function createScale() {
  if (!scaleElement.classList.contains("show")) {
    scaleElement.classList.add("show");
    categories.forEach((category, index, array) => {
      let textElement = document.createElement("span");
      textElement.classList.add("categories-text");
      if (category.max < maxBMI) {
        let numberElement = document.createElement("span");
        numberElement.classList.add("scale-numbers");
        numberElement.style.position = "absolute";
        numberElement.style.top = "0%";
        numberElement.style.left = "calc(100% + 0.5rem)";
        numberElement.style.transform = "translate(0, -50%)";
        categoriesElements[array.length - 1 - index].append(numberElement);
      }
      categoriesElements[array.length - 1 - index].append(textElement);
      if (category.max > maxBMI) {
        categoriesElements[array.length - 1 - index].style.height =
          ((maxBMI - category.min) / maxBMI) * 100 + "%";
      } else {
        categoriesElements[array.length - 1 - index].style.height =
          ((category.max - category.min) / maxBMI) * 100 + "%";
      }
      categoriesElements[array.length - 1 - index].style.backgroundColor =
        category.color;
    });
  }
  addText();
  const flagSelected = document.querySelector(".flags.selected");
  changeLanguage(flagSelected.id);
}

function addText() {
  bmiElement.textContent = getBMI();
  bmiTextElement.style.top =
    getBMI() > maxBMI ? 0 + "%" : 100 - (getBMI() / maxBMI) * 100 + "%";
  bmiBarElement.style.top =
    getBMI() > maxBMI ? 0 + "%" : 100 - (getBMI() / maxBMI) * 100 + "%";
  const scaleNumbers = document.querySelectorAll(".scale-numbers");
  for (let i = 0; i < scaleNumbers.length; i++) {
    scaleNumbers[i].textContent = Math.round(
      categories[scaleNumbers.length - 1 - i].max *
        Math.pow(heightInput.value / 100, 2)
    );
  }
}

function isoToEmoji(code) {
  return code
    .split("")
    .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
    .map((n) => String.fromCodePoint(n))
    .join("");
}

function addFlags() {
  const languages = ["gb", "fr"];
  languages.forEach((x) => {
    const flag = document.createElement("div");
    if (x === "gb") flag.classList.add("selected");
    flag.setAttribute("id", x);
    flag.classList.add("flags");
    flag.textContent = isoToEmoji(x);
    flagsContainer.append(flag);
  });
}

addFlags();

function changeLanguage(languageChosen) {
  [...flagsElements].forEach((element) => {
    if (element.id === languageChosen) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
  [...categoriesTextElements].forEach(
    (element, index, array) =>
      (element.textContent =
        categories[array.length - 1 - index].name[languageChosen])
  );
}

for (let i = 0; i < flagsElements.length; i++) {
  const element = flagsElements[i];
  element.addEventListener("click", () => changeLanguage(element.id));
}
