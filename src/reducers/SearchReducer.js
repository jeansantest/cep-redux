import { GET_CEP, REQUEST_API, REQUEST_SUCESS } from '../actions';

const INITIAL_STATE = {
  isLoading: true,
  search: '',
  apiSearchCEP: [],
};

function SearchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CEP:
      return {
        ...state,
        search: action.CEP,
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
        apiSearchCEP: action.payload,
      };
    default:
      return state;
  }
}

export default SearchReducer;
