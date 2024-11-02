import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { RoutePointDto } from "../../api/places/LocationModels";
import { OSRM_SERVER_ADDRESS, SERVER_ADDRESS } from "../../constants/GlobalConstants";
import { useEffect, useState } from "react";

type Props = {
	departurePoint: RoutePointDto;
	destinationPoint: RoutePointDto;
	routePoints: RoutePointDto[];
};

export default function Osm(props: Props) {
	const { departurePoint, destinationPoint, routePoints } = props;

	// Флаг работоспособности OSRM сервиса
	// нужен, чтобы в случае недоступности OSRM, карта все ровно рисовалась хоть и без маршрутов
	const [osmServerAvailable, setOsmServerAvailable] = useState(true);

	useEffect(() => {
		(async () => {
			// Если есть хоть какой-то ответ от OSRM сервиса, то считаем, что он работоспособен
			try {
				await fetch(`${OSRM_SERVER_ADDRESS}`);
				setOsmServerAvailable(true);
			} catch (error) {
				setOsmServerAvailable(false);
			}
		})();
	}, []);

	const sourceLattitide = departurePoint.latitude;
	const sourceLongtitude = departurePoint.longitude;

	const destinationLattitide = destinationPoint.latitude;
	const destinationLongtitude = destinationPoint.longitude;

	// Если нет ни одной геопозиции грузовика, то добавляем точку отправления, чтобы хоть так отрисовать маршрут
	if (routePoints.length === 0) {
		routePoints.push(departurePoint);
	}

	const cargoPoint = routePoints.at(-1);
	const cargoLatitude = cargoPoint?.latitude;
	const cargoLongitude = cargoPoint?.longitude;

	const passedWaypoints: string[] = [];
	sourceLattitide && sourceLongtitude && passedWaypoints.push(`L.latLng(${sourceLattitide}, ${sourceLongtitude})`);
	routePoints && routePoints.map((o) => passedWaypoints.push(`L.latLng(${o.latitude}, ${o.longitude})`));
	const passedWaypointsAsString = passedWaypoints.join(", ");

	const remainingWaypoints: string[] = [];
	cargoLatitude && cargoLongitude && remainingWaypoints.push(`L.latLng(${cargoLatitude}, ${cargoLongitude})`);
	destinationLattitide && destinationLongtitude && remainingWaypoints.push(`L.latLng(${destinationLattitide}, ${destinationLongtitude})`);
	const remainingWaypointsAsString = remainingWaypoints.join(", ");

	return (
		<WebView
			style={styles.container}
			originWhitelist={["*"]}
			source={{
				html: `<!DOCTYPE html>
<html>

<head>
	<title>Geolocation</title>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
	<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />

	<style>
		body {
			margin: 0;
			padding: 0;
		}
	</style>

</head>

<body>
	<div id="map" style="width:100%; height: 100vh"></div>
	<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"></script>
	<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>


	<script>

		const cargoLattitide = ${cargoLatitude};
		const cargoLongtitude = ${cargoLongitude};
		const osrmServerAddress = "${OSRM_SERVER_ADDRESS}";
	
		var map = L.map('map').setView([cargoLattitide, cargoLongtitude], 8);
		mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

        var cargoIcon = new L.Icon({
            iconUrl: '${SERVER_ADDRESS}/File/get-truck-marker-icon',
            iconSize: [50, 50]
        });

        L.marker([cargoLattitide, cargoLongtitude], {icon: cargoIcon}).addTo(map);

        ${
					osmServerAvailable &&
					passedWaypointsAsString &&
					remainingWaypointsAsString &&
					`
            L.Routing.control({
                    serviceUrl: osrmServerAddress,
                    waypoints: [${passedWaypointsAsString}],
                    createMarker: () => { return null; },
                    lineOptions: {
                            styles: [{color: 'green', weight: 10}]
                        }
                }).addTo(map);
                
            L.Routing.control({
                    serviceUrl: osrmServerAddress,
                    waypoints: [${remainingWaypointsAsString}],
                    createMarker: () => { return null; },
                    lineOptions: {
                            styles: [{color: 'gray', weight: 10}]
                        }
                }).addTo(map);
        `
				}
	</script>
</body>
</html>`,
			}}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
