import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { NavLink } from "react-router-dom";
import { AppRoute } from "../types/enums";

const Home = () => {
  const count = useSelector((state: RootState) => state.cities);
  const dispatch = useDispatch();

  return (
    <div>
      Home
      <NavLink to={AppRoute.SEARCH}>+</NavLink>
    </div>
  );
};

export default Home;
