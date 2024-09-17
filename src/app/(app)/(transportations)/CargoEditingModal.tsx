import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, FormControl, Pressable, Input } from "native-base";
import { LeftAlignedSection } from "../../../components/screenItems/LeftAlignedSection";
import { RootState } from "../../../store/configureStore";
import { View } from "../../../components/Themed";
import { PackagingType } from "../../../api/transportation/PackagingType";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../../../api/transportation/toDisplayNameMappers/PackagingTypeToDisplayNameMap";
import { ICargo } from "../../../api/transportation/Transportation";
import { setEditingCargo, setEditingPrice } from "../../../store/slices/buildTransportationSlice";

export default function CargoEditingModal() {
	const dispatch = useDispatch();

	const editingTransportation = useSelector((state: RootState) => state.buildTransportation.editingTransportation);
	const editingCargo = editingTransportation.cargo;

	const [name, setName] = useState<string>(editingCargo.name);
	const [weight, setWeight] = useState<number>(editingCargo.weight);
	const [volume, setVolume] = useState<number>(editingCargo.volume);
	const [price, setPrice] = useState<number>(editingTransportation.price);
	const [packagingQuantity, setPackagingQuantity] = useState<number | undefined>(editingCargo.packagingQuantity);
	const [length, setLength] = useState<number | undefined>(editingCargo.length);
	const [width, setWidth] = useState<number | undefined>(editingCargo.width);
	const [height, setHeight] = useState<number | undefined>(editingCargo.height);
	const [diameter, setDiameter] = useState<number | undefined>(editingCargo.diameter);

	const packagingTypeDisplayName =
		editingCargo?.packagingType || editingCargo?.packagingType === 0
			? PACKAGING_TYPE_DISPLAY_NAME_MAP.get(editingCargo.packagingType) ?? "Не выбрано"
			: "Не выбрано";

	const saveHandler = () => {
		if (!name || name === "") {
			alert("Необходимо указать название груза");
			return;
		}

		if (!weight || weight === 0) {
			alert("Необходимо указать вес груза");
			return;
		}

		if (!volume || volume === 0) {
			alert("Необходимо указать объем груза");
			return;
		}

		if (!price || price === 0) {
			alert("Необходимо указать ставку");
			return;
		}

		const cargo: ICargo = {
			createdId: new Date().toJSON(),
			name: name,
			weight: weight,
			volume: volume,
			packagingType: editingCargo.packagingType,
			packagingQuantity: packagingQuantity,
			length: length,
			width: width,
			height: height,
			diameter: diameter,
			truckRequirements: editingCargo.truckRequirements,
		};

		dispatch(setEditingCargo(cargo));
		dispatch(setEditingPrice(price));
		router.push("/TruckRequirementsModal");
	};

	const PackagingTypeSectionOnPress = () => {
		router.push("/PackagingTypeSelectListModal");
	};

	return (
		<View style={styles.container}>
			<ScrollView px={4}>
				<FormControl isRequired mb={1}>
					<FormControl.Label>Название</FormControl.Label>
					<Input maxLength={200} variant="filled" size="md" placeholder="Название" value={name} onChangeText={setName} />

					<FormControl.Label mt={2}>Вес, т</FormControl.Label>
					<Input
						keyboardType="numeric"
						maxLength={4}
						variant="filled"
						size="md"
						placeholder="Вес"
						value={weight.toString()}
						onChangeText={(o) => setWeight(+o)}
					/>

					<FormControl.Label mt={2}>Объем, м3</FormControl.Label>
					<Input
						keyboardType="numeric"
						maxLength={4}
						variant="filled"
						size="md"
						placeholder="Объем"
						value={volume.toString()}
						onChangeText={(o) => setVolume(+o)}
					/>

					<FormControl.Label mt={2}>Ставка, ₸</FormControl.Label>
					<Input
						keyboardType="numeric"
						maxLength={9}
						variant="filled"
						size="md"
						placeholder="Стоимость"
						value={price.toString()}
						onChangeText={(o) => setPrice(+o)}
					/>
				</FormControl>

				<Pressable onPress={PackagingTypeSectionOnPress} mt={2} mb={1}>
					<LeftAlignedSection title={"Тип упаковки"} value={packagingTypeDisplayName} />
				</Pressable>

				{editingCargo.packagingType === PackagingType.inBulk || editingCargo.packagingType === PackagingType.loose ? null : (
					<FormControl mb={4} mx={8}>
						<FormControl.Label>Количество, шт</FormControl.Label>
						<Input
							keyboardType="numeric"
							width={200}
							maxLength={4}
							variant="filled"
							size="md"
							placeholder="Количество"
							value={packagingQuantity?.toString()}
							onChangeText={(o) => setPackagingQuantity(+o)}
						/>
					</FormControl>
				)}

				<FormControl my={4}>
					<FormControl.Label>Длина груза, м</FormControl.Label>
					<Input
						keyboardType="numeric"
						maxLength={2}
						variant="filled"
						size="md"
						placeholder="Длина груза"
						value={length?.toString()}
						onChangeText={(o) => setLength(+o)}
					/>

					<FormControl.Label mt={2}>Ширина груза, м</FormControl.Label>
					<Input
						keyboardType="numeric"
						maxLength={2}
						variant="filled"
						size="md"
						placeholder="Ширина груза"
						value={width?.toString()}
						onChangeText={(o) => setWidth(+o)}
					/>

					<FormControl.Label mt={2}>Высота груза, м</FormControl.Label>
					<Input
						keyboardType="numeric"
						maxLength={2}
						variant="filled"
						size="md"
						placeholder="Высота груза"
						value={height?.toString()}
						onChangeText={(o) => setHeight(+o)}
					/>

					<FormControl.Label mt={4}>Диаметр груза, м</FormControl.Label>
					<Input
						keyboardType="numeric"
						maxLength={2}
						variant="filled"
						size="md"
						placeholder="Диаметр груза"
						value={diameter?.toString()}
						onChangeText={(o) => setDiameter(+o)}
					/>
				</FormControl>
			</ScrollView>
			<Center my={2}>
				<Button minW={200} size={"lg"} variant="outline" onPress={saveHandler}>
					Далее
				</Button>
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
