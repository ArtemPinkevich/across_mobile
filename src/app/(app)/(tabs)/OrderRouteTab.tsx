import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export default function OrderRouteTab() {
	const sourceLattitide = "56.4887526";
	const sourceLongtitude = "84.9523434";
	const destinationLattitide = "43.2363924";
	const destinationLongtitude = "76.9457275";
	const cargoLattitide = "51.2380";
	const cargoLongtitude = "80.9956";
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

		var map = L.map('map').setView([${cargoLattitide}, ${cargoLongtitude}], 6);
		mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

        var cargoIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41]
        });

        var cargo = L.marker([${cargoLattitide}, ${cargoLongtitude}], {icon: cargoIcon}).addTo(map);
		var source = L.marker([${sourceLattitide}, ${sourceLongtitude}]).addTo(map);
		var dest = L.marker([${destinationLattitide}, ${destinationLongtitude}]).addTo(map);
		L.Routing.control({
				waypoints: [
					L.latLng(${sourceLattitide}, ${sourceLongtitude}),
					L.latLng(${destinationLattitide}, ${destinationLongtitude})
				],
                lineOptions: {
                        styles: [{color: 'green', opacity: 1, weight: 5}]
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
		marginTop: Constants.statusBarHeight,
	},
});
