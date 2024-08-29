import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, FlatList, Center, Button, Pressable } from "native-base";
import { ITransportation } from "../../../api/transportation/Transportation";
import { View } from "../../../components/Themed";
import { SearchResponse } from "../../../api/search/Search";
import { useGetTrucksQuery } from "../../../store/rtkQuery/garageApi";
import { useLazySearchRecommendationsByTruckQuery } from "../../../store/rtkQuery/searchApi";
import { NeedAddTruck } from "../../../components/garage/NeedAddTruck";
import { ApiCommonResult } from "../../../api/common/commonApi";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { TransportationSearchItem } from "../../../components/transportation/TransportationSearchItem";
import { useDispatch } from "react-redux";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";

export default function RecommendationsTab() {
	const dispatch = useDispatch();
	const { data } = useGetTrucksQuery();
	const trucks = data?.trucks ?? [];

	const truck = trucks[0];
	const [transportations, setTransportations] = useState<ITransportation[]>();

	const [trigger, { data: searchResponse, isLoading, isError }] = useLazySearchRecommendationsByTruckQuery();

	useEffect(() => {
		doSearch();
	}, [truck]);

	const doSearch = async () => {
		if (truck?.truckId) {
			const result: SearchResponse = await trigger(truck.truckId).unwrap();
			console.log(result);
			if (result?.result === ApiCommonResult.Ok) {
				setTransportations(result.transportationOrders ?? []);
			} else {
				setTransportations([]);
			}
		}
	};

	const itemPressHandler = (transportation: ITransportation) => {
		dispatch(setViewedTransportation(transportation));
		router.push("/OfferedTransportationDetailsModal");
	};

	const renderItem = (item: ITransportation) => (
		<Pressable onPress={() => itemPressHandler(item)} my={1}>
			<TransportationSearchItem transportation={item} />
		</Pressable>
	);

	return trucks?.length > 0 ? (
		<View style={{ flex: 1, alignItems: "stretch", paddingHorizontal: 5 }}>
			<Button
				m={2}
				variant={"ghost"}
				isLoading={isLoading}
				onPress={() => doSearch()}
				startIcon={<MaterialCommunityIcons name="refresh" size={20} color={"#0891b2"} />}
			>
				Обновить
			</Button>
			{(isError || transportations?.length === 0) && (
				<Center flex={1}>
					<Text textAlign={"center"}>На данный момент подходящих грузов не найдено. Попробуйте воспользоваться гибким поиском.</Text>
					<Button mt={10} minW={200} onPress={() => router.replace("/SearchTab")}>
						Найти
					</Button>
				</Center>
			)}
			{!transportations ? null : transportations?.length > 0 && <FlatList data={transportations ?? []} renderItem={(o) => renderItem(o.item)} />}
		</View>
	) : (
		<NeedAddTruck />
	);
}
