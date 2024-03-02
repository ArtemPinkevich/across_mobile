import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "../store/configureStore";
import { SessionProvider } from "../auth/ctx";
import { JwtTokenService } from "../services/JwtTokenService";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    //При проверяем был ли ранее пользователь авторизован
    async function checkAuth() {
      /*
        Если есть access-токен в AsyncStorage, то обновим пару токенов.
        Перед обновлением токенов, удаляется текущий access-токен и только потом делается запрос.
        Поэтому, т.к. нет эдпоинта /refresh, при входе в приложение будем попадать всегда на sign-in.
        Можно закомментировать обновление токенов, чтобы всегда быть в приложении.
      */
      if (await JwtTokenService.getAccessToken()) {
        await JwtTokenService.refreshTokens();
      }

      // если нет в AsyncStorage access-токена, то перенаправляем на страницу авторизации
      if (!(await JwtTokenService.getAccessToken())) {
        router.replace("/sign-in");
      }
    }

    checkAuth();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SessionProvider>
            <Stack>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            </Stack>
          </SessionProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
