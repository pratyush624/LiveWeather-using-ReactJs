import axios from "axios";

const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "7ce934af099025072871fce329d264b4";

export const getWeatherData = async (cityname) => {
  try {
    const {data} = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
    return data
  } catch (error) {
    throw error;
  }
};