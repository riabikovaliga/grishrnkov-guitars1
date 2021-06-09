import {withRouter} from "react-router";
import {paths} from "../../consts";

const BreadCrumbs = ({location, history}) => {

  const handleMainLink = (evt) => {
    evt.preventDefault();
    history.push(paths.main);
  };

  const handleCartLink = (evt) => {
    evt.preventDefault();
    history.push(paths.cart);
  };


  return (
    <div className="crumbs">
      <h1 className="crumbs__title">{location.pathname === paths.main ? `Корзина` : `Каталог гитар`}</h1>
      <ul className="crumbs__list">
        <li className="crumbs__item"><a href={`!#`} className="crumbs__item-link" onClick={handleMainLink}>Главная</a></li>
        <li className="crumbs__item"><a href={`!#`} className="crumbs__item-link" onClick={handleCartLink}>Каталог</a></li>
        {location.pathname === paths.cart && <li className="crumbs__item"><a href={`!#`} className="crumbs__item-link">Оформляем</a></li>}
      </ul>
    </div >
  );
};

export default withRouter(BreadCrumbs);
