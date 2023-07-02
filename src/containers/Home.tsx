import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink, generatePath, useNavigate } from "react-router-dom";

import { RootState } from "../store";
import { AppRoute } from "../types/enums";
import { CapitalInfo } from "../types/types";
import { Add, CityTitle } from "../components";

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
      {sorted.map(({ capital, countryCode }) => (
        <div
          key={capital}
          onClick={() => viewDetails({ capital, countryCode })}
        >
          <CityTitle title={capital} />
        </div>
      ))}
      <NavLink
        title="add new city"
        className="color-light"
        to={AppRoute.SEARCH}
      >
        <Add />
      </NavLink>
    </div>
  );
};

export default Home;
