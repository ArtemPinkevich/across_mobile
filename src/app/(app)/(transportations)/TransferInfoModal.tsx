import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, FormControl, Input, Text, Pressable } from "native-base";
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
import { placeToDisplayStringConverter } from "../../../api/places/PlaceToDisplayStringConverter";
import { LocalitySearchTarget } from "../(modals)/PlacesInputModal";

export default function TransferInfoModal() {
	const dispatch = useDispatch();
	const [addOrUpdateTransportation, { isLoading, error }] = useAddOrUpdateTransportationMutation();

	const cargoLoadingPlace: IPlace | undefined = useSelector((state: RootState) => state.places.cargoLoadingPlace);
	const cargoUnloadingPlace: IPlace | undefined = useSelector((state: RootState) => state.places.cargoUnloadingPlace);
	const editingTransportation = useSelector((state: RootState) => state.buildTransportation.editingTransportation);
	const editingCargo = editingTransportation.cargo;
	const transferInfo = editingTransportation.transferInfo;

	const [loadingAddress, setLoadingAddress] = useState(transferInfo.loadingAddress);
	const [unloadingAddress, setUnloadingAddress] = useState(transferInfo.unloadingAddress);
	const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | undefined>(moment());
	const [loadingDateTo, setLoadingDateTo] = useState<Moment | undefined>();

	const saveHandler = async () => {
		const newTransferInfo: ITransferInfo = {
			loadingDateFrom: loadingDateFrom?.toISOString() ?? "",
			loadingDateTo: loadingDateTo?.toISOString() ?? "",
			loadingLocalityName: "",
			loadingAddress: loadingAddress,
			unloadingLocalityName: "",
			unloadingAddress: unloadingAddress,
		};

		dispatch(setEditingTransferInfo(newTransferInfo));

		const transportation: ITransportation = {
			transferInfo: newTransferInfo,
			cargo: editingCargo,
			transportationStatus: TransportationStatus.carrierFinding,
		};

		const responce: TransportationOrderResult = await addOrUpdateTransportation(transportation).unwrap();
		if (responce?.result === ApiCommonResult.Ok) {
			router.replace("/TransportationTab");
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
				<FormControl isRequired my={4}>
					<FormControl.Label>Город загрузки</FormControl.Label>
					<Pressable onPress={loadingPlacePressHandler}>
						<Input maxLength={300} variant="filled" size="md" value={cargoLoadingPlace ? placeToDisplayStringConverter(cargoLoadingPlace) : ""} />
					</Pressable>
					<FormControl.Label>Адрес загрузки</FormControl.Label>
					<Input maxLength={300} variant="filled" size="md" value={loadingAddress} onChangeText={(o) => setLoadingAddress(o)} />

					<FormControl.Label>Город выгрузки</FormControl.Label>
					<Pressable onPress={unloadingPlacePressHandler}>
						<Input maxLength={300} variant="filled" size="md" value={cargoUnloadingPlace ? placeToDisplayStringConverter(cargoUnloadingPlace) : ""} />
					</Pressable>
					<FormControl.Label mt={4}>Адрес выгрузки</FormControl.Label>
					<Input maxLength={300} variant="filled" size="md" value={unloadingAddress} onChangeText={(o) => setUnloadingAddress(o)} />
				</FormControl>

				<FormControl my={4}>
					<FormControl.Label>Даты загрузки</FormControl.Label>
					<FormControl.Label>с</FormControl.Label>
					<DateTimePickerWrapper date={loadingDateFrom} placeholder="Дата загрузки, с" onChanged={(o) => setLoadingDateFrom(o)} />
					<FormControl.Label>по</FormControl.Label>
					<DateTimePickerWrapper date={loadingDateTo} placeholder="Дата загрузки, по" onChanged={(o) => setLoadingDateTo(o)} />
				</FormControl>
			</ScrollView>
			<Center my={2}>
				<Button minW={200} size={"lg"} variant="outline" isLoading={isLoading} onPress={saveHandler}>
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
