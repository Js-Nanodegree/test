import * as R from 'ramda';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

export const userStorage = createSensitiveStorage({
  keychainService: 'userChainKeychain',
  sharedPreferencesName: 'userChainSharedPrefs',
});

export const userPersistConfig = {
  key: 'user',
  storage: userStorage,
};

export const initialState = {
  user: '',
  balance: ""
};

export const userReducer = (state = initialState, action) =>
  R.cond([
    [R.equals('name'), R.always({ ...state, user: action.payload })],
    [R.equals('balance'), R.always({ ...state, balance: action.payload })],
    [R.T, R.always(state)],
  ])(action.type);
