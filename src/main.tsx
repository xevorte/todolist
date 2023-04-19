import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import bootstrapReducer from './bootstraps/bootstrapReducers';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const queryClient = new QueryClient();
const store = createStore(bootstrapReducer);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
