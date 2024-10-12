import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, Input, Text, Pressable, VStack, Box } from "native-base";
import { RootState } from "../../../store/configureStore";
import { View } from "../../../components/Themed";
import { ITransferInfo, ITransportation, TransportationOrderResult } from "../../../api/transportation/Transportation";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";
import moment, { Moment } from "moment";
import DateTimePickerWrapper from "../../../components/common/DateTimePickerWrapper";
import { useAddOrUpdateTransportationMutation } from "../../../store/rtkQuery/transportationApi";
import { ApiCommonResult } from "../../../api/common/commonApi";
import { setEditingTransferInfo } from "../../../store/slices/buildTransportationSlice";
import { IPlace } from "../../../api/places/Places";
import { LocalitySearchTarget } from "../(modals)/PlacesInputModal";
import LocationTextBlock from "../../../components/location/LocationTextBlock";
import { ELEMENTS_BG_COLOR, GENERAL_BLUE_COLOR, GENERAL_RED_COLOR } from "../../../constants/Colors";

export default function TransferInfoModal() {
	const dispatch = useDispatch();
	const [addOrUpdateTransportation, { isLoading, error }] = useAddOrUpdateTransportationMutation();

	// const cargoLoadingPlace: IPlace = {
	// 	city: "Томск",
	// 	country: "Россия",
	// 	region: "Томская обл.",
	// 	latitide: "56.4887526",
	// 	longtitude: "84.9523434",
	// 	mapDisplayName: "mapDisplayName",
	// };
	// const cargoUnloadingPlace: IPlace = {
	// 	city: "Барнаул",
	// 	country: "Россия",
	// 	region: "Алтайский край",
	// 	latitide: "53.3475493",
	// 	longtitude: "83.7788448",
	// 	mapDisplayName: "mapDisplayName",
	// };

	const cargoLoadingPlace: IPlace | undefined = useSelector((state: RootState) => state.places.cargoLoadingPlace);
	const cargoUnloadingPlace: IPlace | undefined = useSelector((state: RootState) => state.places.cargoUnloadingPlace);
	const editingTransportation = useSelector((state: RootState) => state.buildTransportation.editingTransportation);
	const editingCargo = editingTransportation.cargo;
	const transferInfo = editingTransportation.transferInfo;

	const [loadingAddress, setLoadingAddress] = useState(transferInfo.loadingAddress);
	const [unloadingAddress, setUnloadingAddress] = useState(transferInfo.unloadingAddress);
	// const [loadingAddress, setLoadingAddress] = useState("Ленина, 1");
	// const [unloadingAddress, setUnloadingAddress] = useState("Невский, 1");

	const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | undefined>(moment());
	const [loadingDateTo, setLoadingDateTo] = useState<Moment | undefined>();

	const saveHandler = async () => {
		if (!cargoLoadingPlace) {
			alert("Не удалось определить город погрузки. Попробуйте снова или позже");
			return;
		}

		if (!cargoUnloadingPlace) {
			alert("Не удалось определить город выгрузки. Попробуйте снова или позже");
			return;
		}

		const newTransferInfo: ITransferInfo = {
			loadingDateFrom: loadingDateFrom?.toISOString() ?? "",
			loadingDateTo: loadingDateTo?.toISOString() ?? "",
			loadingPlace: cargoLoadingPlace,
			loadingAddress: loadingAddress,
			unloadingPlace: cargoUnloadingPlace,
			unloadingAddress: unloadingAddress,
		};

		dispatch(setEditingTransferInfo(newTransferInfo));

		const transportation: ITransportation = {
			transferInfo: newTransferInfo,
			cargo: editingCargo,
			transportationOrderStatus: TransportationStatus.carrierFinding,
			price: editingTransportation.price,
		};

		const responce: TransportationOrderResult = await addOrUpdateTransportation(transportation).unwrap();
		if (responce?.result === ApiCommonResult.Ok) {
			router.replace("/FreeTransportationsTab");
		} else {
			alert("Не удалось сохранить информацию в базе. Попробуйте снова или позже");
			console.log(responce?.reasons);
			return;
		}
	};

	const loadingPlacePressHandler = () => {
		router.navigate({ pathname: "/(app)/(modals)/PlacesInputModal", params: { searchTarget: LocalitySearchTarget.CargoLoading } });
	};

	const unloadingPlacePressHandler = () => {
		router.navigate({ pathname: "/(app)/(modals)/PlacesInputModal", params: { searchTarget: LocalitySearchTarget.CargoUnloading } });
	};

	return (
		<View style={styles.container}>
			<ScrollView px={4}>
				<VStack mb={6} space={3}>
					<Box mt={4} p={4} variant={"gray_card"}>
						<Text variant={"header20"}>Откуда</Text>

						<Pressable mt={6} onPress={loadingPlacePressHandler}>
							<LocationTextBlock place={cargoLoadingPlace} MapMarkerColor={GENERAL_BLUE_COLOR} placeholder="Город загрузки" />
						</Pressable>

						<Text mt={6} variant={"body16_gray"}>
							Адрес загрузки
						</Text>
						<Input
							mt={2}
							maxLength={300}
							bg={ELEMENTS_BG_COLOR}
							rounded={"xl"}
							fontSize={17}
							variant="filled"
							value={loadingAddress}
							onChangeText={(o) => setLoadingAddress(o)}
						/>
					</Box>

					<Box p={4} variant={"gray_card"}>
						<Text variant={"header20"}>Куда</Text>

						<Pressable mt={6} onPress={unloadingPlacePressHandler}>
							<LocationTextBlock place={cargoUnloadingPlace} MapMarkerColor={GENERAL_RED_COLOR} placeholder="Куда" />
						</Pressable>

						<Text mt={6} variant={"body16_gray"}>
							Адрес выгрузки
						</Text>
						<Input
							mt={2}
							maxLength={300}
							bg={ELEMENTS_BG_COLOR}
							rounded={"xl"}
							fontSize={17}
							variant="filled"
							value={unloadingAddress}
							onChangeText={(o) => setUnloadingAddress(o)}
						/>
					</Box>

					<Box p={4} variant={"gray_card"}>
						<Text variant={"header20"}>Когда</Text>
						<DateTimePickerWrapper date={loadingDateFrom} leftText="с" placeholder="—" onChanged={(o) => setLoadingDateFrom(o)} />
						<DateTimePickerWrapper date={loadingDateTo} leftText="по" placeholder="—" onChanged={(o) => setLoadingDateTo(o)} />
					</Box>
				</VStack>
			</ScrollView>
			<Center my={4} px={4}>
				<Button variant="blue_button" onPress={saveHandler}>
					Готово
				</Button>
				{error && <Text color={"red.500"}>Не удалось выполнить операцию</Text>}
			</Center>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
	},
});
