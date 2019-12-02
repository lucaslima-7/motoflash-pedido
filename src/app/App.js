import React from 'react';
import Routes from '../routes';
import store from './store';
import { create } from 'jss';
import jssExtend from 'jss-extend';
import { Provider } from 'react-redux';
import defaultTheme from "../app/config/themes/defaultTheme";
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider, StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/styles';
import Authorization from 'app/auth/Authorization';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();
const theme = createMuiTheme(defaultTheme)

const App = () => (
  <StylesProvider jss={jss} generateClassName={generateClassName}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Authorization>
          <Routes />
        </Authorization>
      </Provider>
    </ThemeProvider>
  </StylesProvider>
)

export default App;