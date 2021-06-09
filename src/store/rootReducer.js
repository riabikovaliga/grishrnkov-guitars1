import {ActionType} from "./action";
import data from "../mocks/data.json";
import {guitarTypes} from "../consts";

const initialState = {
  initialData: [...data],
  mutatedData: [...data],
  minPrice: ``,
  maxPrice: ``,
  types: [
    {name: guitarTypes.acu, status: false},
    {name: guitarTypes.electro, status: false},
    {name: guitarTypes.ucu, status: false},
  ],
  strings: [
    {name: guitarTypes.four, status: false},
    {name: guitarTypes.six, status: false},
    {name: guitarTypes.seven, status: false},
    {name: guitarTypes.twelve, status: false},
  ],
  actualSort: `byPrice`,
  actualSortWay: ``,
  selectedGuitarsID: [],
  totalPrices: [],
  clickedStringFilter: false,
  promo: ``,
  isPopup: false,
  clickedGuitarID: null,
  popupStatus: `start`,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MIN_PRICE:
      return {...state, minPrice: action.payload};
    case ActionType.SET_MAX_PRICE:
      return {...state, maxPrice: action.payload};
    case ActionType.SET_GUITAR_TYPE:
      return {
        ...state,
        clickedStringFilter: false,
        types: state.types.map((item) => {
          if (item.name === action.payload.name) {
            return Object.assign({}, item, action.payload);
          }
          return item;
        }),
      };
    case ActionType.SET_GUITAR_STRING:
      return {
        ...state,
        clickedStringFilter: true,
        strings: state.strings.map((item) => {
          if (item.name === action.payload.name) {
            return Object.assign({}, item, action.payload);
          }
          return item;
        }),
      };
    case ActionType.SET_ACTUAL_SORT:
      return {...state, actualSort: action.payload};
    case ActionType.SET_ACTUAL_SORT_WAY:
      return {...state, actualSortWay: action.payload};
    case ActionType.SET_SELECTED_GUITAR_ID:
      return Object.assign({}, state, {
        selectedGuitarsID: [
          ...new Set([...state.selectedGuitarsID, ...[+action.payload]]),
        ],
      });
    case ActionType.SET_TOTAL_PRICES:
      let newPriceID = action.payload.id;
      if (state.totalPrices.length > 0) {
        let exact = state.totalPrices.find((item) => {
          return item.id === newPriceID;
        });
        if (exact) {
          let corIndex = state.totalPrices.indexOf(exact);
          if (corIndex >= 0) {
            state.totalPrices.splice(corIndex, 1);
            return Object.assign({}, state, {
              totalPrices: [...state.totalPrices, ...[action.payload]],
            });
          }
        }
      }
      return Object.assign({}, state, {
        totalPrices: [...state.totalPrices, ...[action.payload]],
      });
    case ActionType.DELETE_CORT_ITEM:
      let removedItemID = action.payload;
      let exact = state.selectedGuitarsID.find((item) => {
        return item === +removedItemID;
      });
      let corIndex = state.selectedGuitarsID.indexOf(exact);
      state.selectedGuitarsID.splice(corIndex, 1);
      const exactPrice = state.totalPrices.find((item) => {
        return item.id === exact;
      });
      let corIndex2 = state.totalPrices.indexOf(exactPrice);
      state.totalPrices.splice(corIndex2, 1);
      return Object.assign({}, state, {
        selectedGuitarsID: [...state.selectedGuitarsID],
      });
    case ActionType.CLICKED_GUITAR:
      return {...state, clickedGuitarID: action.payload};
    case ActionType.SET_PROMO:
      return {...state, promo: action.payload};
    case ActionType.SHOW_POPUP:
      return {...state, isPopup: action.payload};
    case ActionType.CHANGE_POPUP_STATUS:
      return {...state, popupStatus: action.payload};
    default:
      return state;
  }
};

export {rootReducer};
