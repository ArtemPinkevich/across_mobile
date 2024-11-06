import * as React from "react";
import { Text, FlatList, Center, Pressable } from "native-base";
import { ITransportation, ITransportationResult } from "../../../api/transportation/Transportation";
import { View } from "../../../components/Themed";
import { useGetOrdersHistoryQuery } from "../../../store/rtkQuery/transportationApi";
import { useDispatch } from "react-redux";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { router } from "expo-router";
import { FAKE_TRANSPORTATION_LONG } from "../../../api/search/FakeTransportationLong";
import { ApiCommonResult } from "../../../api/common/commonApi";
import { TransportationItem } from "../../../components/transportation/TransportationItem";
import { TRANSPORTATION_FAKE } from "../../../api/search/SearchResponceFake";

export default function JournalModal() {
	const { data: orders } = useGetOrdersHistoryQuery();
	const dispatch = useDispatch();

	// const orders: ITransportationResult = {
	// 	transportationOrderDtos: [TRANSPORTATION_FAKE, FAKE_TRANSPORTATION_LONG],
	// 	result: {
	// 		result: ApiCommonResult.Ok,
	// 		reasons: [],
	// 	},
	// };

	if (!orders?.transportationOrderDtos) {
		return null;
	}

	const itemPressHandler = (transportation: ITransportation) => {
		dispatch(setViewedTransportation(transportation));
		router.push("/OnlyInfoTransportationDetailsModal");
	};

	const renderItem = ({ item }: any) => (
		<Pressable onPress={() => itemPressHandler(item)} mb={3}>
			<TransportationItem transportation={item as ITransportation} isStatusVisible={false} isMenuVisible={false} />
		</Pressable>
	);

	return (
		<View style={{ flex: 1 }}>
			{orders.transportationOrderDtos.length === 0 ? (
				<Center h={"100%"}>
					<Text fontSize={"lg"}>Отправлений не найдено</Text>
				</Center>
			) : (
				<FlatList p={4} data={orders.transportationOrderDtos} renderItem={renderItem} />
			)}
		</View>
	);
}
