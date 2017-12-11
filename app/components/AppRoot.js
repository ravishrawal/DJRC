// approot
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import App from './AppLoading';

const AppRoot = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default AppRoot;
