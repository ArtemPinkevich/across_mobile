import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, FlatList, Center } from "native-base";
import { ITransportation } from "../../../api/transportation/Transportation";
import { View } from "../../../components/Themed";
import { TransportationJournalItem } from "../../../components/transportation/TransportationJournalItem";
import { useGetTransportationsQuery } from "../../../store/rtkQuery/transportationApi";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";

export default function JournalTab() {
	const { data } = useGetTransportationsQuery();
	const filtred = data?.transportationOrderDtos.filter((o) => o.transportationStatus === TransportationStatus.delivered) ?? [];

	const renderItem = ({ item }: any) => <TransportationJournalItem transportation={item as ITransportation} />;

	return (
		<View style={styles.container}>
			{filtred?.length === 0 ? (
				<Center h={"100%"}>
					<Text fontSize={"lg"}>Отправлений не найдено</Text>
				</Center>
			) : (
				<FlatList data={filtred} renderItem={renderItem} />
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
