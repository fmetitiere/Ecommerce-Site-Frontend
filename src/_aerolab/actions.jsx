import axios from "axios";

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://coding-challenge-api.aerolab.co/user/me`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJmN2RhMjliNzc4MTAwMjA5YzVhYzUiLCJpYXQiOjE2MjMxNjIyNzV9.cyYdEA9vu3iOHqyMbVZSoQ12uZH_ZgwfTasd4tCEvFw",
        },
      }
    );

    dispatch(fetchUserInfo(response.data));
  } catch (userError) {
    dispatch(fetchUserFailure(userError));
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());

  try {
    const response = await axios.get(
      `https://coding-challenge-api.aerolab.co/products`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJmN2RhMjliNzc4MTAwMjA5YzVhYzUiLCJpYXQiOjE2MjMxNjIyNzV9.cyYdEA9vu3iOHqyMbVZSoQ12uZH_ZgwfTasd4tCEvFw",
        },
      }
    );

    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error));
  }
};

export const fetchProductsHistory = () => async (dispatch) => {
  dispatch(fetchProductsRequest());

  try {
    const response = await axios.get(
      `https://coding-challenge-api.aerolab.co/user/history`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJmN2RhMjliNzc4MTAwMjA5YzVhYzUiLCJpYXQiOjE2MjMxNjIyNzV9.cyYdEA9vu3iOHqyMbVZSoQ12uZH_ZgwfTasd4tCEvFw",
        },
      }
    );

    dispatch(fetchProductsHistorySuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error));
  }
};

export const addUserPoints = (amount) => async (dispatch) => {

  dispatch(fetchPoints());

  await axios.request({
    method: "POST",
    url: `https://coding-challenge-api.aerolab.co/user/points`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJmN2RhMjliNzc4MTAwMjA5YzVhYzUiLCJpYXQiOjE2MjMxNjIyNzV9.cyYdEA9vu3iOHqyMbVZSoQ12uZH_ZgwfTasd4tCEvFw",
    },
    data: {
      amount: amount,
    },
  });

  dispatch(fetchUser());
};

export const redeemCode = (code, setShowSuccess) => async (dispatch) => {
  setShowSuccess(true);

  setTimeout(() => {
    setShowSuccess(false);
  }, 2000);

  await axios.request({
    method: "POST",
    url: `https://coding-challenge-api.aerolab.co/redeem`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJmN2RhMjliNzc4MTAwMjA5YzVhYzUiLCJpYXQiOjE2MjMxNjIyNzV9.cyYdEA9vu3iOHqyMbVZSoQ12uZH_ZgwfTasd4tCEvFw",
    },
    data: {
      productId: code,
    },
  });

  const response = await axios.get(
    `https://coding-challenge-api.aerolab.co/user/history`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJmN2RhMjliNzc4MTAwMjA5YzVhYzUiLCJpYXQiOjE2MjMxNjIyNzV9.cyYdEA9vu3iOHqyMbVZSoQ12uZH_ZgwfTasd4tCEvFw",
      },
    }
  );

  dispatch(fetchProductsHistorySuccess(response.data));
  dispatch(fetchUser());
};

export const sortPorduct = (sortType) => async (dispatch, getState) => {
  const products = getState().items;

  dispatch(setSortType(sortType));

  switch (sortType) {
    case "ASC": {
      products.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
      break;
    }
    case "DESC": {
      products.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
      break;
    }
    default: {
      dispatch(fetchProducts());
    }
  }

  dispatch(fetchProductsSuccess(products));
};

const fetchProductsRequest = () => {
  return { type: "FETCH_PRODUCTS_REQUEST" };
};

const fetchProductsSuccess = (items) => {
  return {
    type: "FETCH_PRODUCTS_SUCCESS",
    payload: { items },
  };
};

const fetchProductsHistorySuccess = (history) => {
  return {
    type: "FETCH_PRODUCTS_HISTORY_SUCCESS",
    payload: { history },
  };
};

const fetchProductsFailure = (error) => {
  return { type: "FETCH_PRODUCTS_FAILURE", error };
};

const fetchUserInfo = (userInfo) => {
  return {
    type: "FETCH_USER_INFO",
    payload: { userInfo },
  };
};

const fetchUserFailure = (userError) => {
  return { type: "FETCH_USER_INFO_FAILURE", userError };
};

const setSortType = (selectedSortType) => {
  return { type: "SET_SORT_TYPE", payload: { selectedSortType } };
};

const fetchPoints = () => {
  return { type: "FETCH_POINTS_REQUEST" };
};

export const formatNumber = (data) => {
  return data ? data.toLocaleString("es-AR") : null;
};
