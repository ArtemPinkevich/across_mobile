import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, Pressable, Input, VStack, Box, Text } from "native-base";
import { RootState } from "../../../store/configureStore";
import { View } from "../../../components/Themed";
import { PackagingType } from "../../../api/transportation/PackagingType";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../../../api/transportation/toDisplayNameMappers/PackagingTypeToDisplayNameMap";
import { ICargo } from "../../../api/transportation/Transportation";
import { setEditingCargo, setEditingPrice } from "../../../store/slices/buildTransportationSlice";
import { ELEMENTS_BG_COLOR } from "../../../constants/Colors";
import { ArrowToRightSectionHoc } from "../../../components/screenItems/ArrowToRightSectionHoc";

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
				<VStack my={4} space={3}>
					<Box p={4} variant={"gray_card"}>
						<Text mb={2} variant={"header15_gray"}>
							Основные
						</Text>

						<Text mt={2} variant={"body13"}>
							Наименование
						</Text>
						<Input bg={ELEMENTS_BG_COLOR} mt={1} maxLength={100} variant="filled" rounded={"xl"} fontSize={17} value={name} onChangeText={setName} />

						<Text mt={4} variant={"body13"}>
							Вес, т
						</Text>
						<Input
							inputMode="numeric"
							w={"50%"}
							bg={ELEMENTS_BG_COLOR}
							mt={1}
							maxLength={4}
							variant="filled"
							rounded={"xl"}
							fontSize={17}
							value={weight?.toString() ?? ""}
							onChangeText={(o) => setWeight(+o)}
						/>

						<Text mt={4} variant={"body13"}>
							Объем, м³
						</Text>
						<Input
							inputMode="numeric"
							w={"50%"}
							bg={ELEMENTS_BG_COLOR}
							mt={1}
							maxLength={4}
							variant="filled"
							rounded={"xl"}
							fontSize={17}
							value={volume?.toString() ?? ""}
							onChangeText={(o) => setVolume(+o)}
						/>

						<Text mt={4} variant={"body13"}>
							Ставка, ₸
						</Text>
						<Input
							inputMode="numeric"
							w={"50%"}
							bg={ELEMENTS_BG_COLOR}
							mt={1}
							maxLength={9}
							variant="filled"
							rounded={"xl"}
							fontSize={17}
							value={price?.toString() ?? ""}
							onChangeText={(o) => setPrice(+o)}
						/>
					</Box>

					<Box p={4} variant={"gray_card"}>
						<Text mb={4} variant={"header15_gray"}>
							Упаковка
						</Text>

						<Pressable onPress={PackagingTypeSectionOnPress}>
							<ArrowToRightSectionHoc title="Тип упаковки">
								<Text variant={"body17_black"}>{packagingTypeDisplayName ?? ""}</Text>
							</ArrowToRightSectionHoc>
						</Pressable>

						{editingCargo.packagingType === PackagingType.inBulk || editingCargo.packagingType === PackagingType.loose ? null : (
							<Box mt={4}>
								<Text variant={"body13"}>Количество, шт</Text>
								<Input
									inputMode="numeric"
									w={"50%"}
									bg={ELEMENTS_BG_COLOR}
									mt={1}
									maxLength={4}
									variant="filled"
									rounded={"xl"}
									fontSize={17}
									value={packagingQuantity?.toString() ?? ""}
									onChangeText={(o) => setPackagingQuantity(+o)}
								/>
							</Box>
						)}
					</Box>

					<Box p={4} variant={"gray_card"}>
						<Text mb={2} variant={"header15_gray"}>
							Габариты
						</Text>

						<Text mt={4} variant={"body13"}>
							Длина, м
						</Text>
						<Input
							inputMode="numeric"
							w={"50%"}
							bg={ELEMENTS_BG_COLOR}
							mt={1}
							maxLength={2}
							variant="filled"
							rounded={"xl"}
							fontSize={17}
							value={length?.toString() ?? ""}
							onChangeText={(o) => setLength(+o)}
						/>

						<Text mt={4} variant={"body13"}>
							Ширина, м
						</Text>
						<Input
							inputMode="numeric"
							w={"50%"}
							bg={ELEMENTS_BG_COLOR}
							mt={1}
							maxLength={2}
							variant="filled"
							rounded={"xl"}
							fontSize={17}
							value={width?.toString() ?? ""}
							onChangeText={(o) => setWidth(+o)}
						/>

						<Text mt={4} variant={"body13"}>
							Высота, м
						</Text>
						<Input
							inputMode="numeric"
							w={"50%"}
							bg={ELEMENTS_BG_COLOR}
							mt={1}
							maxLength={2}
							variant="filled"
							rounded={"xl"}
							fontSize={17}
							value={height?.toString() ?? ""}
							onChangeText={(o) => setHeight(+o)}
						/>

						<Text mt={4} variant={"body13"}>
							Диаметр, м
						</Text>
						<Input
							inputMode="numeric"
							w={"50%"}
							bg={ELEMENTS_BG_COLOR}
							mt={1}
							maxLength={2}
							variant="filled"
							rounded={"xl"}
							fontSize={17}
							value={diameter?.toString() ?? ""}
							onChangeText={(o) => setDiameter(+o)}
						/>
					</Box>
				</VStack>
			</ScrollView>
			<Center my={2} px={4}>
				<Button variant="blue_button" onPress={saveHandler}>
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
