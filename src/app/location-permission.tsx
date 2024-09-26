import { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Box, Button, Text } from "native-base";
import * as Location from "expo-location";
import { startBackgroundTracking } from "../services/LocationBackgroundService";

export default function LocationPermission() {
	const [errorMsg, setErrorMsg] = useState("");
	const [gpsServicesEnabled, setGpsServicesEnabled] = useState(false);

	useEffect(() => {
		(async () => {
			const isGpsEnabled = await Location.hasServicesEnabledAsync();
			setGpsServicesEnabled(isGpsEnabled);

			const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
			if (foregroundStatus === "granted") {
				const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
				if (backgroundStatus === "granted") {
					startBackgroundTracking();
					router.replace("/DriverOrdersTab");
				}
			}
		})();
	}, []);

	const checkLocationEnabled = async () => {
		setErrorMsg("");
		const isGpsEnabled = await Location.hasServicesEnabledAsync();
		setGpsServicesEnabled(isGpsEnabled);
		if (!isGpsEnabled) {
			setErrorMsg("Для продолжения работы с приложением необходимо включить геолокацию в настройках смартфона");
		}
	};

	const requestLocationPermissions = async () => {
		setErrorMsg("");
		const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
		if (foregroundStatus === "granted") {
			const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
			if (backgroundStatus === "granted") {
				startBackgroundTracking();
				router.replace("/DriverOrdersTab");
			} else {
				setErrorMsg("Для продолжения работы с приложением необходимо разрешить доступ к геопозиции в фоновом режиме");
			}
		} else {
			setErrorMsg("Для продолжения работы с приложением необходимо разрешить доступ к геопозиции");
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
			{gpsServicesEnabled ? (
				<Box m={5}>
					<Text textAlign={"center"}>Чтобы сервис мог находить ближайшие к вам грузы, разрешите определять ваше местоположение</Text>
					<Button mt={5} variant="outline" minW={200} size={"lg"} onPress={requestLocationPermissions}>
						Разрешить
					</Button>
				</Box>
			) : (
				<Box m={5}>
					<Text textAlign={"center"}>Пожалуйста, включите геолокацию в настройках смартфона</Text>
					<Button mt={5} variant="outline" minW={200} size={"lg"} onPress={checkLocationEnabled}>
						Повторить
					</Button>
				</Box>
			)}

			{errorMsg && (
				<Text mt={5} mx={10} textAlign={"center"} color={"red.500"}>
					{errorMsg}
				</Text>
			)}
		</View>
	);
}
