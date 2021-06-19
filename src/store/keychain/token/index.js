import * as R from 'ramda';
import { setItem, removeItem } from '../async';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

export const tokenStorage = createSensitiveStorage({
  keychainService: 'tokenChainKeychain',
  sharedPreferencesName: 'tokenChainSharedPrefs',
});

export const tokenPersistConfig = {
  key: 'token',
  storage: tokenStorage,
};

export const initialState = {};

export const tokenReducer = (state = initialState, action) =>
  R.cond([
    [
      R.equals('user'),
      () =>
        R.assocPath(
          ['user'],
          R.pipe(R.path(['payload']), R.path(R.keys(action.payload)))(action),
          state,
        ),
    ],
    [
      R.equals('authenticateByCode'),
      () => {
        setItem(
          R.pipe(
            R.path(['payload']),
            R.path(R.keys(action.payload)),
            R.path(['token']),
          )(action),
        );

        return {
          authenticateByCode: R.path(R.keys(action.payload))(action.payload),
        };
      },
    ],
    [
      R.equals('omit'),
      () => {
        removeItem();

        return initialState;
      },
    ],
    [R.T, R.always(state)],
  ])(action.type);
