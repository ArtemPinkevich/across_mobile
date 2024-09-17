import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, FlatList, Center, Pressable } from "native-base";
import { ITransportation } from "../../../api/transportation/Transportation";
import { View } from "../../../components/Themed";
import { TransportationJournalItem } from "../../../components/transportation/TransportationJournalItem";
import { useGetOrdersHistoryQuery } from "../../../store/rtkQuery/transportationApi";
import { useDispatch } from "react-redux";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { router } from "expo-router";

export default function JournalModal() {
	const { data: orders } = useGetOrdersHistoryQuery();
	const dispatch = useDispatch();

	if (!orders?.transportationOrderDtos) {
		return null;
	}

	const itemPressHandler = (transportation: ITransportation) => {
		dispatch(setViewedTransportation(transportation));
		router.push("/OnlyInfoTransportationDetailsModal");
	};

	const renderItem = ({ item }: any) => (
		<Pressable onPress={() => itemPressHandler(item)} my={2}>
			<TransportationJournalItem transportation={item as ITransportation} />
		</Pressable>
	);

	return (
		<View style={styles.container}>
			{orders.transportationOrderDtos.length === 0 ? (
				<Center h={"100%"}>
					<Text fontSize={"lg"}>Отправлений не найдено</Text>
				</Center>
			) : (
				<FlatList data={orders.transportationOrderDtos} renderItem={renderItem} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
	},
});
