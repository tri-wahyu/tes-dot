import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.css';
import Main from './DemoPages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import FormElementsValidation from './DemoPages/Forms/Elements/Validation'
const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  );
};

renderApp(FormElementsValidation);

if (module.hot) {
  module.hot.accept('./DemoPages/Forms/Elements/Validation', () => {
    const NextApp = require('./DemoPages/Forms/Elements/Validation').default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();

