import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { setUser } from '../actions';
import LoginLogo from '../images/logo.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isDisable: true,
      isInvalidEmail: true,
      isInvalidPassword: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { setUserEmail, history: { push } } = this.props;
    setUserEmail(email);
    push('/carteira');
  }

  handleChange({ target: { name, value } }) {
    if (name === 'email') {
      if (value.includes('.com') && value.includes('@')) {
        const indexName = 0;
        const indexDomain = 1;
        const nameEmail = value.split('@')[indexName];
        const domain = value.split('@')[indexDomain].split('.com')[indexName];
        this.setState({
          isInvalidEmail: value !== `${nameEmail}@${domain}.com`,
        });
      } else {
        this.setState({
          isInvalidEmail: true,
        });
      }
      this.setState({
        email: value,
      });
    } else {
      const minCharPass = 6;
      this.setState({
        isInvalidPassword: value.length < minCharPass,
      });
    }
    this.setState((state) => ({
      isDisable: state.isInvalidEmail || state.isInvalidPassword,
    }));
  }

  render() {
    const { isDisable } = this.state;
    return (
      <section className="login">
        <h1 className="login-title">Projeto TrybeWallet</h1>
        <form className="login-container form-group">
          <img src={ LoginLogo } alt="imagem login" className="login-logo" />
          <label htmlFor="email-input">
            <input
              type="email"
              name="email"
              id="email-input"
              data-testid="email-input"
              placeholder="E-mail"
              className="form-control"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              name="pasword"
              id="password-input"
              data-testid="password-input"
              placeholder="Senha"
              className="form-control"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            className="btn btn-success"
            disabled={ isDisable }
            onClick={ this.handleSubmit }
          >
            <FontAwesomeIcon icon={ faPowerOff } />
            {'  '}
            Entrar
          </button>
        </form>
        <h3 style={{
          width: '100%',
          color: 'white',
          fontSize: '10px',
          textAlign: 'center',
        }}>{ `para testar a aplicação digite um e-mail valido do tipo
                user@domain.com e uma senha com mais de 6 caracteres` } </h3>
      </section>
    );
  }
}

Login.propTypes = {
  setUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (state) => dispatch(setUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
