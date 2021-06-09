import {withRouter} from "react-router";
import Filter from "../filter/filter";
import ItemsContainer from "../items-container/items-container";
import Sorting from "../sorting/sorting";
import Cart from "../cart/cart";
import {paths} from "../../consts";

const FilterSortContainer = ({location}) => {

  if (location.pathname === paths.cart) {
    return (
      <div className="filterSortContainer">
        <Cart />
      </div>
    );
  } else {
    return (
      <div className="filterSortContainer">
        <Filter />
        <Sorting />
        <ItemsContainer />
      </div>
    );
  }

};

export default withRouter(FilterSortContainer);
