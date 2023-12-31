import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Back, CityTitle, Time, WeatherInfo } from "../components";
import { AppRoute, Icon } from "../types/enums";
import IconWithText from "../components/IconWithText/IconWithText";
import { fetchWeatherDetails } from "../requests";

interface WeatherDetails {
  timeOffset: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  temp: number;
}

const Details = () => {
  const navigate = useNavigate();
  const { countryCode, cityName } = useParams<{
    countryCode: string;
    cityName: string;
  }>();
  const [details, setDetails] = useState<WeatherDetails>();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(false);

    if (cityName && countryCode) {
      fetchWeatherDetails(cityName, countryCode)
        .then((data) => {
          setDetails({
            timeOffset: data.timezone,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
          });
        })
        .catch(() => {
          setShowError(true);
        });
    }
  }, [cityName, countryCode]);

  if (!cityName || !countryCode) {
    navigate(AppRoute.HOME);
    return null;
  }

  if (showError) {
    return (
      <div className="color-light">
        <Back />
        An error ocurred while fetching location details :(
      </div>
    );
  }

  if (!details) {
    return <>Loading</>;
  }

  return (
    <div>
      <Back />
      <Time offset={details.timeOffset} />
      <CityTitle title={cityName} />
      <WeatherInfo
        iconSrc={`https://openweathermap.org/img/wn/${details.icon}@2x.png`}
        description={details.description}
      />
      <div>
        <IconWithText
          icon={Icon.TEMPERATURE}
          text={Math.floor(details.temp) + " °C"}
        />
        <IconWithText
          icon={Icon.SUNRISE}
          text={getLocalTimeAt(details.timeOffset, details.sunrise)}
        />
        <IconWithText
          icon={Icon.SUNSET}
          text={getLocalTimeAt(details.timeOffset, details.sunset)}
        />
      </div>
    </div>
  );
};

const getLocalTimeAt = (offset: number, target: number) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
  }).format(
    new Date().getTimezoneOffset() * 60 * 1000 + target * 1000 + offset * 1000
  );

export default Details;
