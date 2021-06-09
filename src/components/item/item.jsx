
import maxElectro from "../../img/electro-max.png";
import maxAcu from "../../img/acu-max.png";
import maxUcu from "../../img/ucu-max.png";
import { connect } from "react-redux";
import { showPopup, clickedGuitar } from "../../store/action";
import { guitarTypes } from "../../consts";
import StarRating from "../star-rating/star-rating";

const Item = ({ guitar, id, showPopup, clickedGuitar }) => {

  const handleBuy = (evt) => {
    evt.preventDefault();
    clickedGuitar(id);
    showPopup(true);
    document.querySelector(`body`).style.overflow = `hidden`;
  };

  return (
    <div className="item">
      <div className="item__pic">
        <img src={guitar.type === guitarTypes.electro && maxElectro || guitar.type === guitarTypes.ucu && maxUcu || guitar.type === guitarTypes.acu && maxAcu} alt="text" width="68px" height="190px" className="item__pic-img" />
      </div>
      <div className="item__rating">
        <ul className="item__rating-list">
          <StarRating />
        </ul>
        <span className="item__rating-count">{guitar.popular}</span>
      </div>
      <div className="item__rating-wrapper">
        <div className="item__name">
          <p className="item__name-text">{guitar.name}</p>
        </div>
        <div className="item__price">
          <p className="item__price-text">{guitar.price} ₽</p>
        </div>
      </div>
      <button className="item__about" >Подробнее</button>
      <button className="item__buy" onClick={handleBuy}>Купить</button>
    </div>
  );
};

export default connect(null, { clickedGuitar, showPopup })(Item);
