import {
  GET_CEP,
  REQUEST_API,
  REQUEST_SUCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions';

const INITIAL_STATE = {
  isLoading: true,
  search: '',
  apiSearchCEP: [],
  modalIsOpen: false,
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
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: false,
      };
    default:
      return state;
  }
}

export default SearchReducer;
