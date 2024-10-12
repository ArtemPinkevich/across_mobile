import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import { router } from "expo-router";
import { Text, ScrollView, Button, Center, Input, Pressable, HStack, Box, VStack, Divider, Spacer } from "native-base";
import { View } from "../../../components/Themed";
import moment, { Moment } from "moment";
import { useLazySearchTransportationsQuery } from "../../../store/rtkQuery/searchApi";
import { SearchRequest } from "../../../api/search/Search";
import { ITransportation } from "../../../api/transportation/Transportation";
import { setViewedTransportation } from "../../../store/slices/transportationsSlice";
import { LocalitySearchTarget } from "../(modals)/PlacesInputModal";
import { RootState } from "../../../store/configureStore";
import { IPlace } from "../../../api/places/Places";
import { ELEMENTS_BG_COLOR, MAP_MARKER_BLACK, GENERAL_BLUE_COLOR } from "../../../constants/Colors";
import { TransportationItem } from "../../../components/transportation/TransportationItem";
import LocationTextBlock from "../../../components/location/LocationTextBlock";
import { FAKE_PLACE_FROM } from "../../../api/search/SearchResponceFake";
import { FAKE_PLACE_TO_LONG } from "../../../api/search/FakeTransportationLong";

export default function SearchTab() {
	const dispatch = useDispatch();
	const loadingPlace: IPlace | undefined = useSelector((state: RootState) => state.places.searchPlaceFrom);
	const unloadingPlace: IPlace | undefined = useSelector((state: RootState) => state.places.searchPlaceTo);

	// const loadingPlace: IPlace | undefined = FAKE_PLACE_FROM;
	// const unloadingPlace: IPlace | undefined = FAKE_PLACE_TO_LONG;

	const [transportations, setTransportations] = useState<ITransportation[]>();
	const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | undefined>(moment());
	const [weightMin, setWeightMin] = useState<number | undefined>();
	const [weightMax, setWeightMax] = useState<number>();
	const [volumeMin, setVolumeMin] = useState<number>();
	const [volumeMax, setVolumeMax] = useState<number>();

	const [trigger, { data: searchResponse }] = useLazySearchTransportationsQuery();
	// let searchResponse: SearchResponse = searchResponseFake;
	// const [transportations, setTransportations] = useState<ITransportation[]>(searchResponse.transportationOrders);

	const resetFiltersHandler = () => {
		setWeightMin(undefined);
		setWeightMax(undefined);
		setVolumeMin(undefined);
		setVolumeMax(undefined);
		searchResponse?.transportationOrders && setTransportations(searchResponse?.transportationOrders ?? []);
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
			<TransportationItem transportation={item} isMenuVisible={false} isStatusVisible={false} />
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
			<ScrollView p={4}>
				{/* На смартфоне (expo) почему-то снизу нет отступа. Пришлось сделать <VStack mb={6} */}
				<VStack mb={6} space={4}>
					<Box p={4} variant={"gray_card"}>
						<Text variant={"header20"}>Откуда и куда</Text>

						<Pressable mt={6} onPress={loadingPlacePressHandler}>
							<LocationTextBlock place={loadingPlace} MapMarkerColor={GENERAL_BLUE_COLOR} placeholder="Откуда" />
						</Pressable>

						<Divider my={6} />

						<Pressable mb={2} onPress={unloadingPlacePressHandler}>
							<LocationTextBlock place={unloadingPlace} MapMarkerColor={MAP_MARKER_BLACK} placeholder="Куда" />
						</Pressable>
					</Box>
					{/* 
					<Box p={4} variant={"gray_card"}>
						<Text variant={"header20"}>Когда</Text>
						<DateTimePickerWrapper date={loadingDateFrom} placeholder="Дата загрузки" onChanged={(o) => setLoadingDateFrom(o)} />
					</Box> */}

					<Box p={4} variant={"gray_card"}>
						<HStack>
							<Center>
								<Text variant={"header20"}>Фильтры</Text>
							</Center>
							<Spacer />
							<Center>
								<Button size={"sm"} variant="link" onPress={resetFiltersHandler}>
									Сбросить фильтры
								</Button>
							</Center>
						</HStack>

						<Text mt={2} variant={"body16_gray"}>
							Вес, т
						</Text>
						<HStack mt={1}>
							<Input
								inputMode="numeric"
								w={"50%"}
								bg={ELEMENTS_BG_COLOR}
								mr={1}
								maxLength={4}
								variant="filled"
								rounded={"xl"}
								placeholder="0"
								fontSize={17}
								value={weightMin?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setWeightMin(+o)}
								leftElement={
									<Text variant={"body17_gray"} ml={3}>
										от
									</Text>
								}
							/>
							<Input
								inputMode="numeric"
								w={"50%"}
								bg={ELEMENTS_BG_COLOR}
								ml={1}
								maxLength={4}
								variant="filled"
								rounded={"xl"}
								placeholder="9999"
								fontSize={17}
								value={weightMax?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setWeightMax(+o)}
								leftElement={
									<Text variant={"body17_gray"} ml={3}>
										до
									</Text>
								}
							/>
						</HStack>

						<Text mt={4} variant={"body16_gray"}>
							Объем, м3
						</Text>
						<HStack mt={1}>
							<Input
								inputMode="numeric"
								w={"50%"}
								bg={ELEMENTS_BG_COLOR}
								mr={1}
								maxLength={4}
								variant="filled"
								rounded={"xl"}
								placeholder="0"
								fontSize={17}
								value={volumeMin?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setVolumeMin(+o)}
								leftElement={
									<Text variant={"body17_gray"} ml={3}>
										от
									</Text>
								}
							/>
							<Input
								inputMode="numeric"
								w={"50%"}
								bg={ELEMENTS_BG_COLOR}
								ml={1}
								maxLength={4}
								variant="filled"
								rounded={"xl"}
								placeholder="9999"
								fontSize={17}
								value={volumeMax?.toString() ?? ""}
								onBlur={applyFiltersHandler}
								onChangeText={(o) => setVolumeMax(+o)}
								leftElement={
									<Text variant={"body17_gray"} ml={3}>
										до
									</Text>
								}
							/>
						</HStack>
					</Box>

					<Button variant="blue_button" onPress={searchHandler}>
						Найти
					</Button>
					{!transportations ? null : transportations?.length > 0 ? (
						<FlatList data={transportations ?? []} renderItem={(o) => renderItem(o.item)} />
					) : (
						<Text textAlign={"center"} color={"red.500"}>
							По данному запросу отправления не найдены.
						</Text>
					)}
				</VStack>
			</ScrollView>
		</View>
	);
}
