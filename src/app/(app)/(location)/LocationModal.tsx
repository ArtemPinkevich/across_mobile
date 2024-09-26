import Osm from "../../../components/location/Osm";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import { useGetTransportationRouteQuery } from "../../../store/rtkQuery/locationApi";
import { View } from "../../../components/Themed";
import { Center, Text } from "native-base";
import { TransportationOrderRouteResultDto } from "../../../api/places/LocationModels";

const geoRouteFake: TransportationOrderRouteResultDto = {
	// Томск 56.484645, 84.947649
	departurePoint: {
		Latitude: "56.484645",
		Longitude: "84.947649",
		UpdatedDateTime: "",
	},
	// Барнаул 53.346785, 83.776856
	destinationPoint: {
		Latitude: "53.346785",
		Longitude: "83.776856",
		UpdatedDateTime: "",
	},
	// Промежуточная точка (Залесовский район) 54.179996, 85.074036
	routePoints: [
		{
			Latitude: "54.179996",
			Longitude: "85.074036",
			UpdatedDateTime: "",
		},
	],
};

const errorContent = (
	<View style={{ flex: 1, alignItems: "stretch" }}>
		<Center h={"100%"}>
			<Text fontSize={"lg"}>Информация о маршруте не найдена</Text>
		</Center>
	</View>
);

export default function LocationModal() {
	const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);

	if (!viewedTransportation?.transportationOrderId) {
		return errorContent;
	}

	const { data: geoRoute } = useGetTransportationRouteQuery(viewedTransportation.transportationOrderId);
	//const geoRoute = geoRouteFake;

	if ((!geoRoute?.routePoints?.length || geoRoute?.routePoints?.length <= 1) && (!geoRoute?.departurePoint || !geoRoute?.destinationPoint)) {
		return errorContent;
	}

	return <Osm departurePoint={geoRoute?.departurePoint} destinationPoint={geoRoute?.destinationPoint} routePoints={geoRoute?.routePoints} />;
}
