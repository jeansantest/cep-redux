import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI, openModal, closeModal } from '../actions';
import Modal from 'react-modal';
// import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    Modal.setAppElement('#root');
    this.formatarCEP = this.formatarCEP.bind(this);
  }

  formatarCEP(str) {
    if (/[A-z]/g.test(str)) {
      return str.replace(/[A-z]/g, '');
    }
    const re = /^(\d{2})\.*(\d{3})-*(\d{3})$/;

    if (re.test(str)) {
      return str.replace(re, '$1.$2-$3');
    }
  }

  render() {
    const {
      fetchCEP,
      stateIsLoading,
      apiSearchCEP,
      closeModal,
      modalIsOpen,
      openModal,
    } = this.props;
    const { search } = this.state;
    return (
      <div className="flex">
        <div>
          <input
            type="text"
            onChange={({ target }) => this.setState({ search: target.value })}
            placeholder="CEP"
            className="input"
            maxLength="10"
            value={this.formatarCEP(search)}
          />
          <button
            onClick={() => {
              fetchCEP(search);
              openModal();
            }}
            className="button"
          >
            Buscar
          </button>
        </div>
        {stateIsLoading ? (
          <div>Faça uma busca</div>
        ) : apiSearchCEP.cep ? (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
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
          </Modal>
        ) : apiSearchCEP.code ? (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <div>
              <h2>{apiSearchCEP.code}</h2>
              <h3>
                {apiSearchCEP.state}, {apiSearchCEP.city}
              </h3>
              <p>{apiSearchCEP.address}</p>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCEP: (state) => dispatch(fetchAPI(state)),
  openModal: () => dispatch(openModal()),
  closeModal: () => dispatch(closeModal()),
});

const mapStateToProps = (state) => ({
  stateIsLoading: state.search.isLoading,
  apiSearchCEP: state.search.apiSearchCEP,
  modalIsOpen: state.search.modalIsOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
