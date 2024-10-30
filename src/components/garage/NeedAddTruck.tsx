import React from "react";
import { router } from "expo-router";
import { Text, Button } from "native-base";
import { useDispatch } from "react-redux";
import { resetEditingTruсk } from "../../store/slices/garageSlice";
import { View } from "../Themed";

export const NeedAddTruck = () => {
	const dispatch = useDispatch();

	const addPressHandler = () => {
		dispatch(resetEditingTruсk());
		router.push("/EditTruckModal");
	};

	return (
		<View style={{ flex: 1, padding: 16, justifyContent: "center", alignItems: "center" }}>
			<Text variant={"body17_black"} textAlign={"center"}>
				Для получения предложений необходимо добавить грузовик
			</Text>

			<Button mt={20} variant="blue_button" onPress={addPressHandler}>
				Добавить транспорт
			</Button>
		</View>
	);
};
