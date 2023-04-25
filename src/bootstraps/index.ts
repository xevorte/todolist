import { persistStore, persistReducer } from 'redux-persist';
import { Store, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import mainReducer from './bootstrapReducers';

let finalReducer: any = mainReducer;

const persistConfig = {
  active: true,
  config: {
    key: 'root',
    storage,
    whitelist: ['authLocked'],
  },
};

if (persistConfig.active) {
  finalReducer = persistReducer(persistConfig.config, mainReducer);
}

export const store: Store = createStore(finalReducer);
export const persistor = persistStore(store);
