const initialState = {
  cakeList: [],
  loading: false,
  error: null,
};

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CAKE_LIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_CAKE_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        cakeList: action.payload,
      };
    case 'FETCH_CAKE_LIST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Tambahkan case reducer lainnya sesuai kebutuhan Anda
    default:
      return state;
  }
};

export default cakeReducer;
