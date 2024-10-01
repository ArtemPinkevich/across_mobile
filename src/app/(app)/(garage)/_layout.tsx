import { router, Stack } from "expo-router";
import { Platform } from "react-native";
import { Pressable } from "native-base";
import BackButtonSvg from "../../../components/svg/BackButtonSvg";

export default function GarageLayout() {
	return (
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
				presentation: "modal",
				headerLeft: () => (
					<Pressable pr={3} py={1} onPress={() => router.back()}>
						<BackButtonSvg />
					</Pressable>
				),
			}}
		>
			<Stack.Screen name="EditTruckModal" options={{ title: "Информация о грузовике" }} />
			<Stack.Screen name="GarageModal" options={{ title: "Гараж" }} />
			<Stack.Screen name="CarBodySelectListModal" options={{ title: "Выбор типа кузова" }} />
			<Stack.Screen name="LoadingTypeSelectListModal" options={{ title: "Выбор типа загрузки" }} />
			<Stack.Screen name="TruckPhotosModal" options={{ title: "Фото грузовика" }} />
		</Stack>
	);
}
