import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async () => {
    const jswToken = await AsyncStorage.getItem('acsessToken');

    return jswToken
};

export const removeItem = async () => {
    const data = await AsyncStorage.removeItem('acsessToken');

    return data
};

export const setItem = async (jswToken) => {
    const update = await AsyncStorage.setItem('acsessToken', jswToken);

    return update
};