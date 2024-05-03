import React from "react";
import { useDispatch } from "react-redux";
import { Pressable } from "react-native";
import { HStack, Center, Menu, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";
import moment from "moment";
import { TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP } from "../../api/transportation/TransportationStatusToDisplayNameMap";
import { useDeleteTransportationMutation } from "../../store/rtkQuery/transportationApi";
import { setViewedTransportation } from "../../store/slices/transportationsSlice";
import { router } from "expo-router";

type TransportationItemProps = {
    transportation: ITransportation;
};

export const TransportationItem = (props: TransportationItemProps) => {
    const { transportation } = props;
    const dispatch = useDispatch();
    const [deleteTransportation] = useDeleteTransportationMutation();

    const removeHandler = () => {
        if (transportation.transportationOrderId) {
            deleteTransportation(transportation.transportationOrderId);
        }
    };

    const showDetailsHandler = () => {
        dispatch(setViewedTransportation(transportation));
        router.push("/OnlyInfoTransportationDetailsModal");
    };

    return (
        <Box rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" shadow={1}>
            <HStack my={4} pl={4}>
                <VStack w="90%">
                    <Text bold fontSize="xl">
                        {transportation.cargo.name}
                    </Text>
                    <Text fontSize="sm">{`${transportation.cargo.weight}т ${transportation.cargo.volume}м³`}</Text>

                    <HStack mt={4}>
                        <Center>
                            <MaterialCommunityIcons name="map-marker-outline" size={17} color="blue" />
                        </Center>
                        <VStack>
                            <Text w="70%" pl={5} fontSize="lg">
                                {transportation.transferInfo.loadingAddress}
                            </Text>
                            <Text pl={5} fontSize="xs">
                                {`${moment(transportation.transferInfo.loadingDateFrom).format("DD MMMM YYYY")} - ${moment(
                                    transportation.transferInfo.loadingDateTo
                                ).format("DD MMMM YYYY")}`}
                            </Text>
                        </VStack>
                    </HStack>

                    <HStack mt={4}>
                        <Center>
                            <MaterialCommunityIcons name="map-marker" size={17} color="red" />
                        </Center>
                        <Text w="70%" pl={5} fontSize="lg">
                            {transportation.transferInfo.unloadingAddress}
                        </Text>
                    </HStack>

                    <Center mt={4} background={"blueGray.100"}>
                        <Text fontSize="xs" px={5} py={1}>
                            {TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(transportation.transportationStatus)}
                        </Text>
                    </Center>
                </VStack>

                {/* defaultIsOpen={false} чтобы не фризился экран (по мотивам https://github.com/GeekyAnts/NativeBase/issues/4730) */}
                <Box mt={4}>
                    <Menu
                        shadow={2}
                        w="150"
                        defaultIsOpen={false}
                        trigger={(triggerProps) => (
                            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                <MaterialCommunityIcons name="dots-vertical" size={17} />
                            </Pressable>
                        )}
                    >
                        <Menu.Item onPress={() => showDetailsHandler()}>Детали</Menu.Item>
                        <Menu.Item onPress={() => removeHandler()}>Удалить</Menu.Item>
                    </Menu>
                </Box>
            </HStack>
        </Box>
    );
};
