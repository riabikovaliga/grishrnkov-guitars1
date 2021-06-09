import {createRef, useEffect, useState} from "react";
import {connect} from "react-redux";
import {setMinPrice, setMaxPrice, setTypeGuitar, setStringGuitar} from "../../store/action";
import {getActiveFilters} from "../../store/selectors";
import {guitarTypes} from "../../consts";

const Filter = ({setMinPrice, setMaxPrice, setTypeGuitar, setStringGuitar, minPrice, maxPrice, blockedStrings}) => {

  const [minPriceValue, setMinPriceValue] = useState(false);
  const handleMinPrice = (evt) => {
    setMinPriceValue(evt.target.value);
    setMinPrice(evt.target.value);
  };

  const [maxPriceValue, setMaxPriceValue] = useState(false);
  const handleMaxPrice = (evt) => {
    setMaxPriceValue(evt.target.value);
    setMaxPrice(evt.target.value);
  };

  const [acoustic, setAcoustic] = useState(false);
  const [electro, setElectro] = useState(false);
  const [ucu, setUcu] = useState(false);
  const handleType = (evt) => {
    let type = evt.target.dataset.name;

    if (type === guitarTypes.acu && !acoustic) {
      setAcoustic(true);
      setTypeGuitar({name: type, status: true});
    } else if (type === guitarTypes.acu && acoustic) {
      setAcoustic(false);
      setTypeGuitar({name: type, status: false});
    }
    if (type === guitarTypes.electro && !electro) {
      setElectro(true);
      setTypeGuitar({name: type, status: true});
    } else if (type === guitarTypes.electro && electro) {
      setElectro(false);
      setTypeGuitar({name: type, status: false});
    }
    if (type === guitarTypes.ucu && !ucu) {
      setUcu(true);
      setTypeGuitar({name: type, status: true});
    } else if (type === guitarTypes.ucu && ucu) {
      setUcu(false);
      setTypeGuitar({name: type, status: false});
    }
  };

  const [string4, setString4] = useState(false);
  const [string6, setString6] = useState(false);
  const [string7, setString7] = useState(false);
  const [string12, setString12] = useState(false);


  const handleStrings = (evt) => {
    let selectedString = evt.target.dataset.name;

    if (selectedString === guitarTypes.four && !string4) {
      setString4(true);
      setStringGuitar({name: selectedString, status: true});
    } else if (selectedString === guitarTypes.four && string4) {
      setString4(false);
      setStringGuitar({name: selectedString, status: false});
    }
    if (selectedString === guitarTypes.six && !string6) {
      setString6(true);
      setStringGuitar({name: selectedString, status: true});
    } else if (selectedString === guitarTypes.six && string6) {
      setString6(false);
      setStringGuitar({name: selectedString, status: false});
    }
    if (selectedString === guitarTypes.seven && !string7) {
      setString7(true);
      setStringGuitar({name: selectedString, status: true});
    } else if (selectedString === guitarTypes.seven && string7) {
      setString7(false);
      setStringGuitar({name: selectedString, status: false});
    }
    if (selectedString === guitarTypes.twelve && !string12) {
      setString12(true);
      setStringGuitar({name: selectedString, status: true});
    } else if (selectedString === guitarTypes.twelve && string12) {
      setString12(false);
      setStringGuitar({name: selectedString, status: false});
    }
  };


  const maxPriceRef = createRef();
  const minPriceRef = createRef();
  const [maxOnFocus, setMaxOnFocus] = useState(false);
  const [minOnFocus, setMinOnFocus] = useState(false);


  useEffect(() => {
    maxPriceRef.current.onfocus = function () {
      setMinOnFocus(false);
      setMaxOnFocus(true);
    };
    maxPriceRef.current.onblur = function () {
      setMaxOnFocus(false);
    };

    minPriceRef.current.onfocus = function () {
      setMaxOnFocus(false);
      setMinOnFocus(true);
    };
    minPriceRef.current.onblur = function () {
      setMinOnFocus(false);
    };
  });


  if (minPrice !== 0 && maxPrice !== 0) {
    if (+minPriceValue > +maxPriceValue && maxPriceValue !== false && minOnFocus) {
      setMinPrice(maxPriceValue);
      setMaxPrice(minPriceValue);
    }
  }


  if (maxPrice !== 0 && minPrice !== 0) {
    if (+maxPriceValue < +minPriceValue && maxPriceValue !== false && !maxOnFocus) {
      setMaxPrice(minPriceValue);
      setMinPrice(maxPriceValue);
    }
  }

  return (
    <div className="filter">
      <p className="filter__name">Фильтр</p>
      <form className="filter__from">
        <div className="filter__price">
          <p className="filter__price-name">Цена, ₽</p>
          <div className="filter__price-inner">
            <input className="filter__price-from" placeholder="" type="number" onChange={handleMinPrice}
              ref={minPriceRef}
              value={minPrice <= 0 ? `` : minPrice}
              min="0"
            />
            <input ref={maxPriceRef} className="filter__price-to" placeholder="" type="number" onChange={handleMaxPrice}
              value={maxPrice <= 0 ? `` : maxPrice}
              min="0"
            />
          </div>
        </div>
        <div className="filter__type">
          <p className="filter__type-name">Тип гитар</p>
          <label htmlFor="acoustic" className="filter__type-label">
            <input id="acoustic" className="filter__type-input" data-name="Акустическая гитара" type="checkbox" onChange={handleType} />
            <span className="filter__type-checkbox"></span>
                        Акустические гитары
          </label>
          <label htmlFor="electro" className="filter__type-label">
            <input id="electro" className="filter__type-input" data-name="Электрогитара" type="checkbox" onChange={handleType} />
            <span className="filter__type-checkbox"></span>
                        Электрогитары
          </label>
          <label htmlFor="ukulele" className="filter__type-label">
            <input id="ukulele" className="filter__type-input" data-name="Укулеле" type="checkbox" onChange={handleType} />
            <span className="filter__type-checkbox"></span>
                        Укулеле
          </label>
        </div>
        <div className="filter__string">
          <p className="filter__string-name">Количество струн</p>
          <label htmlFor="four" className="filter__string-label">
            <input id="four" className="filter__string-input" data-name="4" type="checkbox" onChange={handleStrings} disabled={blockedStrings.four} />
            <span className="filter__string-checkbox"></span>
            <span className={blockedStrings.four ? `filter__string-num-disabled` : `filter__string-num`}>4</span>
          </label>
          <label htmlFor="six" className="filter__string-label">
            <input id="six" className="filter__string-input" data-name="6" type="checkbox" onChange={handleStrings} disabled={blockedStrings.six} />
            <span className="filter__string-checkbox"></span>
            <span className={blockedStrings.six ? `filter__string-num-disabled` : `filter__string-num`}>6</span>
          </label>
          <label htmlFor="seven" className="filter__string-label">
            <input id="seven" className="filter__string-input" data-name="7" type="checkbox" onChange={handleStrings} disabled={blockedStrings.seven} />
            <span className="filter__string-checkbox"></span>
            <span className={blockedStrings.seven ? `filter__string-num-disabled` : `filter__string-num`}>7</span>
          </label>
          <label htmlFor="twelve" className="filter__string-label">
            <input id="twelve" className="filter__string-input" data-name="12" type="checkbox" onChange={handleStrings} disabled={blockedStrings.twelve} />
            <span className="filter__string-checkbox"></span>
            <span className={blockedStrings.twelve ? `filter__string-num-disabled` : `filter__string-num`}>12</span>
          </label>
        </div>
      </form>

    </div >
  );
};

const mapStateToProps = (state) => ({
  minPrice: state.minPrice,
  maxPrice: state.maxPrice,
  blockedStrings: getActiveFilters(state)
});

export default connect(mapStateToProps, {setMinPrice, setMaxPrice, setTypeGuitar, setStringGuitar})(Filter);
