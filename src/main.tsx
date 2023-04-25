import * as Redux from './bootstraps';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={Redux.store}>
        <PersistGate loading={null} persistor={Redux.persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
