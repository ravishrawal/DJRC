//approot
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux';

import App from './AppLoading';
import Nav from './Nav';

const AppRoot = () => {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
};

export default AppRoot;
