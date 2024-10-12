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

	let centerLattitide = "";
	if (cargoLatitude) {
		centerLattitide = cargoLatitude;
	} else if (sourceLattitide && destinationLattitide) {
		centerLattitide = `${(+sourceLattitide + +destinationLattitide) / 2}`;
	}

	let centerLongtitude = "";
	if (cargoLongitude) {
		centerLongtitude = cargoLongitude;
	} else if (sourceLongtitude && destinationLongtitude) {
		centerLongtitude = `${(+sourceLongtitude + +destinationLongtitude) / 2}`;
	}

	const waypoints: string[] = [];
	sourceLattitide && sourceLongtitude && waypoints.push(`L.latLng(${sourceLattitide}, ${sourceLongtitude})`);
	routePoints && routePoints.map((o) => waypoints.push(`L.latLng(${o.latitude}, ${o.longitude})`));
	destinationLattitide && destinationLongtitude && waypoints.push(`L.latLng(${destinationLattitide}, ${destinationLongtitude})`);
	const waypointsAsString = waypoints.join(", ");

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

		var map = L.map('map').setView([${centerLattitide}, ${centerLongtitude}], 8);
		mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

        var cargoIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41]
        });

        ${cargoLatitude && cargoLongitude && `L.marker([${cargoLatitude}, ${cargoLongitude}], {icon: cargoIcon}).addTo(map);`}
        
        ${sourceLattitide && sourceLongtitude && `L.marker([${sourceLattitide}, ${sourceLongtitude}]).addTo(map);`}
        ${destinationLattitide && destinationLongtitude && `L.marker([${destinationLattitide}, ${destinationLongtitude}]).addTo(map);`}
        
        ${
					waypointsAsString &&
					`
		L.Routing.control({
				waypoints: [${waypointsAsString}],
				serviceUrl: ${OSRM_SERVER_ADDRESS},
                lineOptions: {
                        styles: [{color: 'green', opacity: 1, weight: 5}]
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
