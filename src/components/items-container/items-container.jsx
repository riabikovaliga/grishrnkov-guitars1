import Item from "../item/item";
import {connect} from "react-redux";
import {getGuitarsWithPriceSort} from "../../store/selectors";
import {useState} from "react";
import Pagination from "../pagination/pagination";
import {maxGuitarsOnPage} from "../../consts";


const ItemsContainer = ({guitarsList}) => {


  const itemsPages = Math.ceil(guitarsList.length / maxGuitarsOnPage);
  const pages = [];
  for (let page = 1; page < itemsPages + 1; page++) {
    pages.push(page);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [guitarsPerPage] = useState(maxGuitarsOnPage);
  const lastGuitarIndex = currentPage * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;
  const currentGuitar = guitarsList.slice(firstGuitarIndex, lastGuitarIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = (evt) => {
    evt.preventDefault();
    setCurrentPage((prev) => prev + 1);
  };


  return (
    <div className="items">
      {currentGuitar.map((guitar) => {
        return (
          <Item key={guitar.id} guitar={guitar} id={guitar.id} />
        );
      })}

      <Pagination guitarsPerPage={guitarsPerPage} totalGuitars={guitarsList.length} paginate={paginate} currentPage={currentPage} />
      <button className="items__page-next" onClick={nextPage} disabled={currentPage === pages.length ? true : false}>Далее</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  guitarsList: getGuitarsWithPriceSort(state),
});

export default connect(mapStateToProps)(ItemsContainer);
