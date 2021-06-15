const initState = {
  items: [],
  history: [],
  loading: false,
  isFetching: false,
  error: null,
  userError: null,
  userInfo: {},
  selectedSortType: "MOST_RECENT",
};

const shopReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        items: action.payload.items,
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "FETCH_PRODUCTS_HISTORY_SUCCESS":
      return {
        ...state,
        loading: false,
        history: action.payload.history,
      };
    case "FETCH_USER_INFO":
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload.userInfo,
      };
    case "FETCH_USER_INFO_FAILURE":
      return {
        ...state,
        loading: false,
        userError: action.userError,
      };
    case "FETCH_POINTS_REQUEST":
      return {
        ...state,
        isFetching: true,
      };
    case "SET_SORT_TYPE":
      return {
        ...state,
        selectedSortType: action.payload.selectedSortType,
      };
    default:
      return state;
  }
};

export default shopReducer;
