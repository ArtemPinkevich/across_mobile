import * as React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Text, FlatList, Pressable, Center, Box, Button } from "native-base";

import { View } from "../Themed";
import { TruckItem } from "./TruckItem";
import { router } from "expo-router";
import { ITruck } from "../../api/truck/Truck";
import { resetEditingTruсk } from "../../store/slices/garageSlice";
import { useGetTrucksQuery } from "../../store/rtkQuery/garageApi";
import { FAKE_TRUCK } from "../../api/truck/FakeTruck";

type TruckListProps = {
	isSelectionMode: boolean;
};

export default function TruckList(props: TruckListProps) {
	const { isSelectionMode } = props;

	const dispatch = useDispatch();

	const { data } = useGetTrucksQuery();
	const cars = data?.trucks ?? [];

	//const cars = [FAKE_TRUCK, FAKE_TRUCK];

	const itemPressHandler = (car: ITruck) => {
		if (isSelectionMode) {
			router.back();
		}
	};

	const addPressHandler = () => {
		dispatch(resetEditingTruсk());
		router.push("/EditTruckModal");
	};

	const renderItem = ({ item }: any) => (
		<Pressable m={4} onPress={() => itemPressHandler(item)}>
			<TruckItem truck={item as ITruck} />
		</Pressable>
	);

	let content = (
		<Box variant={"gray_card"}>
			<FlatList data={cars} renderItem={renderItem} />
		</Box>
	);

	if (cars.length === 0) {
		content = (
			<Center h={"100%"}>
				<Text fontSize={"lg"}>Список автомобилей пуст</Text>
			</Center>
		);
	}

	return (
		<View style={{ flex: 1, padding: 16 }}>
			{content}
			<Button my={6} variant="blue_button" onPress={addPressHandler}>
				Добавить транспорт
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
	},
	separator: {
		height: 1,
		width: "100%",
		backgroundColor: "#ddd",
	},
});
