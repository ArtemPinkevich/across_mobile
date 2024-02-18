import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, CheckIcon, FormControl, Select, Pressable, Checkbox, Input } from "native-base";
import { addCar } from "../../../store/slices/garageSlice";
import { TrailerType } from "../../../api/truck/TrailerType";
import { ITruck } from "../../../api/truck/Truck";
import { LeftAlignedSection } from "../../../components/screenItems/LeftAlignedSection";
import { RootState } from "../../../store/configureStore";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../components/common/selectList/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../components/common/selectList/LoadingTypeToDisplayNameMap";
import { LeftAlignedWithChipsSection } from "../../../components/screenItems/LeftAlignedWithChipsSection";
import { View } from "../../../components/Themed";
import { addOrUpdateTruckRequestAsync } from "../../../api/truck/GarageApi";

export default function EditCarModal() {
    const dispatch = useDispatch();

    const editingTruсk = useSelector((state: RootState) => state.garage.editingTruсk);

    const [trailerType, setTrailerType] = useState<TrailerType | undefined>(editingTruсk.trailerType);
    const [hasLiftgate, setHasLiftgate] = useState<boolean>(editingTruсk.hasLiftgate);
    const [hasStanchionTrailer, setHasStanchionTrailer] = useState<boolean>(editingTruсk.hasStanchionTrailer);
    const [carryingCapacity, setCarryingCapacity] = useState<number>(editingTruсk.carryingCapacity);
    const [hasLTL, setHasLTL] = useState<boolean>(editingTruсk.hasLTL);
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

    const carBodyDisplayName =
        editingTruсk?.carBody || editingTruсk?.carBody === 0 ? CARBODY_DISPLAY_NAME_MAP.get(editingTruсk.carBody) ?? "Не выбрано" : "Не выбрано";

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
        if (trailerType === undefined) {
            alert("Необходимо указать тип прицепа");
            return;
        }

        if (editingTruсk?.carBody === undefined) {
            alert("Необходимо указать тип кузова");
            return;
        }

        if (editingTruсk?.loadingType?.length === 0) {
            alert("Необходимо указать тип загрузки");
            return;
        }

        const truck: ITruck = {
            createdId: new Date().toJSON(),
            trailerType: trailerType,
            carBody: editingTruсk.carBody,
            regNumber: "",
            loadingType: editingTruсk.loadingType,
            hasLTL: hasLTL,
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

        const responce = await addOrUpdateTruckRequestAsync(truck);
        if (responce) {
            dispatch(addCar(truck));
            router.back();
        } else {
            alert("Не удалось сохранить информацию в базе. Попробуйте снова или позже");
            return;
        }
    };

    const carBodySectionOnPress = () => {
        router.push("/CarBodySelectListModal");
    };

    const loadingTypeSectionOnPress = () => {
        router.push("/LoadingTypeSelectListModal");
    };

    return (
        <View style={styles.container}>
            <ScrollView mx={"2"}>
                {/* По хорошему заменить бы на RadioButtons */}
                <FormControl isRequired mb={1}>
                    <FormControl.Label>Тип прицепа</FormControl.Label>
                    <Select
                        minWidth="200"
                        accessibilityLabel="TrailerType"
                        onValueChange={(arg) => setTrailerType(+arg)}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />,
                        }}
                    >
                        <Select.Item label="Грузовик" value={TrailerType.Truck.toString()} />
                        <Select.Item label="Прицеп" value={TrailerType.Trailer.toString()} />
                        <Select.Item label="Полуприцеп" value={TrailerType.Semitrailer.toString()} />
                    </Select>
                </FormControl>

                <Pressable onPress={carBodySectionOnPress} my={1}>
                    <LeftAlignedSection title={"Тип кузова"} value={carBodyDisplayName} />
                </Pressable>

                <Pressable onPress={loadingTypeSectionOnPress} my={1}>
                    {loadingTypeDisplayNames && loadingTypeDisplayNames?.length > 0 ? (
                        <LeftAlignedWithChipsSection title={"Тип загрузки"} values={loadingTypeDisplayNames} />
                    ) : (
                        <LeftAlignedSection title={"Тип загрузки"} value="Не выбрано" />
                    )}
                </Pressable>

                <Checkbox value={"hasLiftgate"} isChecked={hasLiftgate} m={2} mt={4} onChange={(o) => setHasLiftgate(o)}>
                    Гидролифт
                </Checkbox>
                <Checkbox value={"hasStanchionTrailer"} isChecked={hasStanchionTrailer} m={2} onChange={(o) => setHasStanchionTrailer(o)}>
                    Коники
                </Checkbox>

                <FormControl my={4}>
                    <FormControl.Label>Грузоподъемность, т</FormControl.Label>
                    <Input
                        keyboardType="numeric"
                        maxLength={3}
                        variant="filled"
                        size="md"
                        placeholder="Грузоподъемность"
                        value={carryingCapacity.toString()}
                        onChangeText={(o) => setCarryingCapacity(+o)}
                    />
                    <Checkbox value={"hasLTL"} isChecked={hasLTL} m={2} onChange={(o) => setHasLTL(o)}>
                        Догруз
                    </Checkbox>
                </FormControl>

                <FormControl my={4}>
                    <FormControl.Label>Объем кузова, м3</FormControl.Label>
                    <Input
                        keyboardType="numeric"
                        maxLength={4}
                        variant="filled"
                        size="md"
                        placeholder="Объем кузова"
                        value={bodyVolume.toString()}
                        onChangeText={(o) => setBodyVolume(+o)}
                    />

                    <FormControl.Label>Длина кузова, м</FormControl.Label>
                    <Input
                        keyboardType="numeric"
                        maxLength={2}
                        variant="filled"
                        size="md"
                        placeholder="Длина кузова"
                        value={innerBodyLength.toString()}
                        onChangeText={(o) => setInnerBodyLength(+o)}
                    />

                    <FormControl.Label>Ширина кузова, м</FormControl.Label>
                    <Input
                        keyboardType="numeric"
                        maxLength={2}
                        variant="filled"
                        size="md"
                        placeholder="Ширина кузова"
                        value={innerBodyWidth.toString()}
                        onChangeText={(o) => setInnerBodyWidth(+o)}
                    />

                    <FormControl.Label>Высота кузова, м</FormControl.Label>
                    <Input
                        keyboardType="numeric"
                        maxLength={2}
                        variant="filled"
                        size="md"
                        placeholder="Высота кузова"
                        value={innerBodyHeight.toString()}
                        onChangeText={(o) => setInnerBodyHeight(+o)}
                    />
                </FormControl>

                <FormControl my={4}>
                    <FormControl.Label>Разрешения</FormControl.Label>
                    <Checkbox value={"tir"} isChecked={tir} m={2} onChange={(o) => setTir(o)}>
                        TIR
                    </Checkbox>
                    <Checkbox value={"ekmt"} isChecked={ekmt} m={2} onChange={(o) => setEkmt(o)}>
                        EKMT
                    </Checkbox>
                    <Checkbox value={"adr1"} isChecked={adr1} m={2} onChange={(o) => setAdr1(o)}>
                        ADR-1, Взрывчатые материалы
                    </Checkbox>
                    <Checkbox value={"adr2"} isChecked={adr2} m={2} onChange={(o) => setAdr2(o)}>
                        ADR-2, Сжатые газы
                    </Checkbox>
                    <Checkbox value={"adr3"} isChecked={adr3} m={2} onChange={(o) => setAdr3(o)}>
                        ADR-3, Легковоспламен. жидкости
                    </Checkbox>
                    <Checkbox value={"adr4"} isChecked={adr4} m={2} onChange={(o) => setAdr4(o)}>
                        ADR-4, Легковоспламен. вещества
                    </Checkbox>
                    <Checkbox value={"adr5"} isChecked={adr5} m={2} onChange={(o) => setAdr5(o)}>
                        ADR-5, Окисляющиеся вещества
                    </Checkbox>
                    <Checkbox value={"adr6"} isChecked={adr6} m={2} onChange={(o) => setAdr6(o)}>
                        ADR-6, Ядовитые вещества
                    </Checkbox>
                    <Checkbox value={"adr7"} isChecked={adr7} m={2} onChange={(o) => setAdr7(o)}>
                        ADR-7, Радиоактивные вещества
                    </Checkbox>
                    <Checkbox value={"adr8"} isChecked={adr8} m={2} onChange={(o) => setAdr8(o)}>
                        ADR-8, Едкие вещества
                    </Checkbox>
                    <Checkbox value={"adr9"} isChecked={adr9} m={2} onChange={(o) => setAdr9(o)}>
                        ADR-9, Вещества с низкой опасностью
                    </Checkbox>
                </FormControl>
            </ScrollView>
            <Center my={2}>
                <Button minW={200} size={"lg"} variant="outline" onPress={saveHandler}>
                    Сохранить
                </Button>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});
