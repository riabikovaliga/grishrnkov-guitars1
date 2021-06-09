import {useState} from "react";
import {connect} from "react-redux";
import {setActualSort, setActualSortWay} from "../../store/action";

const Sorting = ({setActualSort, setActualSortWay}) => {

  const [sortPrice, setSortPrice] = useState(true);
  const handleSortPrice = (evt) => {
    evt.preventDefault();
    let actualSort = evt.target.dataset.name;
    setSortPopular(false);
    setSortPrice(true);
    setActualSort(actualSort);
  };

  const [sortPopular, setSortPopular] = useState(false);
  const handleSortPopular = (evt) => {
    evt.preventDefault();
    let actualSort = evt.target.dataset.name;
    setSortPrice(false);
    setSortPopular(true);
    setActualSort(actualSort);
  };


  const [lowToHigh, setLowToHigh] = useState(false);
  const [highToLow, setHighToLow] = useState(false);

  const handleHighToLow = (evt) => {
    evt.preventDefault();
    let correctSort = evt.target.dataset.name;
    setHighToLow(true);
    setLowToHigh(false);
    setActualSortWay(correctSort);
  };
  const handleLowToHigh = (evt) => {
    evt.preventDefault();
    let correctSort = evt.target.dataset.name;
    setLowToHigh(true);
    setHighToLow(false);
    setActualSortWay(correctSort);
  };


  return (
    <div className="sorting">
      <p className="sorting__title">Сортировать:</p>
      <ul className="sorting__list">
        <li className="sorting__item sorting__item--price">
          <a className={sortPrice ? `sorting__item-link-price sorting__item-link-price--active` : `sorting__item-link-price `} href="!#" onClick={handleSortPrice} data-name={`byPrice`}>
                        по цене
          </a>
        </li>
        <li className="sorting__item sorting__item--popular">
          <a className={sortPopular ? `sorting__item-link-popular sorting__item-link-popular--active` : `sorting__item-link-price`} href="!#" onClick={handleSortPopular} data-name={`byPopular`}>
                        по популярности
          </a>
        </li>
        <li className="sorting__item sorting__item--price-up">
          <a className={!lowToHigh ? `sorting__item-link-up` : `sorting__item-link-up sorting__item-link-up--active`} href="!#" data-name={`lowToHigh`} onClick={handleLowToHigh}>
          </a>
        </li>
        <li className="sorting__item sorting__item--price-down">
          <a className={!highToLow ? `sorting__item-link-down` : `sorting__item-link-down sorting__item-link-down--active`} href="!#" data-name={`highToLow`} onClick={handleHighToLow}>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default connect(null, {setActualSort, setActualSortWay})(Sorting);
