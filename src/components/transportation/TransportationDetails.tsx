import * as React from "react";
import { useSelector } from "react-redux";
import { ScrollView, Center, VStack, Text, Heading, Box, HStack, View } from "native-base";
import moment from "moment";
import { CARBODY_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/PackagingTypeToDisplayNameMap";
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

    const truckRequirements = viewedTransportation?.cargo?.truckRequirements;

    const carBodiesDisplayName = truckRequirements?.carBodies?.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
    const loadingTypeDisplayNames = truckRequirements?.loadingTypeDtos?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
    const unloadingTypesDisplayNames =
        truckRequirements?.unloadingTypeDtos?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
    const packagingTypeDisplayName = viewedTransportation?.cargo?.packagingType
        ? PACKAGING_TYPE_DISPLAY_NAME_MAP.get(viewedTransportation.cargo.packagingType)
        : undefined;

    const loadingDateFrom = moment(viewedTransportation.transferInfo?.loadingDateFrom, moment.ISO_8601);

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
                            {viewedTransportation.transferInfo.loadingAddress} → {viewedTransportation.transferInfo.unloadingAddress}
                        </Text>
                        {loadingDateFrom.isValid() ? (
                            <Text fontSize="md">{loadingDateFrom.format("DD.MM.YYYY")}</Text>
                        ) : (
                            <Text fontSize="xs" color={"error.500"}>
                                Дата не определена
                            </Text>
                        )}
                    </Box>

                    {viewedTransportation.cargo && (
                        <Box mt={4}>
                            <Heading size="sm">Груз</Heading>
                            <Box ml={4}>
                                <Center>
                                    <Text mt={2} fontSize="lg" lineHeight={"xs"}>
                                        {viewedTransportation.cargo.name}
                                    </Text>
                                </Center>
                                <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                    Вес
                                </Text>
                                <Text>{viewedTransportation.cargo.weight}т</Text>

                                <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                    Объем
                                </Text>
                                <Text>{viewedTransportation.cargo.volume}м³</Text>

                                {(viewedTransportation.cargo.length || viewedTransportation.cargo.width || viewedTransportation.cargo.height) && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Длина/Ширина/Ввысота
                                        </Text>
                                        <Text>
                                            {viewedTransportation.cargo.length}/{viewedTransportation.cargo.width}/{viewedTransportation.cargo.height}
                                        </Text>
                                    </Box>
                                )}

                                {viewedTransportation.cargo.diameter && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Диаметр
                                        </Text>
                                        <Text>{viewedTransportation.cargo.diameter}м</Text>
                                    </Box>
                                )}

                                {packagingTypeDisplayName && (
                                    <Box>
                                        <Text mt={2} fontWeight="500" color={"darkBlue.500"}>
                                            Упаковка
                                        </Text>
                                        <HStack space={1}>
                                            <Text>{packagingTypeDisplayName}</Text>
                                            {viewedTransportation.cargo.packagingQuantity && (
                                                <Text>({viewedTransportation.cargo.packagingQuantity} шт.)</Text>
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
