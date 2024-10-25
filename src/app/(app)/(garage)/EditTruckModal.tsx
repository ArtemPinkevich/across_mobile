import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, Pressable, Checkbox, Input, Text, Box, VStack } from "native-base";
import { ITruck, ITruckResultDto } from "../../../api/truck/Truck";
import { RootState } from "../../../store/configureStore";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../api/transportation/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { View } from "../../../components/Themed";
import { useAddOrUpdateTruckMutation } from "../../../store/rtkQuery/garageApi";
import { ApiCommonResult } from "../../../api/common/commonApi";
import { ArrowToRightSectionHoc } from "../../../components/screenItems/ArrowToRightSectionHoc";
import { ELEMENTS_BG_COLOR } from "../../../constants/Colors";
import { TRAILER_TYPE_DISPLAY_NAME_MAP } from "../../../api/transportation/toDisplayNameMappers/TrailerTypeToDisplayNameMap";

export default function EditTruckModal() {
	const [addOrUpdateTruck, { isLoading, error }] = useAddOrUpdateTruckMutation();

	const editingTruсk = useSelector((state: RootState) => state.garage.editingTruсk);

	const [hasLiftgate, setHasLiftgate] = useState<boolean>(editingTruсk.hasLiftgate);
	const [hasStanchionTrailer, setHasStanchionTrailer] = useState<boolean>(editingTruсk.hasStanchionTrailer);
	const [carryingCapacity, setCarryingCapacity] = useState<number>(editingTruсk.carryingCapacity);
	const [hasLTL, setHasLTL] = useState<boolean>(editingTruсk.hasLtl);
	const [bodyVolume, setBodyVolume] = useState<number>(editingTruсk.bodyVolume);
	const [innerBodyLength, setInnerBodyLength] = useState<number>(editingTruсk.innerBodyLength);
	const [innerBodyWidth, setInnerBodyWidth] = useState<number>(editingTruсk.innerBodyWidth);
	const [innerBodyHeight, setInnerBodyHeight] = useState<number>(editingTruсk.innerBodyHeight);
	const [tir, setTir] = useState<boolean>(editingTruсk.tir);
	const [ekmt, setEkmt] = useState<boolean>(editingTruсk.ekmt);
	const [adr1, setAdr1] = useState<boolean>(editingTruсk.adr1);
	const [adr2, setAdr2] = useState<boolean>(editingTruсk.adr2);
	const [adr3, setAdr3] = useState<boolean>(editingTruсk.adr3);
	const [adr4, setAdr4] = useState<boolean>(editingTruсk.adr4);
	const [adr5, setAdr5] = useState<boolean>(editingTruсk.adr5);
	const [adr6, setAdr6] = useState<boolean>(editingTruсk.adr6);
	const [adr7, setAdr7] = useState<boolean>(editingTruсk.adr7);
	const [adr8, setAdr8] = useState<boolean>(editingTruсk.adr8);
	const [adr9, setAdr9] = useState<boolean>(editingTruсk.adr9);

	const trailerTypeDisplayName =
		editingTruсk?.trailerType || editingTruсk?.trailerType === 0
			? TRAILER_TYPE_DISPLAY_NAME_MAP.get(editingTruсk.trailerType) ?? "Не выбрано"
			: "Не выбрано";

	const carBodyDisplayName =
		editingTruсk?.carBodyType || editingTruсk?.carBodyType === 0
			? CARBODY_DISPLAY_NAME_MAP.get(editingTruсk.carBodyType) ?? "Не выбрано"
			: "Не выбрано";

	let loadingTypeDisplayNames: string[] = [];
	if (editingTruсk?.loadingType) {
		editingTruсk.loadingType.forEach((loadingType) => {
			const loadingTypeDisplayName = LOADING_TYPE_DISPLAY_NAME_MAP.get(loadingType);
			if (loadingTypeDisplayName) {
				loadingTypeDisplayNames.push(loadingTypeDisplayName);
			}
		});
	}

	const saveHandler = async () => {
		if (editingTruсk?.trailerType === undefined) {
			alert("Необходимо указать тип прицепа");
			return;
		}

		if (editingTruсk?.carBodyType === undefined) {
			alert("Необходимо указать тип кузова");
			return;
		}

		if (!editingTruсk?.loadingType || editingTruсk.loadingType.length === 0) {
			alert("Необходимо указать тип загрузки");
			return;
		}

		if (!carryingCapacity) {
			alert("Необходимо указать грузоподъемность");
			return;
		}

		const truck: ITruck = {
			createdId: new Date().toJSON(),
			trailerType: editingTruсk.trailerType,
			carBodyType: editingTruсk.carBodyType,
			regNumber: "",
			loadingType: editingTruсk.loadingType,
			hasLtl: hasLTL,
			hasLiftgate: hasLiftgate,
			hasStanchionTrailer: hasStanchionTrailer,
			carryingCapacity: carryingCapacity,
			bodyVolume: bodyVolume,
			innerBodyLength: innerBodyLength,
			innerBodyWidth: innerBodyWidth,
			innerBodyHeight: innerBodyHeight,
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

		const responce: ITruckResultDto = await addOrUpdateTruck(truck).unwrap();
		if (responce?.result === ApiCommonResult.Ok) {
			router.push({ pathname: "/TruckPhotosModal", params: { truckId: responce.truckId } });
		} else {
			alert("Не удалось сохранить информацию в базе. Попробуйте снова или позже");
			console.log(responce?.reasons);
			return;
		}
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<ScrollView px={4}>
				<VStack my={4} space={3}>
					<Box p={4} variant={"gray_card"}>
						<Text variant={"header15_gray"}>Основные</Text>

						<Pressable mt={4} onPress={() => router.push("/TrailerTypeSelectListModal")}>
							<ArrowToRightSectionHoc title="Тип прицепа">
								<Text ml={2} variant={"body17_black"}>
									{trailerTypeDisplayName}
								</Text>
							</ArrowToRightSectionHoc>
						</Pressable>

						<Pressable mt={4} onPress={() => router.push("/CarBodySelectListModal")}>
							<ArrowToRightSectionHoc title="Тип кузова">
								<Text ml={2} variant={"body17_black"}>
									{carBodyDisplayName}
								</Text>
							</ArrowToRightSectionHoc>
						</Pressable>

						<Pressable mt={4} onPress={() => router.push("/LoadingTypeSelectListModal")}>
							<ArrowToRightSectionHoc title="Тип загрузки">
								<Text ml={2} variant={"body17_black"}>
									{loadingTypeDisplayNames?.length > 0 ? loadingTypeDisplayNames.join(",\n") : "Не выбрано"}
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
						<Text variant={"header15_gray"}>Габариты кузова</Text>

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
							value={bodyVolume?.toString() ?? ""}
							onChangeText={(o) => setBodyVolume(+o)}
						/>

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
							value={innerBodyLength?.toString() ?? ""}
							onChangeText={(o) => setInnerBodyLength(+o)}
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
							value={innerBodyWidth?.toString() ?? ""}
							onChangeText={(o) => setInnerBodyWidth(+o)}
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
							value={innerBodyHeight?.toString() ?? ""}
							onChangeText={(o) => setInnerBodyHeight(+o)}
						/>
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
				<Button variant="blue_button" isLoading={isLoading} onPress={saveHandler}>
					Продолжить
				</Button>
				{error && <Text color={"red.500"}>Не удалось выполнить операцию</Text>}
			</Center>
		</View>
	);
}
