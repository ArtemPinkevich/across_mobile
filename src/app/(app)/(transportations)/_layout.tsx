import { router, Stack } from "expo-router";
import { Pressable } from "native-base";
import { Platform } from "react-native";
import BackButtonSvg from "../../../components/svg/BackButtonSvg";

export default function LoadLayout() {
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
			<Stack.Screen name="CargoEditingModal" options={{ title: "Информация о грузе" }} />
			<Stack.Screen name="(selectLists)/PackagingTypeSelectListModal" options={{ title: "Выбор типа упаковки" }} />
			<Stack.Screen name="TruckRequirementsModal" options={{ title: "Требования к грузовику" }} />
			<Stack.Screen name="JournalModal" options={{ title: "История перевозок" }} />
			<Stack.Screen name="(selectLists)/CarBodiesSelectListModal" options={{ title: "Выбор типа кузова" }} />
			<Stack.Screen name="(selectLists)/LoadingTypesSelectListModal" options={{ title: "Выбор типа загрузки" }} />
			<Stack.Screen name="(selectLists)/UnloadingTypesSelectListModal" options={{ title: "Выбор типа выгрузки" }} />
			<Stack.Screen name="TransferInfoModal" options={{ title: "Публикация груза" }} />
			<Stack.Screen name="(transportationDetails)/OfferedTransportationDetailsModal" options={{ title: "Описание заказа" }} />
			<Stack.Screen name="(transportationDetails)/OnlyInfoTransportationDetailsModal" options={{ title: "Описание заказа" }} />
			<Stack.Screen name="(transportationDetails)/InProgressTransportationDetailsModal" options={{ title: "Описание заказа" }} />
			<Stack.Screen name="(transportationDetails)/ShipperApprovingTransportationDetailsModal" options={{ title: "Описание предложения" }} />
		</Stack>
	);
}
