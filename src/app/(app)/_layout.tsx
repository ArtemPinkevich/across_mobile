import { Stack } from "expo-router";

// Отсюда https://docs.expo.dev/router/reference/authentication/
export default function AppLayout() {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(garage)" options={{ headerShown: false }} />
			<Stack.Screen name="(transportations)" options={{ headerShown: false }} />
			<Stack.Screen name="(profile)/EditProfileModal" options={{ title: "Редактирование профиля", presentation: "modal" }} />
			<Stack.Screen name="(profile)/ShowDocumentModal" options={{ title: "Просмотр", presentation: "modal" }} />
			<Stack.Screen name="(profile)/DocumentRejectDetailsModal" options={{ title: "Детали", presentation: "modal" }} />
			<Stack.Screen name="(profile)/TakeDocumentPhotoModal" options={{ title: "Предпросмотр", presentation: "modal" }} />
			<Stack.Screen name="(profile)/DocumentsModal" options={{ title: "Документы", presentation: "modal" }} />
			<Stack.Screen name="(profile)/InitialEntryPersonalInfo" options={{ title: "Персональная информация", headerShown: false }} />
			<Stack.Screen name="(modals)/PlacesInputModal" options={{ title: "Поиск населенного пункта", presentation: "modal" }} />
		</Stack>
	);
}
