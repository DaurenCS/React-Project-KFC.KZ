import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import STORE from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { IntlProvider } from 'react-intl'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { store, persistor } = STORE()
root.render(
    <IntlProvider messages={{}} locale='ru' defaultLocale='ru'>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </IntlProvider>
);

serviceWorkerRegistration.register();
