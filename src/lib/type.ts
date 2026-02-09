export type SettingsSite = {
  viewCelsius: boolean;
  viewKm: boolean;
}

export const WeekdayMap: Record<number, string> ={
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
}

export interface CityStructure {
  city: string,
  city_ascii: string,
  lat: string,
  lng: string,
  country: string,
  iso2: string,
  iso3: string,
  admin_name: string,
  capital: string,
  population:string,
  id: string
}