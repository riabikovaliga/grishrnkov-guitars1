import {createSelector} from "reselect";
import {Promocodes} from "../consts";

export const getPromo = (state) => {
  return state.promo;
};

export const getGuitars = (state) => {
  return state.mutatedData;
};

export const getMinPrice = (state) => {
  return +state.minPrice;
};

export const getMaxPrice = (state) => {
  return +state.maxPrice;
};

export const getGuitarType = (state) => {
  return state.types;
};

export const getGuitarString = (state) => {
  return state.strings;
};

export const getActualSorting = (state) => {
  return state.actualSort;
};

export const getStringsStatus = (state) => {
  return state.clickedStringFilter;
};

export const getClickedGuitrID = (state) => {
  return state.clickedGuitarID;
};

export const getInitialGuitars = (state) => {
  return state.initialData;
};

export const getSelectedPrices = (state) => {
  return [...state.totalPrices];
};

export const getActualSortingWay = (state) => {
  return state.actualSortWay;
};

export const getSelectedGuiatars = (state) => {
  return state.selectedGuitarsID;
};

export const getGuitarTypeValues = createSelector(getGuitarType, (types) => {
  const typesValues = types.reduce((acc, item) => {
    if (item.status) {
      acc.push(item.name);
    }
    return acc;
  }, []);
  return typesValues;
});

export const getGuitarStringsValues = createSelector(
    getGuitarString,
    (strings) => {
      const stringsValues = strings.reduce((acc, item) => {
        if (item.status) {
          acc.push(item.name);
        }
        return acc;
      }, []);
      return stringsValues;
    }
);

export const getMostExpensiveGuitar = createSelector(getGuitars, (guitars) => {
  let max = guitars.reduce((accum, current) => {
    accum.push(+current.price);
    return accum;
  }, []);
  return Math.max.apply(null, max);
});

export const getCorrectMaxPrice = createSelector(
    getMaxPrice,
    getMostExpensiveGuitar,
    (maxPrice, mostExpensiveGuitar) => {
      if (!maxPrice) {
        return mostExpensiveGuitar;
      }
      return maxPrice;
    }
);

export const getGuitarsWithCorrectPrice = createSelector(
    getGuitars,
    getCorrectMaxPrice,
    getMinPrice,
    (allGuitars, maxPrice, minPrice) => {
      return allGuitars.filter((guitar) => {
        return guitar.price >= minPrice && guitar.price <= maxPrice;
      });
    }
);

export const getGuitarsWithCorrectType = createSelector(
    getGuitarTypeValues,
    getGuitarsWithCorrectPrice,
    (types, guitarsWithCorrectPrices) => {
      if (types.length === 0) {
        return guitarsWithCorrectPrices;
      }
      return guitarsWithCorrectPrices.reduce((acc, guitar) => {
        if (types.includes(guitar.type)) {
          acc.push(guitar);
        }
        return acc;
      }, []);
    }
);

export const getGuitarsWithCorrectStrings = createSelector(
    getGuitarStringsValues,
    getGuitarsWithCorrectType,
    getGuitars,
    getGuitarTypeValues,
    getMinPrice,
    getMaxPrice,
    (strings, guitarsWithCorrectTypes, allGuitars, types, minPrice, maxPrice) => {
      if (
        strings.length === 0 &&
      types.length === 0 &&
      minPrice === 0 &&
      maxPrice === 0
      ) {
        return allGuitars;
      }
      if (strings.length === 0) {
        return guitarsWithCorrectTypes;
      } else {
        return guitarsWithCorrectTypes.reduce((acc, guitar) => {
          if (strings.includes(guitar.strings)) {
            acc.push(guitar);
          }
          return acc;
        }, []);
      }
    }
);

export const getGuitarsWithPriceSort = createSelector(
    getGuitarsWithCorrectStrings,
    getActualSorting,
    getActualSortingWay,
    (filtredGuitars, actualSort, sortingWay) => {
      if (actualSort === `byPrice`) {
        if (sortingWay === `lowToHigh`) {
          return filtredGuitars.slice().sort((a, b) => {
            return +a.price - +b.price;
          });
        }
        if (sortingWay === `highToLow`) {
          return filtredGuitars.slice().sort((a, b) => {
            return +b.price - +a.price;
          });
        }
      }
      if (actualSort === `byPopular`) {
        if (sortingWay === `lowToHigh`) {
          return filtredGuitars.slice().sort((a, b) => {
            return +a.popular - +b.popular;
          });
        }
        if (sortingWay === `highToLow`) {
          return filtredGuitars.slice().sort((a, b) => {
            return +b.popular - +a.popular;
          });
        }
      }
      return filtredGuitars;
    }
);

export const getSelectedCartGuitars = createSelector(
    getInitialGuitars,
    getSelectedGuiatars,
    (allInitialGuitars, selectedIDs) => {
      return allInitialGuitars.slice().reduce((acc, item) => {
        if (selectedIDs.includes(+item.id)) {
          acc.push(item);
        }
        return acc;
      }, []);
    }
);

export const getSelectedTotalPrices = createSelector(
    getSelectedPrices,
    (prices) => {
      return prices.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
    }
);

export const getActiveFilters = createSelector(
    getGuitarsWithPriceSort,
    getStringsStatus,
    (actualGuitars, status) => {
      return actualGuitars.reduce(
          (blocked, item) => {
            if (!status) {
              if (item.strings === `4`) {
                blocked.four = false;
              }
              if (item.strings === `6`) {
                blocked.six = false;
              }
              if (item.strings === `7`) {
                blocked.seven = false;
              }
              if (item.strings === `12`) {
                blocked.twelve = false;
              }
              return blocked;
            }
            if (status) {
              return {
                four: false,
                six: false,
                seven: false,
                twelve: false,
              };
            }
            return {
              four: false,
              six: false,
              seven: false,
              twelve: false,
            };
          },
          {
            four: true,
            six: true,
            seven: true,
            twelve: true,
          }
      );
    }
);

export const getPromoPrices = createSelector(
    getSelectedTotalPrices,
    getPromo,
    (price, promo) => {
      if (promo === Promocodes.hit) {
        let discount = price * 0.1;
        return price - discount;
      }
      if (promo === Promocodes.super) {
        return price - 700;
      }
      if (promo === Promocodes.year) {
        let part = price * 0.3;
        if (part >= 3500) {
          return price - 3500;
        } else {
          return price;
        }
      }
      return price;
    }
);

export const getClickedGuitar = createSelector(
    getGuitars,
    getClickedGuitrID,
    (guitars, id) => {
      return guitars.find((item) => item.id === id);
    }
);
