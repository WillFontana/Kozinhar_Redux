import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/routes';
import AppProvider from './hooks';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes></Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
