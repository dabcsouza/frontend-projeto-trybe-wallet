import React, { Component } from 'react';
import notFound from '../images/pexels-cottonbro-4629626.jpg';

export default class NotFound extends Component {
  render() {
    return (
      <div className="image-not-found">
        <img
          src={ notFound }
          alt="Imagem da página"
          className="image-page"
        />
        <h1>Algo de Errado não está certo.</h1>
        <h1>Não encontramos nada por Aqui.</h1>
      </div>
    );
  }
}
