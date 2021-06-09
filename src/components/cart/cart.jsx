
import { connect } from "react-redux";
import { getPromoPrices, getSelectedCartGuitars, getSelectedTotalPrices } from "../../store/selectors";
import CartItem from "../cart-item/cart-item";
import { setPromo } from "../../store/action";
import { useEffect, useState } from "react";
import { Promocodes } from "../../consts";
import { withRouter } from "react-router";
import { paths } from "../../consts";

const Cart = ({ selectedGuitars, totalPrice, setPromo, promoPrice, history }) => {


  useEffect(() => {
    if (!selectedGuitars.length) {
      history.push(paths.main);
    }
  }, [selectedGuitars]);


  const [promoValue, setPromoValue] = useState(``);
  const [promoError, setPromoError] = useState(false);


  const handlePromo = (evt) => {
    let promo = evt.target.value;
    setPromoValue(promo);
  };

  const handleCheckPromoBtn = (evt) => {
    evt.preventDefault();

    for (let promos in Promocodes) {
      if (Promocodes[promos] !== promoValue) {
        setPromoError(true);
        return;
      }
      if (Promocodes[promos] === promoValue) {
        setPromo(promoValue);
        setPromoError(false);
        return;
      }
    }
  };

  return (
    <section className="cart">
      <ul className="cart__list">
        {selectedGuitars.map((guitar) => {
          return (
            <CartItem key={guitar.id} guitar={guitar} />
          );
        })}
      </ul>
      <div className="cart__promo">
        <p className="cart__promo-title">Промокод на скидку</p>
        <label for="promo" className="cart__promo-label">
          <p className="cart__promo-info">Введите свой промокод, если он у вас есть.</p>
          <input id="promo" className="cart__promo-input" onChange={handlePromo}></input>
        </label>
        <button className="cart__promo-btn" onClick={handleCheckPromoBtn}>{promoError ? `Не верный купон` : `Применить купон`}</button>
      </div>
      <div className="cart__total">
        <p className="cart__total-count">Всего: {promoPrice ? promoPrice : totalPrice} ₽</p>
        <button className="cart__total-btn" >Оформить заказ</button>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  selectedGuitars: getSelectedCartGuitars(state),
  totalPrice: getSelectedTotalPrices(state),
  promoPrice: getPromoPrices(state)
});


export default connect(mapStateToProps, { setPromo })(withRouter(Cart));
