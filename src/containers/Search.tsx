import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { CapitalInfo } from "../types/types";
import { AppRoute, AssetPath } from "../types/enums";
import { RootState, addCity } from "../store";
import { Back, Input, Result } from "../components";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCities = useSelector((state: RootState) => state.cities);
  const [allCities, setAllCities] = useState<CapitalInfo[]>([]);
  const [citiesToShow, setCitiesToShow] = useState<CapitalInfo[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CapitalInfo>();

  const savedCityNames = useMemo(
    () => savedCities.map(({ capital }) => capital),
    [savedCities]
  );
  const availableCities = useMemo(
    () => allCities.filter(({ capital }) => !savedCityNames.includes(capital)),
    [savedCityNames, allCities]
  );

  useEffect(() => {
    setSelected(undefined);

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
        setAllCities(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const onSave = useCallback(() => {
    if (selected) {
      dispatch(addCity(selected));
      navigate(AppRoute.HOME);
    }
  }, [selected, navigate, dispatch]);

  return (
    <div>
      <Back />
      <Input
        value={query}
        setValue={setQuery}
        id="search"
        placeholder="Search for capitals!"
      />
      {citiesToShow.length > 0
        ? citiesToShow.map((it) => (
            <div key={it.capital}>
              <input
                checked={selected?.capital === it.capital}
                onChange={() => setSelected(it)}
                type="radio"
                id={it.capital}
                name="selectedCapital"
                hidden
              />
              <label htmlFor={it.capital}>
                <Result query={query.toLocaleLowerCase()} text={it.capital} />
              </label>
            </div>
          ))
        : null}
      {selected ? <button onClick={onSave}>Save</button> : null}
    </div>
  );
};

export default Search;
