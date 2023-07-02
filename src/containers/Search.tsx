import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { CapitalInfo } from "../types/types";
import { AssetPath } from "../types/enums";
import { RootState } from "../store";

const Search = () => {
  const savedCities = useSelector((state: RootState) => state.cities);
  const [allCities, setAllCities] = useState<CapitalInfo[]>([]);
  const [citiesToShow, setCitiesToShow] = useState<CapitalInfo[]>([]);
  const [query, setQuery] = useState("");

  const savedCityNames = useMemo(
    () => savedCities.map(({ capital }) => capital),
    [savedCities]
  );
  const availableCities = useMemo(
    () => allCities.filter(({ capital }) => !savedCityNames.includes(capital)),
    [savedCityNames, allCities]
  );

  useEffect(() => {
    if (query) {
      setCitiesToShow(
        availableCities
          .filter(({ capital }) =>
            capital.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
          .slice(0, 8)
      );
    } else {
      setCitiesToShow([]);
    }
  }, [availableCities, query]);

  useEffect(() => {
    fetch(AssetPath.CAPITAL_DATA)
      .then((res) => res.json())
      .then((res: CapitalInfo[]) => {
        console.log(res);
        setAllCities(res);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        id="search"
        placeholder="Search for capitals!"
      />
      {citiesToShow.map((it) => (
        <div key={it.capital}>{it.capital}</div>
      ))}
    </div>
  );
};

export default Search;
