import getWeather from "./getWeather";
import { printWeatherInfo, showAnimation } from "./printers";
import '../style.css';

const getWeatherBtn = document.getElementById("getBtn");
getWeatherBtn.addEventListener("click", async () => {
  const result = await getWeather();
  printWeatherInfo(result);
  showAnimation(result.icon);
});

const toggleThemeBtn = document.getElementById("theme-toggle");
toggleThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("light") ? "light" : "dark",
  );
});

export const toggleLanguageBtn = document.querySelector(".language-toggle");
toggleLanguageBtn.addEventListener("click", (e) => {
  const lang = e.target.textContent === 'ru' ? 'eng' : 'ru';
  document.querySelector("label").textContent = text[lang].inputLabel;
  document.querySelector("#getBtn").textContent = text[lang].buttonText;
  document.getElementById("inputLocation").placeholder = text[lang].placeholder;
  toggleLanguageBtn.classList.toggle("eng");
  printWeatherInfo()
});

const text = {
  eng: {
    inputLabel: "Enter the city",
    buttonText: "get weather!",
    placeholder: "London",
  },
  ru: {
    inputLabel: "Введите город",
    buttonText: "узнать погоду",
    placeholder: "Лондон",
  },
};