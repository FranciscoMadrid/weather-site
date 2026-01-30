import { WeatherApiMethod } from "./type";
import conditionList from '@/config/weather_api_conditions.json'

const BASE_URL = import.meta.env.BASE_URL_WEATHER_API;
const API_KEY = import.meta.env.SECRET_KEY_WEATHER_API;

export async function getCurrentWeather() {
  const url = `${BASE_URL}/${WeatherApiMethod.Current}?key=${API_KEY}&q=London`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`WeatherApi Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
}

export async function getForecast(){
  const url = `${BASE_URL}/${WeatherApiMethod.Forecast}?key=${API_KEY}&q=London`;

  try {
    const response = await fetch (url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error(`WeatherApi Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch weather forecast:", error);
    throw error;
  }
}

export function getConditionCategory(code: number){
  for(const [group, category] of Object.entries(conditionList)) {
    if(category.codes.includes(code)){
      return group
    }
  }
  /* Default value */
  return 'clear'
}