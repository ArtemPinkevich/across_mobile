import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import { router } from "expo-router";
import { Text, ScrollView, Button, Center, FormControl, Input, Pressable, IconButton, HStack, Box, VStack, Badge } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { View } from "../../../components/Themed";
import DateTimePickerWrapper from "../../../components/common/DateTimePickerWrapper";
import moment, { Moment } from "moment";
import { useLazySearchTransportationsQuery } from "../../../store/rtkQuery/searchApi";
import { SearchRequest } from "../../../api/search/Search";
import { ITransportation } from "../../../api/transportation/Transportation";
import { TransportationSearchItem } from "../../../components/transportation/TransportationSearchItem";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { LocalitySearchTarget } from "../(modals)/PlacesInputModal";
import { RootState } from "../../../store/configureStore";
import { placeToDisplayStringConverter } from "../../../api/places/PlaceToDisplayStringConverter";
import { IPlace } from "../../../api/places/Places";

export default function SearchTab() {
	const dispatch = useDispatch();
	const loadingPlace: IPlace | undefined = useSelector((state: RootState) => state.search.placeFrom);
	const unloadingPlace: IPlace | undefined = useSelector((state: RootState) => state.search.placeTo);

	const [transportations, setTransportations] = useState<ITransportation[]>([]);
	const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | undefined>(moment());
	const [isFiltredExpanded, setIsFiltredExpanded] = useState<boolean>(false);
	const [weightMin, setWeightMin] = useState<number | undefined>();
	const [weightMax, setWeightMax] = useState<number>();
	const [volumeMin, setVolumeMin] = useState<number>();
	const [volumeMax, setVolumeMax] = useState<number>();
	const [filterCount, setFilterCount] = useState<number>();

	const [trigger, { data: searchResponse }] = useLazySearchTransportationsQuery();
	// let searchResponse: SearchResponse = searchResponseFake;
	// const [transportations, setTransportations] = useState<ITransportation[]>(searchResponse.transportationOrders);

	useEffect(() => {
		let newFilterCount = 0;
		if ((weightMin && weightMin > 0) || (weightMax && weightMax > 0)) {
			newFilterCount++;
		}
		if ((volumeMin && volumeMin > 0) || (volumeMax && volumeMax > 0)) {
			newFilterCount++;
		}
		setFilterCount(newFilterCount);
	}, [weightMin, weightMax, volumeMin, volumeMax]);

	const resetFiltersHandler = () => {
		setWeightMin(undefined);
		setWeightMax(undefined);
		setVolumeMin(undefined);
		setVolumeMax(undefined);
		setTransportations(searchResponse?.transportationOrders ?? []);
	};

	const applyFiltersHandler = () => {
		if (!searchResponse) {
			return;
		}

		const newTransportations = searchResponse.transportationOrders.filter((o) => {
			if (weightMin && weightMin > o.cargo.weight) return;
			if (weightMax && weightMax < o.cargo.weight) return;
			if (volumeMin && volumeMin > o.cargo.volume) return;
			if (volumeMax && volumeMax < o.cargo.volume) return;

			return true;
		});
		setTransportations(newTransportations);
	};

	const searchHandler = async () => {
		if (!loadingPlace) {
			alert("Необходимо указать место отправления");
			return;
		}

		if (!loadingDateFrom) {
			alert("Необходимо указать дату загрузки");
			return;
		}

		const searchRequest: SearchRequest = {
			fromAddress: loadingPlace.city, // TODO переделать после поддержки на сервере
			toAddress: unloadingPlace?.city ?? "",
			loadingDate: loadingDateFrom.toISOString(true),
			//loadDate: moment("20240427", "YYYYMMDD").toISOString(true),
		};

		const result = await trigger(searchRequest);
		if (result.isSuccess) {
			setTransportations(result.data?.transportationOrders ?? []);
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

	const loadingPlacePressHandler = () => {
		router.navigate({ pathname: "/(app)/(modals)/PlacesInputModal", params: { searchTarget: LocalitySearchTarget.SearchFrom } });
	};

	const unloadingPlacePressHandler = () => {
		router.navigate({ pathname: "/(app)/(modals)/PlacesInputModal", params: { searchTarget: LocalitySearchTarget.SearchTo } });
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<ScrollView px={4}>
				<FormControl isRequired my={2}>
					<Pressable onPress={loadingPlacePressHandler}>
						<Input
							maxLength={300}
							variant="underlined"
							placeholder="Откуда"
							size="md"
							value={loadingPlace ? placeToDisplayStringConverter(loadingPlace) : ""}
						/>
					</Pressable>
					<Pressable onPress={unloadingPlacePressHandler}>
						<Input
							maxLength={300}
							variant="underlined"
							placeholder="Куда"
							size="md"
							value={unloadingPlace ? placeToDisplayStringConverter(unloadingPlace) : ""}
						/>
					</Pressable>
				</FormControl>

				<FormControl my={2}>
					<FormControl.Label>Дата загрузки</FormControl.Label>
					<DateTimePickerWrapper date={loadingDateFrom} placeholder="Дата загрузки" onChanged={(o) => setLoadingDateFrom(o)} />
				</FormControl>

				<Pressable my={2} onPress={() => setIsFiltredExpanded(!isFiltredExpanded)}>
					<HStack>
						<VStack>
							{filterCount && filterCount > 0 ? (
								<Badge
									colorScheme="red"
									rounded="full"
									mb={-4}
									mr={-4}
									zIndex={1}
									variant="solid"
									alignSelf="flex-end"
									_text={{
										fontSize: 12,
									}}
								>
									{filterCount}
								</Badge>
							) : null}

							<IconButton variant={"outline"} _icon={{ as: AntDesign, name: "filter" }} size={7} />
						</VStack>

						<Center>
							<Text ml={5} fontSize="sm" color={"blueGray.500"}>
								Параметры
							</Text>
						</Center>
					</HStack>
				</Pressable>

				{isFiltredExpanded ? (
					<Box>
						<Center alignItems={"end"}>
							<Button size={"sm"} variant="link" onPress={resetFiltersHandler}>
								Сбросить фильтры
							</Button>
						</Center>
						<FormControl.Label mt={2}>Вес, т</FormControl.Label>
						<HStack>
							<Input
								inputMode="numeric"
								mr={1}
								maxLength={4}
								variant="filled"
								size="xs"
								placeholder="Вес, от"
								value={weightMin?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setWeightMin(+o)}
							/>
							{"_"}
							<Input
								inputMode="numeric"
								ml={1}
								maxLength={4}
								variant="filled"
								size="xs"
								placeholder="Вес, до"
								value={weightMax?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setWeightMax(+o)}
							/>
						</HStack>

						<FormControl.Label mt={2}>Объем, м3</FormControl.Label>
						<HStack>
							<Input
								inputMode="numeric"
								mr={1}
								maxLength={4}
								variant="filled"
								size="xs"
								placeholder="Объем, от"
								value={volumeMin?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setVolumeMin(+o)}
							/>
							{"_"}
							<Input
								inputMode="numeric"
								ml={1}
								maxLength={4}
								variant="filled"
								size="xs"
								placeholder="Объем, до"
								value={volumeMax?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setVolumeMax(+o)}
							/>
						</HStack>
					</Box>
				) : null}

				<Center my={4}>
					<Button minW={200} size={"md"} variant="outline" onPress={searchHandler}>
						Найти
					</Button>
				</Center>
				<FlatList data={transportations ?? []} renderItem={(o) => renderItem(o.item)} />
			</ScrollView>
		</View>
	);
}
