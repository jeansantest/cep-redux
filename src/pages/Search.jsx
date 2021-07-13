import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, fetchAPI } from '../actions';
import gitHub from '../image/github.png';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }
  render() {
    const { sendSearch, fetchUsers, stateIsLoading, apiSearchUsers } =
      this.props;
    const { search } = this.state;
    return (
      <div className="flex">
        <img src={gitHub} alt="github" />
        <div>
          <input
            type="text"
            onChange={({ target }) => this.setState({ search: target.value })}
            placeholder="Usuário do github"
            className="input"
          />
          <button
            onClick={() => {
              fetchUsers(search);
            }}
            className="button"
          >
            Buscar
          </button>
        </div>
        {stateIsLoading ? (
          <div>Faça uma busca</div>
        ) : (
          <div>
            {apiSearchUsers.items.map(({ login, avatar_url }) => (
              <div>
                <Link to="/info" onClick={() => sendSearch(login)}>
                  <img src={avatar_url} alt={login} width="30px" />
                  {login}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendSearch: (state) => dispatch(getUser(state)),
  fetchUsers: (state) => dispatch(fetchAPI(state)),
});

const mapStateToProps = (state) => ({
  stateIsLoading: state.search.isLoading,
  apiSearchUsers: state.search.apiSearchUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
