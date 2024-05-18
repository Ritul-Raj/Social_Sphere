import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import  {Provider as AlertProvider ,positions,transitions} from "react-alert"
import alertTemplate from "react-alert-template-basic"

const options ={
  positions:positions.BOTTOM_CENTER,
  timeout:5000,
  transitions:transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
  <AlertProvider template={alertTemplate} {...options}>
  <App/>
  </AlertProvider>
  </Provider> 
  // </React.StrictMode>
);


