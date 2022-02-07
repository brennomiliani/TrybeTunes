import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Profile extends Component {
  state = {
    loading: false,
    user: {},
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const userObj = await getUser();
    this.setState({ loading: false, user: userObj });
  }

  render() {
    const { loading, user } = this.state;
    const { name, image, email, description } = user;
    const icon = <i className="fas fa-user profile-edit" />;
    const profile = (
      <div className="profile-card">
        <div className="profile-image">
          {image ? <img data-testid="profile-image" src={ image } alt="profile" /> : icon}
          <button type="button"><Link to="/profile/edit">Editar perfil</Link></button>
        </div>
        <h4>Nome</h4>
        <p>{name}</p>
        <h4>E-mail</h4>
        <p>{email}</p>
        <h4>Descrição</h4>
        <p>{description}</p>
      </div>
    );
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading ? <Loading /> : profile }
        </div>
      </>
    );
  }
}
