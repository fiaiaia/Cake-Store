export const fetchCakeList = () => {
  return (dispatch) => {
    dispatch(fetchCakeListRequest());
    fetch('https://611a268fcbf1b30017eb5527.mockapi.io/cakes')
      .then((response) => response.json())
      .then((data) => dispatch(fetchCakeListSuccess(data)))
      .catch((error) => dispatch(fetchCakeListFailure(error.message)));
  };
};

export const fetchCakeListRequest = () => {
  return {
    type: 'FETCH_CAKE_LIST_REQUEST',
  };
};

export const fetchCakeListSuccess = (cakeList) => {
  return {
    type: 'FETCH_CAKE_LIST_SUCCESS',
    payload: cakeList,
  };
};

export const fetchCakeListFailure = (error) => {
  return {
    type: 'FETCH_CAKE_LIST_FAILURE',
    payload: error,
  };
};

// tambahkan aksi-aksi lainnya
