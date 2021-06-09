import miniElectro from "../../img/electro-mini.png";
import miniAcu from "../../img/acu-mini.png";
import miniUcu from "../../img/ucu-mini.png";
import {useEffect, useState} from "react";
import {setTotalPrices, showPopup, changePopupStatus, clickedGuitar} from "../../store/action";
import {connect} from "react-redux";
import {guitarTypes} from "../../consts";

const CartItem = ({guitar, setTotalPrices, showPopup, changePopupStatus, clickedGuitar}) => {

  const [count, setCount] = useState(1);

  const onDisCount = (evt) => {
    evt.preventDefault();
    if (count > 1) {
      setCount(count - 1);
      setTotalPrices({id: +guitar.id, price: +guitar.price * (count - 1)});
    }
  };

  const onIncCount = (evt) => {
    evt.preventDefault();
    setCount(count + 1);
    setTotalPrices({id: +guitar.id, price: +guitar.price * (count + 1)});
  };


  useEffect(() => {
    if (count === 1) {
      setTotalPrices({id: +guitar.id, price: +guitar.price * (count)});
    }
  }, []);

  const handleClose = (evt) => {
    evt.preventDefault();
    clickedGuitar(guitar.id);
    changePopupStatus(`removing`);
    showPopup(true);
  };


  return (
    <li className="cart__item">
      <a className="cart__item-close" onClick={handleClose} href="!#">close</a>
      <img className="cart__item-img" alt="name" width="48px" height="124px" src={guitar.type === guitarTypes.electro && miniElectro || guitar.type === guitarTypes.ucu && miniUcu || guitar.type === guitarTypes.acu && miniAcu} />
      <div className="cart__item-info">
        <p className="cart__item-info-name">{guitar.name}</p>
        <p className="cart__item-info-articul">Артикул: {guitar.art}</p>
        <p className="cart__item-info-about">{guitar.type}, {guitar.strings} струнная</p>
      </div>
      <div className="cart__item-price">
        <p className="cart__item-price-total">{guitar.price} ₽</p>
      </div>
      <div className="cart__item-count">
        <ul className="cart__item-count-list">
          <li className="cart__item-count-list-item cart__item-count-list-item--dis">
            <a className="cart__item-count-list-item-link cart__item-count-list-item-link--dis" href="!#" onClick={onDisCount}>-</a>
          </li>
          <li className="cart__item-count-list-item cart__item-count-list-item--total">
            <span className="cart__item-count-list-item-link-total-count">{count}</span>
          </li>
          <li className="cart__item-count-list-item cart__item-count-list-item--inc">
            <a className="cart__item-count-list-item-link cart__item-count-list-item-link--inc" href="!#" onClick={onIncCount}>+</a>
          </li>
        </ul>
      </div>
      <div className="cart__item-total-price">
        <p className="cart__item-total-price-number">{count * +guitar.price} ₽</p>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => ({
  totalPrices: state.totalPrices
});

export default connect(mapStateToProps, {setTotalPrices, showPopup, changePopupStatus, clickedGuitar})(CartItem);
