const Pagination = ({guitarsPerPage, totalGuitars, paginate, currentPage}) => {


  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGuitars / guitarsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          pageNumbers.map((number) => {
            return (
              <li className="pagination__item" key={number}>
                <a className={currentPage === number ? `items__page items__page--active` : `items__page`} key={number} href={`!#`} onClick={(evt) => {
                  evt.preventDefault(); paginate(number);
                }}>{number}</a >
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Pagination;
