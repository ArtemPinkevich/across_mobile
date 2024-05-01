import * as React from "react";
import { useSelector } from "react-redux";
import { ScrollView, Center, VStack, Text, Heading, Box, HStack, View } from "native-base";
import moment from "moment";
import { CARBODY_DISPLAY_NAME_MAP } from "../common/selectList/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../common/selectList/LoadingTypeToDisplayNameMap";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../common/selectList/PackagingTypeToDisplayNameMap";
import { RootState } from "../../store/configureStore";

export default function TransportationDetailsModal() {
    const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);

    if (!viewedTransportation) {
        return (
            <View style={{ flex: 1, alignItems: "stretch" }}>
                <Center>
                    <Text>Информация отсутствует</Text>
                </Center>
            </View>
        );
    }

    const truckRequirements = viewedTransportation?.load?.truckRequirements;

    const carBodiesDisplayName = truckRequirements?.carBodies?.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
    const loadingTypeDisplayNames = truckRequirements?.loadingType?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
    const unloadingTypesDisplayNames =
        truckRequirements?.unloadingTypes?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
    const packagingTypeDisplayName = viewedTransportation?.load?.packagingType
        ? PACKAGING_TYPE_DISPLAY_NAME_MAP.get(viewedTransportation.load.packagingType)
        : undefined;

    const additionalTruckRequirements = [];
    if (truckRequirements?.hasLtl) additionalTruckRequirements.push("Догруз");
    if (truckRequirements?.hasLiftgate) additionalTruckRequirements.push("Гидролифт");
    if (truckRequirements?.hasStanchionTrailer) additionalTruckRequirements.push("Коники");

    const dangerousGoodsRequirements = [];
    if (truckRequirements?.adr1) dangerousGoodsRequirements.push("ADR-1");
    if (truckRequirements?.adr2) dangerousGoodsRequirements.push("ADR-2");
    if (truckRequirements?.adr3) dangerousGoodsRequirements.push("ADR-3");
    if (truckRequirements?.adr4) dangerousGoodsRequirements.push("ADR-4");
    if (truckRequirements?.adr5) dangerousGoodsRequirements.push("ADR-5");
    if (truckRequirements?.adr6) dangerousGoodsRequirements.push("ADR-6");
    if (truckRequirements?.adr7) dangerousGoodsRequirements.push("ADR-7");
    if (truckRequirements?.adr8) dangerousGoodsRequirements.push("ADR-8");
    if (truckRequirements?.adr9) dangerousGoodsRequirements.push("ADR-9");
    if (truckRequirements?.tir) dangerousGoodsRequirements.push("TIR");
    if (truckRequirements?.ekmt) dangerousGoodsRequirements.push("EKMT");

    return (
        <View my={1} style={{ flex: 1, alignItems: "stretch" }}>
            <ScrollView px={4}>
                <VStack>
                    <Heading my={2} size="sm">
                        Маршрут
                    </Heading>
                    <Box ml={4}>
                        <Text fontSize="lg">
                            {viewedTransportation.loadPublishInfo.loadingAddress} → {viewedTransportation.loadPublishInfo.unloadingAddress}
                        </Text>
                        <Text fontSize="md">
                            {moment(viewedTransportation.loadPublishInfo.loadingDateFrom, moment.ISO_8601).format("DD.MM.YYYY")}
                        </Text>
                    </Box>

                    {viewedTransportation.load && (
                        <Box mt={4}>
                            <Heading size="sm">Груз</Heading>
                            <Box ml={4}>
                                <Center>
                                    <Text mt={2} fontSize="lg" lineHeight={"xs"}>
                                        {viewedTransportation.load.name}
                                    </Text>
                                </Center>
                                <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                    Вес
                                </Text>
                                <Text>{viewedTransportation.load.weight}т</Text>

                                <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                    Объем
                                </Text>
                                <Text>{viewedTransportation.load.volume}м³</Text>

                                {(viewedTransportation.load.length || viewedTransportation.load.width || viewedTransportation.load.height) && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Длина/Ширина/Ввысота
                                        </Text>
                                        <Text>
                                            {viewedTransportation.load.length}/{viewedTransportation.load.width}/{viewedTransportation.load.height}
                                        </Text>
                                    </Box>
                                )}

                                {viewedTransportation.load.diameter && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Диаметр
                                        </Text>
                                        <Text>{viewedTransportation.load.diameter}м</Text>
                                    </Box>
                                )}

                                {packagingTypeDisplayName && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Упаковка
                                        </Text>
                                        <HStack space={1}>
                                            <Text>{packagingTypeDisplayName}</Text>
                                            {viewedTransportation.load.packagingQuantity && (
                                                <Text>({viewedTransportation.load.packagingQuantity} шт.)</Text>
                                            )}
                                        </HStack>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}

                    {truckRequirements && (
                        <Box mt={4}>
                            <Heading size="sm">Транспорт</Heading>
                            <Box ml={4}>
                                <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                    Кузов
                                </Text>
                                <Text>{carBodiesDisplayName.join(", ")}</Text>

                                <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                    Загрузка/выгрузка
                                </Text>
                                <Text>{loadingTypeDisplayNames.join(", ")}</Text>
                                <Text>{unloadingTypesDisplayNames.join(", ")}</Text>

                                {truckRequirements.carryingCapacity && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Грузоподъемность
                                        </Text>
                                        <Text>{truckRequirements.carryingCapacity}т</Text>
                                    </Box>
                                )}

                                {additionalTruckRequirements.length > 0 && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Доп. требования
                                        </Text>
                                        <Text>{additionalTruckRequirements.join(", ")}</Text>
                                    </Box>
                                )}

                                {dangerousGoodsRequirements.length > 0 && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Доп. требования
                                        </Text>
                                        <Text>{dangerousGoodsRequirements.join(", ")}</Text>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </VStack>
            </ScrollView>
        </View>
    );
}
