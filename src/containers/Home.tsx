import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { RootState } from "../store";
import { AppRoute } from "../types/enums";

const Home = () => {
  const cities = useSelector((state: RootState) => state.cities);

  const sorted = useMemo(
    () => [...cities].sort((a, b) => a.capital.localeCompare(b.capital)),
    [cities]
  );

  return (
    <div>
      {sorted.length > 0 ? (
        <ul>
          {sorted.map(({ capital, countryCode }) => (
            <li key={capital}>{capital}</li>
          ))}
        </ul>
      ) : null}
      <NavLink to={AppRoute.SEARCH}>+</NavLink>
    </div>
  );
};

export default Home;
