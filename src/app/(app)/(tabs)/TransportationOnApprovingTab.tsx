import * as React from "react";
import { useDispatch } from "react-redux";
import { FlatList, Pressable } from "native-base";
import { router } from "expo-router";
import { ICorrelation } from "../../../api/transportation/Transportation";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";
import { useGetOrdersInShipperApprovingQuery } from "../../../store/rtkQuery/transportationApi";
import { setViewedCorrelation } from "../../../store/slices/transportationsSlice";
import { View } from "../../../components/Themed";
import { TransportationItem } from "../../../components/transportation/TransportationItem";

export default function TransportationOnApprovingTab() {
	const dispatch = useDispatch();

	const { data: correlationsResponse } = useGetOrdersInShipperApprovingQuery(undefined, {
		pollingInterval: 20000,
	});

	const correlations: ICorrelation[] =
		correlationsResponse?.ordersInProgress?.filter(
			(o) => o.transportationOrder?.transportationOrderStatus === TransportationStatus.shipperApproving,
		) ?? [];

	const itemPressHandler = (correlation: ICorrelation) => {
		dispatch(setViewedCorrelation(correlation));
		router.push("/ShipperApprovingTransportationDetailsModal");
	};

	const renderItem = (item: ICorrelation) => (
		<Pressable onPress={() => itemPressHandler(item)} my={2}>
			<TransportationItem transportation={item.transportationOrder} isMenuVisible={false} />
		</Pressable>
	);

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			{correlations.length > 0 && <FlatList px={"4"} data={correlations} renderItem={(o) => renderItem(o.item)} />}
		</View>
	);
}
