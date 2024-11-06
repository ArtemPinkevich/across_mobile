import * as React from "react";
import { useDispatch } from "react-redux";
import { Text, FlatList, Pressable, Center } from "native-base";
import { router } from "expo-router";
import { ITransportation } from "../../../api/transportation/Transportation";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";
import { TransportationItem } from "../../../components/transportation/TransportationItem";
import { useGetAssignedOrdersQuery } from "../../../store/rtkQuery/transportationApi";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { View } from "../../../components/Themed";
import { TRANSPORTATION_FAKE } from "../../../api/search/SearchResponceFake";
import { FAKE_TRANSPORTATION_LONG } from "../../../api/search/FakeTransportationLong";

export default function DriverOrdersTab() {
	const dispatch = useDispatch();

	const { data } = useGetAssignedOrdersQuery(undefined, {
		pollingInterval: 30000,
	});
	const filtred = data?.transportationOrderDtos?.filter((o) => o?.transportationOrderStatus !== TransportationStatus.done) ?? [];

	//const filtred = [TRANSPORTATION_FAKE, FAKE_TRANSPORTATION_LONG];

	const itemPressHandler = (transportation: ITransportation) => {
		dispatch(setViewedTransportation(transportation));

		if (
			transportation.transportationOrderStatus === TransportationStatus.waitingForLoading ||
			transportation.transportationOrderStatus === TransportationStatus.loading ||
			transportation.transportationOrderStatus === TransportationStatus.transporting ||
			transportation.transportationOrderStatus === TransportationStatus.unloading
		) {
			router.push("/InProgressTransportationDetailsModal");
		} else {
			router.push("/OnlyInfoTransportationDetailsModal");
		}
	};

	const renderItem = (item: ITransportation) => (
		<Pressable onPress={() => itemPressHandler(item)} mb={3}>
			<TransportationItem transportation={item as ITransportation} isMenuVisible={false} />
		</Pressable>
	);

	let content = <FlatList pt={4} px={4} data={filtred} renderItem={(o) => renderItem(o.item)} />;

	if (filtred.length === 0) {
		content = (
			<Center h={"100%"}>
				<Text variant={"body17_black"} textAlign={"center"}>
					Активных перевозок не найдено
				</Text>
			</Center>
		);
	}

	return <View style={{ flex: 1, alignItems: "stretch", paddingBottom: 4 }}>{content}</View>;
}
