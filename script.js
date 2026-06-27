import lottie from "lottie-web";

const getWeatherBtn = document.getElementById("getBtn");
const input = document.getElementById("inputLocation");

getWeatherBtn.addEventListener("click", async () => {
  const inputLocation = input.value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputLocation}?key=C78VZEX4EJKRP4E476SPLNU7H`;
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("some error");

    const result = await response.json();
    console.log(result.currentConditions);

    printWeatherInfo(result.currentConditions);
    showAnimation(result.currentConditions.icon);
  } catch (e) {
    console.log(e);
  }
});

async function showAnimation(iconName) {
  try {
    const importLottie = await import(
      `./node_modules/@meteocons/lottie/fill/${iconName}.json`
    );
    const container = document.getElementById("icon");
    container.replaceChildren();

    lottie.loadAnimation({
      container: container,
      animationData: importLottie.default,
      loop: true,
      autoplay: true,
    });
  } catch (e) {
    console.log(e);
  }
}

async function printWeatherInfo(weatherData) {
  const fieldsToPrint = new Map([
    ["temp", "Temperature"],
    ["conditions", "Conditions"],
    ["sunrise", "Sunrise"],
    ["sunset", "Sunset"],
    ["windspeed", "Wind speed"],
    ["precipprob", "Precipitation probability"],
    ["preciptype", "Precipitation type"],
    ["uvindex", "UV Index"]
  ]);

  const textContainer = document.getElementById("text");
  textContainer.innerHTML = '';

  fieldsToPrint.forEach((label, field) => {
    if (weatherData[field] !== undefined  && (label !== 'Precipitation type' && field !== 'Null')) {
      if(field === "temp"){
        textContainer.append(
          `${label} (°F): ${weatherData[field]}`, document.createElement("br"),
          `${label} (°C): ${((Number(weatherData[field])-32) / 1.8).toFixed(1)}`, document.createElement("br")
        );
        return;
      }

      textContainer.append(`${label}: ${weatherData[field]}`, document.createElement("br"));
    }
  });
}

function toggleTheme(){
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
}



const toggleThemeBtn = document.getElementById('theme-toggle');
toggleThemeBtn.addEventListener('click', toggleTheme);

const toggleLanguageBtn = document.querySelector('.language-toggle');
toggleLanguageBtn.addEventListener('click', () => toggleLanguageBtn.classList.toggle('ru'));