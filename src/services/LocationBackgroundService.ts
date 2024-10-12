import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { SERVER_ADDRESS } from "../constants/GlobalConstants";
import axios from "axios";
import { AsyncStorageKeys, getFromAsyncStorage } from "./AsyncStorageService";

const LOCATION_TASK_NAME = "background-location-task";

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
	if (error) {
		console.error(error);
		return;
	}
	if (data) {
		const { locations } = data as any;
		const location: Location.LocationObject = locations[0];
		if (location) {
			sendLocationToBackend(location);
		}
	}
});

export const startBackgroundTracking = async () => {
	 await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
	 	accuracy: Location.Accuracy.Balanced,
	 	deferredUpdatesDistance: 1000, // метры
	 	deferredUpdatesInterval: 30000, // миллисекунды
	 });
};

export const sendLocationToBackend = async (location: Location.LocationObject) => {
	console.log(location);
	if (!location?.coords?.latitude || !location?.coords?.longitude) {
		return;
	}

	const orderId = await getFromAsyncStorage(AsyncStorageKeys.TRANSPORTING_ORDER_ID);
	if (orderId) {
		sendOrderLocationOnBackend(orderId, location.coords.latitude, location.coords.longitude);
		return;
	}

	const truckId = await getFromAsyncStorage(AsyncStorageKeys.ACTIVE_TRUCK_ID);
	if (truckId) {
		sendTruckLocationOnBackend(truckId, location.coords.latitude, location.coords.longitude);
		return;
	}
};

const sendOrderLocationOnBackend = async (orderId: string, latitude: number, longitude: number) => {
	try {
		const accessToken = await getFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN);
		const config = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};

		await axios.post(
			SERVER_ADDRESS + `/TransportationOrder/add_transportation_location`,
			{
				TransportationOrderId: +orderId,
				Latitude: latitude.toString(),
				Longitude: longitude.toString(),
			},
			config,
		);
	} catch (err) {
		console.error(err);
	}
};

const sendTruckLocationOnBackend = async (truckId: string, latitude: number, longitude: number) => {
	try {
		const accessToken = await getFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN);
		const config = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};

		await axios.post(
			SERVER_ADDRESS + `/Truck/set_truck_location`,
			{
				TruckId: +truckId,
				Latitude: latitude.toString(),
				Longitude: longitude.toString(),
			},
			config,
		);
	} catch (err) {
		console.error(err);
	}
};
