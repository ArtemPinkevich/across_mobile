import * as React from "react";
import { useDispatch } from "react-redux";
import { Text, FlatList, Pressable, Fab, Icon, Center } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { ITransportation } from "../../../api/transportation/Transportation";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";
import { TransportationItem } from "../../../components/transportation/TransportationItem";
import { useGetTransportationsQuery } from "../../../store/rtkQuery/transportationApi";
import { resetEditingTransportation } from "../../../store/slices/buildTransportationSlice";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { View } from "../../../components/Themed";

export default function TransportationTab() {
	const dispatch = useDispatch();

	const { data } = useGetTransportationsQuery();
	const filtred = data?.transportationOrderDtos.filter((o) => o.transportationStatus !== TransportationStatus.delivered) ?? [];

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

	const addPressHandler = () => {
		dispatch(resetEditingTransportation()); // Сбрасываем временную информацию, чтобы начать создание груза с нуля
		router.push("/CargoEditingModal");
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			{content}
			<Fab
				position="absolute"
				placement="bottom-right"
				bgColor={"blue.500"}
				icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
				renderInPortal={false}
				onPress={addPressHandler}
			/>
		</View>
	);
}
