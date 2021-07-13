import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      apiRepos: [],
      loading: true,
    };
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const { stateSearch } = this.props;
    const request = await fetch(`https://api.github.com/users/${stateSearch}`);
    const response = await request.json();

    const request2 = await fetch(
      `https://api.github.com/users/${stateSearch}/repos?per_page=3&sort=updated`
    );
    const response2 = await request2.json();
    this.setState({
      api: response,
      apiRepos: response2,
      loading: false,
    });
  }

  render() {
    const { api, apiRepos, loading } = this.state;
    return (
      <div className="flex">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Essas são as informações do GitHub de @{api.login}</h1>
            <img
              src={api.avatar_url}
              alt={api.login}
              width="200px"
              className="img"
            />
            <h3>Nome: {api.name}</h3>
            <h3>Descrição: {api.bio}</h3>
            <h5>Seus principais repositórios são:</h5>
            <div>
              <p>Criador do repositório: @{apiRepos[0].owner.login}</p>
              <p>{apiRepos[0].full_name}</p>
              <Link
                to={{
                  pathname: apiRepos[0].html_url,
                }}
                target="_blank"
                className="link"
              >
                {apiRepos[0].name}
              </Link>
            </div>
            <div>
              <p>Criador do repositório: @{apiRepos[1].owner.login}</p>
              <p>{apiRepos[1].full_name}</p>
              <Link
                to={{
                  pathname: apiRepos[1].html_url,
                }}
                target="_blank"
                className="link"
              >
                {apiRepos[1].name}
              </Link>
            </div>
            <div>
              <p>Criador do repositório: @{apiRepos[2].owner.login}</p>
              <p>{apiRepos[2].full_name}</p>
              <Link
                to={{
                  pathname: apiRepos[2].html_url,
                }}
                target="_blank"
                className="link"
              >
                {apiRepos[2].name}
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateSearch: state.search.search,
});

export default connect(mapStateToProps)(UserInfo);
