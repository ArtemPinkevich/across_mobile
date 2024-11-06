import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, Pressable, Input, Checkbox, VStack, Box, Text } from "native-base";
import { RootState } from "../../../store/configureStore";
import { View } from "../../../components/Themed";
import { ITruckRequirements } from "../../../api/transportation/Transportation";
import { setTruckRequirements } from "../../../store/slices/buildTransportationSlice";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../api/transportation/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { ArrowToRightSectionHoc } from "../../../components/screenItems/ArrowToRightSectionHoc";
import { ELEMENTS_BG_COLOR } from "../../../constants/Colors";

export default function TruckRequirementsModal() {
	const dispatch = useDispatch();

	const editingCargo = useSelector((state: RootState) => state.buildTransportation.editingTransportation.cargo);

	const truckRequirementsCarBodies = editingCargo.truckRequirements.carBodies;
	const truckRequiredLoadingTypes = editingCargo.truckRequirements.loadingTypeDtos;
	const truckRequiredUnloadingTypes = editingCargo.truckRequirements.unloadingTypeDtos;

	const [hasLiftgate, setHasLiftgate] = useState<boolean>(editingCargo.truckRequirements?.hasLiftgate ?? false);
	const [hasStanchionTrailer, setHasStanchionTrailer] = useState<boolean>(editingCargo.truckRequirements?.hasStanchionTrailer ?? false);
	const [carryingCapacity, setCarryingCapacity] = useState<number>(editingCargo.truckRequirements?.carryingCapacity ?? 0);
	const [hasLTL, setHasLTL] = useState<boolean>(editingCargo.truckRequirements?.hasLtl ?? false);
	const [tir, setTir] = useState<boolean>(editingCargo.truckRequirements?.tir ?? false);
	const [ekmt, setEkmt] = useState<boolean>(editingCargo.truckRequirements?.ekmt ?? false);
	const [adr1, setAdr1] = useState<boolean>(editingCargo.truckRequirements?.adr1 ?? false);
	const [adr2, setAdr2] = useState<boolean>(editingCargo.truckRequirements?.adr2 ?? false);
	const [adr3, setAdr3] = useState<boolean>(editingCargo.truckRequirements?.adr3 ?? false);
	const [adr4, setAdr4] = useState<boolean>(editingCargo.truckRequirements?.adr4 ?? false);
	const [adr5, setAdr5] = useState<boolean>(editingCargo.truckRequirements?.adr5 ?? false);
	const [adr6, setAdr6] = useState<boolean>(editingCargo.truckRequirements?.adr6 ?? false);
	const [adr7, setAdr7] = useState<boolean>(editingCargo.truckRequirements?.adr7 ?? false);
	const [adr8, setAdr8] = useState<boolean>(editingCargo.truckRequirements?.adr8 ?? false);
	const [adr9, setAdr9] = useState<boolean>(editingCargo.truckRequirements?.adr9 ?? false);

	let carBodiesDisplayName = truckRequirementsCarBodies?.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	let loadingTypeDisplayNames = truckRequiredLoadingTypes?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	let unloadingTypesDisplayNames = truckRequiredUnloadingTypes?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];

	const saveHandler = () => {
		const truckRequirements: ITruckRequirements = {
			carBodies: truckRequirementsCarBodies ?? [],
			loadingTypeDtos: truckRequiredLoadingTypes ?? [],
			unloadingTypeDtos: truckRequiredUnloadingTypes ?? [],
			hasLtl: hasLTL,
			hasLiftgate: hasLiftgate,
			hasStanchionTrailer: hasStanchionTrailer,
			carryingCapacity: carryingCapacity,
			adr1: adr1,
			adr2: adr2,
			adr3: adr3,
			adr4: adr4,
			adr5: adr5,
			adr6: adr6,
			adr7: adr7,
			adr8: adr8,
			adr9: adr9,
			tir: tir,
			ekmt: ekmt,
		};

		dispatch(setTruckRequirements(truckRequirements));
		router.push("/TransferInfoModal");
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<ScrollView px={4}>
				<VStack my={4} space={3}>
					<Box p={4} variant={"gray_card"}>
						<Text variant={"header15_gray"}>Основные</Text>

						<Pressable mt={4} onPress={() => router.push("/CarBodiesSelectListModal")}>
							<ArrowToRightSectionHoc title="Тип кузова">
								<Text ml={2} variant={"body17_black"}>
									{carBodiesDisplayName?.length > 0 ? carBodiesDisplayName.join(",\n") : "Не выбрано"}
								</Text>
							</ArrowToRightSectionHoc>
						</Pressable>

						<Pressable mt={4} onPress={() => router.push("/LoadingTypesSelectListModal")}>
							<ArrowToRightSectionHoc title="Тип загрузки">
								<Text ml={2} variant={"body17_black"}>
									{loadingTypeDisplayNames?.length > 0 ? loadingTypeDisplayNames.join(",\n") : "Не выбрано"}
								</Text>
							</ArrowToRightSectionHoc>
						</Pressable>

						<Pressable mt={4} onPress={() => router.push("/UnloadingTypesSelectListModal")}>
							<ArrowToRightSectionHoc title="Тип выгрузки">
								<Text ml={2} variant={"body17_black"}>
									{unloadingTypesDisplayNames?.length > 0 ? unloadingTypesDisplayNames.join(",\n") : "Не выбрано"}
								</Text>
							</ArrowToRightSectionHoc>
						</Pressable>

						<Text mt={4} variant={"body13"}>
							Грузоподъемность, т
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
							value={carryingCapacity?.toString() ?? ""}
							onChangeText={(o) => setCarryingCapacity(+o)}
						/>
					</Box>

					<Box p={4} variant={"gray_card"}>
						<Text mb={4} variant={"header15_gray"}>
							Доп. параметры
						</Text>
						<Checkbox value={"hasLTL"} isChecked={hasLTL} m={2} onChange={(o) => setHasLTL(o)}>
							Догруз
						</Checkbox>
						<Checkbox value={"hasLiftgate"} isChecked={hasLiftgate} m={2} onChange={(o) => setHasLiftgate(o)}>
							Гидролифт
						</Checkbox>
						<Checkbox value={"hasStanchionTrailer"} isChecked={hasStanchionTrailer} m={2} onChange={(o) => setHasStanchionTrailer(o)}>
							Коники
						</Checkbox>
					</Box>

					<Box p={4} variant={"gray_card"}>
						<Text mb={4} variant={"header15_gray"}>
							Разрешения
						</Text>
						<VStack space={4} pl={2}>
							<Checkbox value={"tir"} isChecked={tir} onChange={(o) => setTir(o)}>
								TIR
							</Checkbox>
							<Checkbox value={"ekmt"} isChecked={ekmt} onChange={(o) => setEkmt(o)}>
								EKMT
							</Checkbox>
							<Checkbox value={"adr1"} isChecked={adr1} onChange={(o) => setAdr1(o)}>
								ADR-1, Взрывчатые материалы
							</Checkbox>
							<Checkbox value={"adr2"} isChecked={adr2} onChange={(o) => setAdr2(o)}>
								ADR-2, Сжатые газы
							</Checkbox>
							<Checkbox value={"adr3"} isChecked={adr3} onChange={(o) => setAdr3(o)}>
								ADR-3, Легковоспламен. жидкости
							</Checkbox>
							<Checkbox value={"adr4"} isChecked={adr4} onChange={(o) => setAdr4(o)}>
								ADR-4, Легковоспламен. вещества
							</Checkbox>
							<Checkbox value={"adr5"} isChecked={adr5} onChange={(o) => setAdr5(o)}>
								ADR-5, Окисляющиеся вещества
							</Checkbox>
							<Checkbox value={"adr6"} isChecked={adr6} onChange={(o) => setAdr6(o)}>
								ADR-6, Ядовитые вещества
							</Checkbox>
							<Checkbox value={"adr7"} isChecked={adr7} onChange={(o) => setAdr7(o)}>
								ADR-7, Радиоактивные вещества
							</Checkbox>
							<Checkbox value={"adr8"} isChecked={adr8} onChange={(o) => setAdr8(o)}>
								ADR-8, Едкие вещества
							</Checkbox>
							<Checkbox value={"adr9"} isChecked={adr9} onChange={(o) => setAdr9(o)}>
								ADR-9, Вещества с низкой опасностью
							</Checkbox>
						</VStack>
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
