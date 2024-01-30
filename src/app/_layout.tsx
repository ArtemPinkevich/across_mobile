import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { store } from '../store/configureStore';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
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

  return (
    <Provider store={store}>
      <NativeBaseProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              <Stack.Screen name="EditProfileModal" options={{ title: 'Редактирование профиля', presentation: 'modal' }} />
              <Stack.Screen name="EditCarModal" options={{ title: 'Информация о грузовике', presentation: 'modal' }} />
              <Stack.Screen name="(garage)/CarBodySelectListModal" options={{ title: 'Выбор типа кузова', presentation: 'modal' }} />
              <Stack.Screen name="(garage)/LoadingTypeSelectListModal" options={{ title: 'Выбор типа загрузки', presentation: 'modal' }} />
            </Stack>
          </ThemeProvider>
        </NativeBaseProvider>
    </Provider>
  );
}
