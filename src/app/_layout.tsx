import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "../store/configureStore";
import { AuthorizationService } from "../services/AuthorizationService";
import {
	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,
} from "@expo-google-fonts/inter";
import React from "react";
import { customTheme } from "../theme/customTheme";

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
	const [fontsLoaded] = useFonts({
		Inter_100Thin,
		Inter_200ExtraLight,
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_900Black,
	});

	if (!fontsLoaded) {
		return null;
	}

	useEffect(() => {
		AuthorizationService.checkAuthorization();
	}, []);

	return (
		<Provider store={store}>
			<NativeBaseProvider theme={customTheme}>
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
			</NativeBaseProvider>
		</Provider>
	);
}
