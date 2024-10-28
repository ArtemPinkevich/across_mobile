import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { RoutePointDto } from "../../api/places/LocationModels";
import { OSRM_SERVER_ADDRESS } from "../../constants/GlobalConstants";

type Props = {
	departurePoint: RoutePointDto;
	destinationPoint: RoutePointDto;
	routePoints: RoutePointDto[];
};

export default function Osm(props: Props) {
	const { departurePoint, destinationPoint, routePoints } = props;

	const sourceLattitide = departurePoint.latitude;
	const sourceLongtitude = departurePoint.longitude;

	const destinationLattitide = destinationPoint.latitude;
	const destinationLongtitude = destinationPoint.longitude;

	const cargoPoint = routePoints.at(-1);
	const cargoLatitude = cargoPoint?.latitude;
	const cargoLongitude = cargoPoint?.longitude;

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

		const sourceLattitide = ${sourceLattitide};
		const sourceLongtitude = ${sourceLongtitude};
		const destinationLattitide = ${destinationLattitide};
		const destinationLongtitude = ${destinationLongtitude};
		const cargoLattitide = ${cargoLatitude};
		const cargoLongtitude = ${cargoLongitude};
		const osrmServerAddress = "${OSRM_SERVER_ADDRESS}";
	
		var map = L.map('map').setView([cargoLattitide, cargoLongtitude], 8);
		mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

        var cargoIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [40, 80]
        });

        var cargo = L.marker([cargoLattitide, cargoLongtitude], {icon: cargoIcon}).addTo(map);
		//var source = L.marker([sourceLattitide, sourceLongtitude]).addTo(map);
		//var dest = L.marker([destinationLattitide, destinationLongtitude]).addTo(map);
		L.Routing.control({
				waypoints: [
					L.latLng(sourceLattitide, sourceLongtitude),
					L.latLng(cargoLattitide, cargoLongtitude),
					L.latLng(destinationLattitide, destinationLongtitude)
				],
				serviceUrl: osrmServerAddress,
                lineOptions: {
                        styles: [{color: 'green', opacity: 1, weight: 5}, {color: 'red', opacity: 1, weight: 5}],
						addWaypoints: false
                    }
			}).addTo(map);


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
