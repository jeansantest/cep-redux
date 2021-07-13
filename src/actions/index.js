export const GET_USER = 'GET_USER';
export const getUser = (user) => ({ type: GET_USER, user });

export const REQUEST_API = 'REQUEST_API';
export const requestAPI = () => ({ type: REQUEST_API });

export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const requestUsers = (payload) => ({ type: REQUEST_SUCESS, payload });

export function fetchAPI(search) {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch(
        `https://api.github.com/search/users?q=${search}&per_page=5`
      );
      const data = await response.json();
      dispatch(requestUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
}
