import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';
// import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }
  render() {
    const { fetchCEP, stateIsLoading, apiSearchCEP } = this.props;
    const { search } = this.state;
    return (
      <div className="flex">
        <div>
          <input
            type="text"
            onChange={({ target }) => this.setState({ search: target.value })}
            placeholder="CEP"
            className="input"
          />
          <button
            onClick={() => {
              fetchCEP(search);
            }}
            className="button"
          >
            Buscar
          </button>
        </div>
        {stateIsLoading ? (
          <div>Faça uma busca</div>
        ) : apiSearchCEP.cep ? (
          <div>
            <h2>{apiSearchCEP.cep}</h2>
            <h3>
              {apiSearchCEP.uf}, {apiSearchCEP.localidade} - ddd(
              {apiSearchCEP.ddd})
            </h3>
            <p>
              {apiSearchCEP.logradouro}, bairro {apiSearchCEP.bairro}
            </p>
          </div>
        ) : apiSearchCEP.code ? (
          <div>
            <h2>{apiSearchCEP.code}</h2>
            <h3>
              {apiSearchCEP.state}, {apiSearchCEP.city}
            </h3>
            <p>{apiSearchCEP.address}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCEP: (state) => dispatch(fetchAPI(state)),
});

const mapStateToProps = (state) => ({
  stateIsLoading: state.search.isLoading,
  apiSearchCEP: state.search.apiSearchCEP,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
