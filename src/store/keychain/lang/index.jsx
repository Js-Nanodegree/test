import * as R from 'ramda';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

export const langStorage = createSensitiveStorage({
    keychainService: 'langChainKeychain',
    sharedPreferencesName: 'langChainSharedPrefs',
});

export const langPersistConfig = {
    key: 'lang',
    storage: langStorage,
};

export const initialState = { lang: 'ru', location: "Казань" };

export const langReducer = (state = initialState, action) =>
    R.cond([
        [
            R.equals('LANG_CHANGE'),
            () => R.mergeAll([state, { lang: action.payload }]),
        ],
        [
            R.equals('LOCATION_CHANGE'),
            () => R.mergeAll([state, { location: action.payload }]),
        ],
        [R.T, R.always(state)],
    ])(action.type);
