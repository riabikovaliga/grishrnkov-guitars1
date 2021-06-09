import {connect} from "react-redux";
import {setSelectedGuitarID, showPopup, changePopupStatus, deleteCortItem} from "../../store/action";
import {getClickedGuitar} from "../../store/selectors";
import miniElectro from "../../img/electro-mini.png";
import miniAcu from "../../img/acu-mini.png";
import miniUcu from "../../img/ucu-mini.png";
import {withRouter} from "react-router";
import {commonButtons, guitarTypes} from "../../consts";
import {useEffect} from "react";
import {paths} from "../../consts";

const Popup = ({isPopup, setSelectedGuitarID, showPopup, clickedGuitarID, guitar, popupStatus, changePopupStatus, history, deleteCortItem}) => {

  const handleClosePopup = (evt) => {
    evt.preventDefault();
    showPopup(false);
    document.querySelector(`body`).style.overflow = `auto`;
    changePopupStatus(`start`);
  };

  const handleAddToCart = (evt) => {
    if (popupStatus === `start`) {
      changePopupStatus(`adding`);
    }
    evt.preventDefault();
    setSelectedGuitarID(clickedGuitarID);
    document.querySelector(`body`).style.overflow = `auto`;
  };

  const handleGoToCart = () => {
    history.push(paths.cart);
    showPopup(false);
    changePopupStatus(`start`);
  };

  const handleContinueShopping = () => {
    showPopup(false);
    changePopupStatus(`start`);
  };

  const handleRemoveGuitar = () => {
    deleteCortItem(guitar.id);
    showPopup(false);
    changePopupStatus(`start`);

  };


  useEffect(() => {
    document.addEventListener(commonButtons.keydown, handleDocument);
    return () => {
      document.removeEventListener(commonButtons.keydown, handleDocument);
    };
  }, []);

  const handleClose = () => {
    showPopup(false);
    document.querySelector(`body`).style.overflow = `auto`;
  };

  const handleDocument = (evt) => {
    if (evt.key === commonButtons.escape) {
      handleClose();
      document.querySelector(`body`).style.overflow = `auto`;
    }

  };

  const mainInfo = () => {
    return (
      <div className="popup__bottom">
        <img className="popup__bottom-img" src={guitar.type === guitarTypes.electro && miniElectro || guitar.type === guitarTypes.ucu && miniUcu || guitar.type === guitarTypes.acu && miniAcu} alt="name" width="56px" height="128px" />
        <div className="popup__bottom-info">
          <p className="popup__bottom-info-name">{guitar.name}</p>
          <p className="popup__bottom-info-articul">Артикул: {guitar.art}</p>
          <p className="popup__bottom-info-about">Электрогитара, {guitar.strings} струнная</p>
          <p className="popup__bottom-info-price">Цена: <span className="popup__bottom-info-price-count"> {guitar.price}</span>₽</p>
        </div>
        {popupStatus === `start` && <button className="popup__btn" onClick={handleAddToCart}>Добавить в корзину</button>}
        {popupStatus === `removing` && <button className="popup__btn" onClick={handleRemoveGuitar}>Удалить товар</button>}
        {popupStatus === `removing` && <button className="popup__btn popup__btn--removing" onClick={handleContinueShopping}>Продолжить покупки</button>}

      </div>
    );
  };


  if (guitar !== undefined) {
    return (
      <div className={!isPopup ? `popup` : `popup popup--active`} onClick={handleClose}>


        <div className={popupStatus === `adding` ? `popup-adding` : `hhh` || popupStatus === `removing` ? `popup-removing` : `kkk`}>
          <div className={popupStatus === `start` && `popup__inner` || popupStatus === `adding` && `popup__inner popup__inner--adding` || popupStatus === `removing` && `popup__inner popup__inner--removing`} onClick={(evt) => {
            evt.stopPropagation();
          }}>
            <div className="popup__top">
              <p className="popup__top-title"> {popupStatus === `adding` && `Товар успешно добавлен в корзину` || popupStatus === `start` && `Добавить товар в корзину` || popupStatus === `removing` && `Удалить этот товар? `}</p>
              <a href="!/" className="popup__top-close" onClick={handleClosePopup}>close</a>
            </div>
            {popupStatus === `start` && mainInfo() || popupStatus === `removing` && mainInfo()}
            {popupStatus === `adding` &&
                            <div className="popup__bottom">
                              <button className="popup__btn" onClick={handleGoToCart}>Перейти в корзину</button>
                              <button className="popup__btn popup__btn--adding" onClick={handleContinueShopping}>Продолжить покупки</button>
                            </div>
            }
          </div>
        </div>
      </div>
    );
  } else {
    return true;
  }

};

const mapStateToProps = (state) => ({
  isPopup: state.isPopup,
  clickedGuitarID: state.clickedGuitarID,
  guitar: getClickedGuitar(state),
  popupStatus: state.popupStatus
});

export default connect(mapStateToProps, {setSelectedGuitarID, showPopup, changePopupStatus, deleteCortItem})(withRouter(Popup));
