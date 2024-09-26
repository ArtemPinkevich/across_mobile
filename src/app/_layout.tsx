import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "../store/configureStore";
import { AuthorizationService } from "../services/AuthorizationService";

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

	useEffect(() => {
		AuthorizationService.checkAuthorization();
	}, []);

	return (
		<Provider store={store}>
			<NativeBaseProvider>
				<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
					<Stack>
						<Stack.Screen name="(app)" options={{ headerShown: false }} />
						<Stack.Screen name="location-permission" options={{ headerShown: false }} />
						<Stack.Screen name="sign-in" options={{ headerShown: false }} />
						<Stack.Screen
							name="sign-in-verify"
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</ThemeProvider>
			</NativeBaseProvider>
		</Provider>
	);
}
