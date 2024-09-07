import * as React from "react";
import { useDispatch } from "react-redux";
import { Text, FlatList, Pressable, Center } from "native-base";
import { router } from "expo-router";
import { ITransportation } from "../../../api/transportation/Transportation";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";
import { TransportationItem } from "../../../components/transportation/TransportationItem";
import { useGetAssignedOrdersQuery, useGetRequestedOrdersQuery } from "../../../store/rtkQuery/transportationApi";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { View } from "../../../components/Themed";

export default function DriverOrdersTab() {
	const dispatch = useDispatch();

	const { data } = useGetAssignedOrdersQuery();
	const filtred = data?.transportationOrderDtos?.filter((o) => o.transportationOrderStatus !== TransportationStatus.done) ?? [];

	const itemPressHandler = (transportation: ITransportation) => {
		dispatch(setViewedTransportation(transportation));

		if (transportation.transportationOrderStatus === TransportationStatus.transporting) {
			router.push("/InProgressTransportationDetailsModal");
		} else {
			router.push("/OnlyInfoTransportationDetailsModal");
		}
	};

	const renderItem = (item: ITransportation) => (
		<Pressable onPress={() => itemPressHandler(item)} my={2}>
			<TransportationItem transportation={item as ITransportation} isMenuVisible={false} />
		</Pressable>
	);

	let content = <FlatList px={"4"} data={filtred} renderItem={(o) => renderItem(o.item)} />;

	if (filtred.length === 0) {
		content = (
			<Center h={"100%"}>
				<Text fontSize={"lg"}>Активных перевозок не найдено</Text>
			</Center>
		);
	}

	return <View style={{ flex: 1, alignItems: "stretch" }}>{content}</View>;
}
