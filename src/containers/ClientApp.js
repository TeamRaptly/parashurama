import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CreateContext from '../utils/create-context';
import App from '../App';

import createGetter from '../utils/create-getter';

let config, translations;

if (window && window.__initialState) {
  config = createGetter(window.__initialState.config || {});
  translations = createGetter(window.__initialState.translations || {});
}

console.log('client app. config...', config('locales'));
console.log('client app. translations...', translations('kn.welcome'));

ReactDOM.hydrate(
  <BrowserRouter>
    <CreateContext>
      <App facts={window.__initialState.facts} />
    </CreateContext>
  </BrowserRouter>,
  document.getElementById('root')
);
