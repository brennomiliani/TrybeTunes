import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    nameInput: '',
    btnDisabled: true,
    loading: false,
    finish: false,
  }

  verifyBtn = () => {
    const { nameInput } = this.state;
    if (nameInput.length > 2) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyBtn);
  }

  redirecting = () => {
    const { finish } = this.state;
    if (finish) {
      return <Redirect to="/search" />;
    }
  }

  btnClick = (event) => {
    event.preventDefault();
    const { nameInput } = this.state;
    this.setState({ loading: true }, () => {
      createUser({ name: nameInput })
        .then(() => (
          this.setState({
            loading: false,
            finish: true,
          })
        ));
    });
  }

  render() {
    const { nameInput, btnDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>

          <h2>Login Trybetunes</h2>
          <label htmlFor="name-input">
            Nome:
            <input
              data-testid="login-name-input"
              id="name-input"
              onChange={ this.handleChange }
              value={ nameInput }
              name="nameInput"
            />
          </label>
          <button
            type="submit"
            onClick={ this.btnClick }
            disabled={ btnDisabled }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
          {loading ? <Loading /> : this.redirecting() }
        </form>
      </div>
    );
  }
}
