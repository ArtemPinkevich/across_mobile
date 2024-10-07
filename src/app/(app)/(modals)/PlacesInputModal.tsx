import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Box, HStack, Icon, Text, Input } from "native-base";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { View } from "../../../components/Themed";
import useDebounce from "../../../components/common/useDebounce";
import { useLazyGetPlacesQuery } from "../../../store/rtkQuery/placesApi";
import { IPlace, PlacesRequest } from "../../../api/places/Places";
import { placeToDisplayStringConverter } from "../../../api/places/PlaceToDisplayStringConverter";
import { setCargoLoadingPlace, setCargoUnloadingPlace, setSearchPlaceFrom, setSearchPlaceTo } from "../../../store/slices/placesSlice";

export enum LocalitySearchTarget {
	SearchFrom = "SearchFrom",
	SearchTo = "SearchTo",
	CargoLoading = "CargoLoading",
	CargoUnloading = "CargoUnloading",
}

export default function PlacesInputModal() {
	const dispatch = useDispatch();

	const { searchTarget } = useLocalSearchParams<{ searchTarget: LocalitySearchTarget }>();

	const [typedAddress, setTypedAddress] = useState("");
	const [filtredItems, setFiltredItems] = useState<IPlace[]>([]);

	const searchKey = useDebounce(typedAddress, 1000);

	const [trigger] = useLazyGetPlacesQuery();

	useEffect(() => {
		if (searchKey) {
			getPlacesAsync(searchKey);
		} else {
			setFiltredItems([]);
		}
	}, [searchKey]);

	const getPlacesAsync = async (searchKey: string) => {
		const request: PlacesRequest = {
			searchKey: searchKey,
		};

		const result = await trigger(request);
		if (result.isSuccess) {
			setFiltredItems(result.data ?? []);
		}
	};

	const itemPressHandler = (item: IPlace) => {
		switch (searchTarget) {
			case LocalitySearchTarget.SearchFrom:
				dispatch(setSearchPlaceFrom(item));
				break;
			case LocalitySearchTarget.SearchTo:
				dispatch(setSearchPlaceTo(item));
				break;
			case LocalitySearchTarget.CargoLoading:
				dispatch(setCargoLoadingPlace(item));
				break;
			case LocalitySearchTarget.CargoUnloading:
				dispatch(setCargoUnloadingPlace(item));
				break;
		}

		router.back();
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch", padding: 16 }}>
			<Box shadow={1} borderRadius={1}>
				<Input
					placeholder="Начните вводить название города"
					autoFocus
					width="100%"
					variant={"unstyled"}
					py="3"
					px="1"
					fontSize="14"
					value={typedAddress}
					onChangeText={setTypedAddress}
					InputLeftElement={
						<Icon m="2" ml="3" size="6" color={typedAddress ? "blue.400" : "gray.400"} as={<MaterialCommunityIcons name="map-marker-outline" />} />
					}
				/>
			</Box>
			<FlatList
				data={filtredItems}
				renderItem={({ item }) => (
					<Pressable onPress={() => itemPressHandler(item)}>
						<Box
							borderBottomWidth="1"
							justifyContent={"center"}
							_dark={{
								borderColor: "gray.600",
							}}
							borderColor="coolGray.200"
							pl="4"
							pr="5"
							py="4"
						>
							<Text px="4">{item.mapDisplayName || placeToDisplayStringConverter(item)}</Text>
						</Box>
					</Pressable>
				)}
				keyExtractor={(_, index) => index.toString()}
			/>
		</View>
	);
}
