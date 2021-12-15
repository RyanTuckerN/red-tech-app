import React from 'react';
import './App.css';
import Home from "./views/Home";
import { ThemeProvider } from '@material-ui/core';
import theme from './contexts/Theme';
import OrderProvider from './contexts/State';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <OrderProvider>
          <Home />
        </OrderProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
