import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink, generatePath, useNavigate } from "react-router-dom";

import { RootState } from "../store";
import { AppRoute } from "../types/enums";
import { CapitalInfo } from "../types/types";

const Home = () => {
  const navigate = useNavigate();
  const cities = useSelector((state: RootState) => state.cities);

  const sorted = useMemo(
    () => [...cities].sort((a, b) => a.capital.localeCompare(b.capital)),
    [cities]
  );

  const viewDetails = useCallback(
    ({ countryCode, capital }: CapitalInfo) => {
      navigate(
        generatePath(AppRoute.DETAILS, {
          countryCode,
          cityName: capital,
        })
      );
    },
    [navigate]
  );

  return (
    <div>
      {sorted.length > 0 ? (
        <ul>
          {sorted.map(({ capital, countryCode }) => (
            <li
              key={capital}
              onClick={() => viewDetails({ capital, countryCode })}
            >
              {capital}
            </li>
          ))}
        </ul>
      ) : null}
      <NavLink to={AppRoute.SEARCH}>+</NavLink>
    </div>
  );
};

export default Home;
