import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI, openModal, closeModal } from '../actions';
import Modal from 'react-modal';
import './Search.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
};

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      inputValue: '',
    };
    Modal.setAppElement('#root');
    this.formatarCEP = this.formatarCEP.bind(this);
  }

  formatarCEP(str) {
    const re = /^(\d{2})\.*(\d{3})-*(\d{3})$/;
    if (/[A-z]/g.test(str)) {
      this.setState({ inputValue: str.replace(/[A-z]/g, '') });
    } else if (re.test(str)) {
      this.setState({ inputValue: str.replace(re, '$1.$2-$3') });
    } else {
      this.setState({ inputValue: str });
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
    const { search, inputValue } = this.state;
    return (
      <div className="flex">
        <div>
          <input
            type="text"
            onChange={({ target }) => {
              this.formatarCEP(target.value);
              this.setState({
                search: target.value,
              });
            }}
            placeholder="CEP"
            className="input"
            maxLength="10"
            value={inputValue}
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
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <div>
              <h2>{apiSearchCEP.cep}</h2>
              <h3>
                {apiSearchCEP.uf}, {apiSearchCEP.localidade} - ddd(
                {apiSearchCEP.ddd})
              </h3>
              <p>
                {apiSearchCEP.logradouro}, bairro {apiSearchCEP.bairro}
              </p>
              <button
                onClick={closeModal}
                className="button"
                style={{ marginTop: '15px' }}
              >
                Fechar
              </button>
            </div>
          </Modal>
        ) : apiSearchCEP.code ? (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <div>
              <h2>{apiSearchCEP.code}</h2>
              <h3>
                {apiSearchCEP.state}, {apiSearchCEP.city}
              </h3>
              <p>{apiSearchCEP.address}</p>
              <button
                onClick={closeModal}
                className="button"
                style={{ marginTop: '15px' }}
              >
                Fechar
              </button>
            </div>
          </Modal>
        ) : (
          <div>Sem informação.</div>
        )}
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
