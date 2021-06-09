import Header from "../header/header";
import Footer from "../footer/footer";
import Guitar from "../guitar/guitar";
import BreadCrumbs from "../bread-crumbs/bread-crumbs";
import FilterSortContainer from "../filter-sort-container/filter-sort-container";
import Popup from "../popup/popup";
import {withRouter} from "react-router";
import {paths} from "../../consts";

const CommonInner = ({location}) => {

  return (
    <div className={location.pathname === paths.cart ? `common-inner common-inner--cart` : `common-inner`}>
      <Header />
      <Guitar />
      <BreadCrumbs />
      <FilterSortContainer />
      <Footer />
      <Popup />
    </div>
  );
};

export default withRouter(CommonInner);
