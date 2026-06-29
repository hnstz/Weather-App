const input = document.getElementById("inputLocation");


export default async function getWeather() {
  const inputLocation = input.value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputLocation}?key=C78VZEX4EJKRP4E476SPLNU7H`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("some error");

    const result = await response.json();
    return result.currentConditions;
  } catch (e) {
    console.log(e);
  }
}
