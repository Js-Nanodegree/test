/* eslint-disable no-useless-escape */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { langPersistConfig, langReducer } from '../keychain/lang';
import { tokenPersistConfig, tokenReducer } from '../keychain/token';
import { userPersistConfig, userReducer } from '../keychain/user';

const rootReducer = combineReducers({
    lang: persistReducer(langPersistConfig, langReducer),
    token: persistReducer(tokenPersistConfig, tokenReducer),
    user: persistReducer(userPersistConfig, userReducer),
});

export { rootReducer };
