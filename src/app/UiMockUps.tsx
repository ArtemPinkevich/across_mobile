import { VStack } from "native-base";
import { View } from "react-native";
import CircleCheckSvg from "../components/svg/CircleCheckSvg";
import ClockSvg from "../components/svg/ClockSvg";
import DriverRecommendationsTabSvg from "../components/svg/DriverRecommendationsTabSvg";
import DriverRequestsTabSvg from "../components/svg/DriverRequestsTabSvg";
import EditSvg from "../components/svg/EditSvg";
import MapMarkerSvg from "../components/svg/MapMarkerSvg";
import SearchSvg from "../components/svg/SearchSvg";
import TruckSvg from "../components/svg/TruckSvg";
import UserSvg from "../components/svg/UserSvg";
import BackButtonSvg from "../components/svg/BackButtonSvg";
import ChevronRightSmallSvg from "../components/svg/ChevronRightSmallSvg";

export default function UiMockUps() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<VStack space={2}>
				<CircleCheckSvg />
				<ClockSvg />
				<DriverRecommendationsTabSvg />
				<DriverRequestsTabSvg />
				<EditSvg />
				<MapMarkerSvg color={"#000"} />
				<SearchSvg />
				<TruckSvg color={"#000"} />
				<UserSvg />
				<BackButtonSvg />
				<ChevronRightSmallSvg />
			</VStack>
		</View>
	);
}
