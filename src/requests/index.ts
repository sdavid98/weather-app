import { AssetPath } from "../types/enums";
import { CapitalInfo } from "../types/types";

export const fetchCitiesData = () =>
  fetch(AssetPath.CAPITAL_DATA).then<CapitalInfo[]>((res) => res.json());

export const fetchWeatherDetails = (cityName: string, countryCode: string) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
  ).then((res) => res.json());
