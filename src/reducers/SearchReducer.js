import { GET_USER, REQUEST_API, REQUEST_SUCESS } from '../actions';

const INITIAL_STATE = {
  isLoading: true,
  search: '',
  apiSearchUsers: [],
};

function SearchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        search: action.user,
      };
    case REQUEST_API:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_SUCESS:
      return {
        ...state,
        isLoading: false,
        apiSearchUsers: action.payload,
      };
    default:
      return state;
  }
}

export default SearchReducer;
