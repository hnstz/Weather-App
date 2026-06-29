import { translations } from "./translations";
import { toggleLanguageBtn } from "./script";
import lottie from "lottie-web";

export async function printWeatherInfo(weatherData) {
  const textContainer = document.getElementById("text");
  const lang = toggleLanguageBtn.innerText;
  console.log("LANG IS", lang);
  textContainer.innerHTML = "";
    
  const fieldsToPrint = Object.keys(translations);
  fieldsToPrint.forEach((field) => {
    if (weatherData[field] !== undefined && weatherData[field] !== null) {
      const label = translations[field][lang];
      
      if (field === "temp") {
        const tempF = weatherData[field];
        const tempC = ((Number(tempF) - 32) / 1.8).toFixed(1);
        textContainer.append(
          `${label} (°F): ${tempF}`,
          document.createElement("br"),
          `${label} (°C): ${tempC}`,
          document.createElement("br"),
        );
      } else if (field === "preciptype" && Array.isArray(weatherData[field])) {
        textContainer.append(
          `${label}: ${weatherData[field].join(", ")}`,
          document.createElement("br"),
        );
      } else {
        textContainer.append(
          `${label}: ${weatherData[field]}`,
          document.createElement("br"),
        );
      }
    }
  });
}

export async function showAnimation(iconName) {
  try {
    const importLottie = await import(
      `../node_modules/@meteocons/lottie/fill/${iconName}.json`
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
