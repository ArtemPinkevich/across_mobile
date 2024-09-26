import * as React from "react";
import { useDispatch } from "react-redux";
import { Text, FlatList, Pressable, Center } from "native-base";
import { router } from "expo-router";
import { ITransportation } from "../../../api/transportation/Transportation";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { View } from "../../../components/Themed";
import { TransportationItem } from "../../../components/transportation/TransportationItem";
import { useGetShipperTransportationsQuery } from "../../../store/rtkQuery/transportationApi";

export default function ShipperOrdersInProgressTab() {
	const dispatch = useDispatch();

	const { data } = useGetShipperTransportationsQuery(undefined, {
		pollingInterval: 10000,
	});
	const filtred =
		data?.transportationOrderDtos?.filter(
			(o) =>
				o.transportationOrderStatus === TransportationStatus.waitingForLoading ||
				o.transportationOrderStatus === TransportationStatus.loading ||
				o.transportationOrderStatus === TransportationStatus.transporting ||
				o.transportationOrderStatus === TransportationStatus.unloading ||
				o.transportationOrderStatus === TransportationStatus.delivered,
		) ?? [];

	const itemPressHandler = (transportation: ITransportation) => {
		dispatch(setViewedTransportation(transportation));
		router.push("/OnlyInfoTransportationDetailsModal");
	};

	const renderItem = (item: ITransportation) => (
		<Pressable onPress={() => itemPressHandler(item)} my={2}>
			<TransportationItem transportation={item as ITransportation} />
		</Pressable>
	);

	let content = <FlatList px={"4"} data={filtred} renderItem={(o) => renderItem(o.item)} />;

	if (filtred.length === 0) {
		content = (
			<Center h={"100%"}>
				<Text fontSize={"lg"}>Активных отправлений не найдено</Text>
			</Center>
		);
	}

	return <View style={{ flex: 1, alignItems: "stretch" }}>{content}</View>;
}
