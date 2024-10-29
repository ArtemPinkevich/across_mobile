import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { NativeBaseProvider, Pressable } from "native-base";
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
import BackButtonSvg from "../components/svg/BackButtonSvg";

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
		Inter_100Thin,
		Inter_200ExtraLight,
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_900Black,
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
	useEffect(() => {
		AuthorizationService.checkAuthorization();
	}, []);

	return (
		<Provider store={store}>
			<NativeBaseProvider theme={customTheme}>
				<Stack
					screenOptions={{
						headerTitleAlign: "center",
						headerTitleStyle: {
							color: "#000",
							fontWeight: "600",
							fontSize: 17,
							fontFamily: Platform.select({
								web: "Inter_400Regular",
								android: "Inter_400Regular",
								ios: "Inter-Black",
							}),
						},
						headerLeft: () => (
							<Pressable pr={3} py={1} onPress={() => router.back()}>
								<BackButtonSvg />
							</Pressable>
						),
					}}
				>
					{/* <Stack.Screen name="debug" options={{ headerShown: false }} />
					<Stack.Screen
						name="UiMockUps"
						options={{
							title: "UiMockUps",
							presentation: "modal",
						}}
					/> */}
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
