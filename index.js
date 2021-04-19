/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from "react-redux";
import configureStore from './src/redux/store/store';

const store = configureStore();

const ReduxVibes = () =>
    <Provider store={store}>
        <App />
    </Provider>

AppRegistry.registerComponent(appName, () => ReduxVibes);
// AppRegistry.registerComponent(appName, () => App);
