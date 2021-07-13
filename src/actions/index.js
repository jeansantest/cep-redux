export const GET_CEP = 'GET_CEP';
export const getCEP = (CEP) => ({ type: GET_CEP, CEP });

export const REQUEST_API = 'REQUEST_API';
export const requestAPI = () => ({ type: REQUEST_API });

export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const requestCEP = (payload) => ({ type: REQUEST_SUCESS, payload });

export const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = () => ({ type: OPEN_MODAL });

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({ type: CLOSE_MODAL });

export function fetchAPI(search) {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch(`https://viacep.com.br/ws/${search}/json/`);
      const data = await response.json();
      dispatch(requestCEP(data));
      console.log(data);
    } catch (error) {
      console.error(error);
      dispatch(requestAPI());
      const response = await fetch(
        `https://ws.apicep.com/busca-cep/api/cep/${search}.json`
      );
      const data = await response.json();
      dispatch(requestCEP(data));
    }
  };
}
