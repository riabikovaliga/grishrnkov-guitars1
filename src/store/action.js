export const ActionType = {
  SET_PROMO: `SET_PROMO`,
  SHOW_POPUP: `SHOW_POPUP`,
  HIDE_POPUP: `HIDE_POPUP`,
  SET_MIN_PRICE: `SET_MIN_PRICE`,
  SET_MAX_PRICE: `SET_MAX_PRICE`,
  CLICKED_GUITAR: `CLICKED_GUITAR`,
  SET_ACTUAL_SORT: `SET_ACTUAL_SORT`,
  SET_GUITAR_TYPE: `SET_GUITAR_TYPE`,
  SET_TOTAL_PRICES: `SET_TOTAL_PRICES`,
  DELETE_CORT_ITEM: `DELETE_CORT_ITEM`,
  SET_GUITAR_STRING: `SET_GUITAR_STRING`,
  SET_ACTUAL_SORT_WAY: `SET_ACTUAL_SORT_WAY`,
  CHANGE_POPUP_STATUS: `CHANGE_POPUP_STATUS`,
  SET_SELECTED_GUITAR_ID: `SET_SELECTED_GUITAR_ID`,
};

export const clickedGuitar = (payload) => ({
  type: ActionType.CLICKED_GUITAR,
  payload,
});

export const setMinPrice = (price) => ({
  type: ActionType.SET_MIN_PRICE,
  payload: +price,
});

export const setMaxPrice = (price) => ({
  type: ActionType.SET_MAX_PRICE,
  payload: +price,
});

export const setTypeGuitar = (payload) => ({
  type: ActionType.SET_GUITAR_TYPE,
  payload,
});

export const setStringGuitar = (payload) => ({
  type: ActionType.SET_GUITAR_STRING,
  payload,
});

export const setActualSort = (payload) => ({
  type: ActionType.SET_ACTUAL_SORT,
  payload,
});

export const setActualSortWay = (payload) => ({
  type: ActionType.SET_ACTUAL_SORT_WAY,
  payload,
});

export const setSelectedGuitarID = (payload) => ({
  type: ActionType.SET_SELECTED_GUITAR_ID,
  payload,
});

export const setTotalPrices = (payload) => ({
  type: ActionType.SET_TOTAL_PRICES,
  payload,
});

export const deleteCortItem = (payload) => ({
  type: ActionType.DELETE_CORT_ITEM,
  payload,
});

export const setPromo = (payload) => ({
  type: ActionType.SET_PROMO,
  payload,
});

export const showPopup = (payload) => ({
  type: ActionType.SHOW_POPUP,
  payload,
});

export const changePopupStatus = (payload) => ({
  type: ActionType.CHANGE_POPUP_STATUS,
  payload,
});
