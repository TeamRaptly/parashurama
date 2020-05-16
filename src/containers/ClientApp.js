import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CreateContext from '../utils/create-context';
import createGetter from '../utils/create-getter';
import App from '../App';

// Not needed, just kept for debugging
// let config, translations, language;
// if (window && window.__initialState) {
//   config = createGetter(window.__initialState.config || {});
//   translations = createGetter(window.__initialState.translations || {});
//   language = window.__initialState.language || {};
// }

// console.log('client app. config...', config('supportedLanguages'));
// console.log('client app. translations...', translations('welcome'));
// console.log('client app. language...', language);

ReactDOM.hydrate(
  <BrowserRouter>
    <CreateContext>
      <App facts={window.__initialState.facts} />
    </CreateContext>
  </BrowserRouter>,
  document.getElementById('root')
);
