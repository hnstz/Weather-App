import lottie from "lottie-web";

async function getWeather(url) {}

// const {temp, feelslike, conditions, sunrise, sunset,
//     windspeed, cloudcover, precipprob, preciptype,
//     uvindex, icon} = current;

const getWeatherBtn = document.getElementById("getBtn");
const input = document.getElementById("inputLocation");

getWeatherBtn.addEventListener("click", async () => {
  const inputLocation = input.value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputLocation}?key=C78VZEX4EJKRP4E476SPLNU7H`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("some error");
    }
    const result = await response.json();
    console.log(result.currentConditions);
    showAnimation(result.currentConditions.icon);
  } catch (e) {
    console.log(e);
  }
});


async function showAnimation(iconName) {
    try{
        const importLottie = await import(`./node_modules/@meteocons/lottie/fill/${iconName}.json`);
        const container = document.getElementById("icon");
        container.replaceChildren();
        lottie.loadAnimation({
        container: container,
        animationData: importLottie.default,
        loop: true,
        autoplay: true,
    });
    }catch(e){ 
        console.log(e);
    }
}