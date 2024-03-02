import AsyncStorage from "@react-native-async-storage/async-storage";
import { JwtTokenApi } from "../api/jwtToken/JwtTokenApi";

const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("accessToken");
  } catch (error) {
    console.error("Error retrieving data", error);
    return null;
  }
};

const removeAccessToken = async (): Promise<void> => {
  try {
    return await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error removing access-token", error);
  }
};

const saveAccessToken = async (accessToken: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.error("Error saving access-token", error);
  }
};

const refreshTokens = async (): Promise<void> => {
  try {
    // удалим access token
    await removeAccessToken();

    // отправим запрос на обновление токенов
    const data = await JwtTokenApi.refreshTokens();

    if (data) {
      // сохраним access token в AsyncStorage. refresh token автоматически сохраняется в cookies (возможно это дублирование, т.к. в response interceptor мы это выполняем!)
      await saveAccessToken(data.accessToken);
    }
  } catch (error) {
    console.error(error);
  }
};

export const JwtTokenService = {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
  refreshTokens,
};
