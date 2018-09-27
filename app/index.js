import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store/createStore';
import {
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import App from './App';

const MOUNT_NODE = document.getElementById('app');

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#54c7f3',
      main: '#2196F3',
      dark: '#2872f3',
      contrastText: '#fff',
    },
  },
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>,
    MOUNT_NODE
  );
};

render();

