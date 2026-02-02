import type { TimeOfDay, WeatherAsset } from "./weather_api/type";
import WeatherCondition from '@/config/weather_api_conditions.json'

export function getWeatherAssets(
  code: number,
  isDay: boolean
): WeatherAsset {
  const time: TimeOfDay = isDay ? 'day' : 'night';

  const entry = Object.values(WeatherCondition).find(condition =>
    condition.codes.includes(code)
  );

  return entry?.[time] ?? WeatherCondition.clear[time];
}