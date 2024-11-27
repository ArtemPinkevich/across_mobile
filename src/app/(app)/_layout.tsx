import { router, Stack } from "expo-router";
import BackButtonSvg from "../../components/svg/BackButtonSvg";
import { Pressable } from "native-base";
import { Platform } from "react-native";

// Отсюда https://docs.expo.dev/router/reference/authentication/
export default function AppLayout() {
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
				headerLeft: () => (
					<Pressable pr={3} py={1} onPress={() => router.back()}>
						<BackButtonSvg />
					</Pressable>
				),
			}}
		>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(garage)" options={{ headerShown: false }} />
			<Stack.Screen name="(transportations)" options={{ headerShown: false }} />
			<Stack.Screen name="(profile)/EditProfileModal" options={{ title: "Редактирование профиля", presentation: "modal" }} />
			<Stack.Screen name="(profile)/ShowDocumentModal" options={{ title: "Просмотр", presentation: "modal" }} />
			<Stack.Screen name="(profile)/DocumentRejectDetailsModal" options={{ title: "Детали", presentation: "modal" }} />
			<Stack.Screen name="(profile)/TakeDocumentPhotoModal" options={{ title: "Предпросмотр", presentation: "modal" }} />
			<Stack.Screen name="(profile)/DocumentsModal" options={{ title: "Документы", presentation: "modal" }} />
			<Stack.Screen name="(profile)/InitialEntryPersonalInfo" options={{ title: "Персональная информация", headerShown: false }} />
			<Stack.Screen name="(payment)/PaymentModal" options={{ title: "Подписка", presentation: "modal" }} />
			<Stack.Screen name="(payment)/PrivacyPolicyModal" options={{ title: "Политика конфиденциальности", presentation: "modal" }} />
			<Stack.Screen name="(payment)/OfferAgreementsModal" options={{ title: "Договор оферты", presentation: "modal" }} />
			<Stack.Screen name="(modals)/PlacesInputModal" options={{ title: "Поиск населенного пункта", presentation: "modal" }} />
			<Stack.Screen name="(location)/LocationModal" options={{ title: "Маршрут", presentation: "modal" }} />
		</Stack>
	);
}
