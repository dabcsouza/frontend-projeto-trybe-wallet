import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <BrowserRouter basename={ process.env.PUBLIC_URL }>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
