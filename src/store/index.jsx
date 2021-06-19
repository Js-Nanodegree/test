import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { rootReducer } from './reducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

const persistor = persistStore(store);

export { persistor, store };
