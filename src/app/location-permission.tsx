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
			} else if (backgroundStatus === "denied") {
				setErrorMsg("Приложению запрещен доступ к геопозиции. Пожалуйста, снимите запрет в настройках прав приложения.");
			} else {
				setErrorMsg("Для продолжения работы с приложением необходимо разрешить доступ к геопозиции в фоновом режиме");
			}
		} else if (foregroundStatus === "denied") {
			setErrorMsg("Приложению запрещен доступ к геопозиции. Пожалуйста, снимите запрет в настройках прав приложения.");
		} else {
			setErrorMsg("Для продолжения работы с приложением необходимо разрешить доступ к геопозиции");
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "stretch", backgroundColor: "#fff" }}>
			{gpsServicesEnabled ? (
				<Box mx={5}>
					<Box px={4} py={16} variant={"gray_card"}>
						<Text variant={"body15_black"} textAlign={"center"}>
							Чтобы сервис мог находить ближайшие к вам грузы, разрешите определять ваше местоположение
						</Text>
					</Box>
					<Button mt={4} variant="blue_button" onPress={requestLocationPermissions}>
						Разрешить
					</Button>
				</Box>
			) : (
				<Box mx={5}>
					<Box px={4} py={16} variant={"gray_card"}>
						<Text variant={"body15_black"} textAlign={"center"}>
							Пожалуйста, включите геолокацию в настройках смартфона
						</Text>
					</Box>
					<Button mt={4} variant="blue_button" onPress={checkLocationEnabled}>
						Повторить
					</Button>
				</Box>
			)}

			{errorMsg && (
				<Text mt={5} mx={10} variant={"body12"} textAlign={"center"} color={"#E32C2C"}>
					{errorMsg}
				</Text>
			)}
		</View>
	);
}
