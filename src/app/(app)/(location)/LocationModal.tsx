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
		latitude: "56.484645",
		longitude: "84.947649",
		updatedDateTime: "",
	},
	// Барнаул 53.346785, 83.776856
	destinationPoint: {
		latitude: "53.346785",
		longitude: "83.776856",
		updatedDateTime: "",
	},
	// Промежуточная точка (Залесовский район) 54.179996, 85.074036
	routePoints: [
		{
			latitude: "54.179996",
			longitude: "85.074036",
			updatedDateTime: "",
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

	if (!geoRoute?.departurePoint || !geoRoute?.destinationPoint) {
		return errorContent;
	}

	return <Osm departurePoint={geoRoute?.departurePoint} destinationPoint={geoRoute?.destinationPoint} routePoints={geoRoute?.routePoints ?? []} />;
}
