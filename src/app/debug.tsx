import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Button, Text } from "native-base";
import { sendLocationToBackend, startBackgroundTracking } from "../services/LocationBackgroundService";
import { AsyncStorageKeys, saveInAsyncStorage } from "../services/AsyncStorageService";

export default function Debug() {
	const [errorMsg, setErrorMsg] = useState("");
	const [latitude, setLatitude] = useState(56.484641);
	const [longitude, setLongitude] = useState(84.947642);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
			<Text variant={"header17"}>{`Широта: ${latitude}`}</Text>
			<Text>{`Долгота: ${longitude}`}</Text>

			<Button my={1} variant="outline" minW={200} size={"lg"} onPress={() => saveInAsyncStorage(AsyncStorageKeys.TRANSPORTING_ORDER_ID, "404")}>
				Установить OrderID
			</Button>

			<Button my={1} variant="outline" minW={200} size={"lg"} onPress={() => saveInAsyncStorage(AsyncStorageKeys.ACTIVE_TRUCK_ID, "707")}>
				Установить TruckID
			</Button>

			<Button my={1} variant="outline" minW={200} size={"lg"} onPress={() => sendLocationToBackend({ coords: { latitude, longitude } } as any)}>
				Отправить геопозицию на сервер
			</Button>

			<Button my={1} variant="outline" minW={200} size={"lg"} onPress={() => router.navigate("/LocationModal")}>
				Открыть LocationModal
			</Button>

			<Button my={1} variant="outline" minW={200} size={"lg"} onPress={() => router.navigate("/UiMockUps")}>
				Открыть UI Mock Ups
			</Button>

			<Button my={1} variant="outline" minW={200} size={"lg"} onPress={() => router.navigate("/DriverOrdersTab")}>
				Го на вкладки
			</Button>

			{errorMsg && (
				<Text mt={5} mx={10} textAlign={"center"} color={"red.500"}>
					{errorMsg}
				</Text>
			)}
		</View>
	);
}
