import React, { Component } from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import './styles/profileEdit.css';
import userImg from '../images/user-solid.svg';

export default class ProfileEdit extends Component {
  state = {
    loading: false,
    user: {},
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const userObj = await getUser();
    this.setState({ loading: false, user: userObj });
  }

  render() {
    const { loading, user } = this.state;
    const { name, image, email, description } = user;
    const icon = <img className="user-icon big" src={ userImg } alt="user" />;
    const form = (
      <form className="profile-form">

        <div className="img-container">
          {image ? <img src={ image } className="big" alt="profile" /> : icon}
          <input
            placeholder="URL da imagem"
            onChange={ this.handleChange }
            data-testid="edit-input-image"
            name="image"
            type="text"
            value={ image }
          />
        </div>

        <label htmlFor="name-input">
          <h4>Nome</h4>
          <p>Fique à vontade para usar seu nome social</p>
          <input
            name="name"
            onChange={ this.handleChange }
            data-testid="edit-input-name"
            value={ name }
            type="text"
            id="name-input"
            placeholder="Nome"
          />
        </label>

        <label htmlFor="email-input">
          <h4>E-mail</h4>
          <p>Escolha um e-mail que consulte diariamente</p>
          <input
            data-testid="edit-input-email"
            name="email"
            onChange={ this.handleChange }
            value={ email }
            type="email"
            id="email-input"
            placeholder="usuario@usuario.com.br"
          />
        </label>

        <label htmlFor="description-input">
          <h4>Descrição</h4>
          <textarea
            onChange={ this.handleChange }
            data-testid="edit-input-description"
            name="description"
            value={ description }
            id="description-input"
            rows="4"
            placeholder="Sobre mim"
          />
        </label>

        <button
          onClick={ this.handleSubmit }
          data-testid="edit-button-save"
          type="submit"
        >
          Salvar

        </button>
      </form>
    );
    return (
      <>
        <Header />
        <div className="profile-edit" data-testid="page-profile-edit">
          {loading ? <Loading /> : form}
        </div>
      </>
    );
  }
}
