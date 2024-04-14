import AsyncStorage from "@react-native-async-storage/async-storage";

export enum AsyncStorageKeys {
    phoneNumber = "phoneNumber",
}

export const getFromAsyncStorage = async (key: AsyncStorageKeys): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error("Error retrieving from AsyncStorage", error);
        return null;
    }
};

export const removeFromAsyncStorage = async (key: AsyncStorageKeys): Promise<void> => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from AsyncStorage", error);
    }
};

export const saveInAsyncStorage = async (key: AsyncStorageKeys, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error("Error saving in AsyncStorage", error);
    }
};
