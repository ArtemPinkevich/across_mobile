import React from "react";
import { Pressable } from "react-native";
import { HStack, Center, Menu, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setViewedTransportation } from "../../store/slices/transportationsSlice";
import { router } from "expo-router";
import { setEditingTransportation } from "../../store/slices/buildTransportationSlice";

type TransportationJournalItemProps = {
    transportation: ITransportation;
};

export const TransportationJournalItem = (props: TransportationJournalItemProps) => {
    const { transportation } = props;
    const dispatch = useDispatch();

    const cloneHandler = () => {
        dispatch(setEditingTransportation(transportation));
        router.push("/CargoEditingModal");
    };

    const showDetailsHandler = () => {
        dispatch(setViewedTransportation(transportation));
        router.push("/OnlyInfoTransportationDetailsModal");
    };

    return (
        <Box overflow="hidden" borderColor="coolGray.200" borderWidth="1" shadow={1}>
            <HStack my={1} pl={4}>
                <VStack w="90%">
                    <Text bold fontSize="md">
                        {transportation.cargo.name}
                    </Text>
                    <Text fontSize="xs">{`${transportation.cargo.weight}т ${transportation.cargo.volume}м³`}</Text>

                    <HStack>
                        <Center>
                            <MaterialCommunityIcons name="map-marker-outline" size={12} color="blue" />
                        </Center>
                        <VStack>
                            <Text ml={5} fontSize="xs">
                                {`${moment(transportation.transferInfo.loadingDateFrom).format("DD.MM.YYYY")}`}
                            </Text>
                            <Text ml={5} fontSize="xs">
                                {transportation.transferInfo.loadingAddress}
                            </Text>
                        </VStack>
                    </HStack>

                    <HStack>
                        <Center>
                            <MaterialCommunityIcons name="map-marker" size={12} color="red" />
                        </Center>
                        <VStack>
                            {/* TODO Добавить фактическую дату доставки */}
                            <Text ml={5} fontSize="xs" color={"red.500"}>
                                Здесь будет дата доставки
                            </Text>
                            <Text ml={5} fontSize="xs">
                                {transportation.transferInfo.unloadingAddress}
                            </Text>
                        </VStack>
                    </HStack>
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
                        <Menu.Item onPress={showDetailsHandler}>Детали</Menu.Item>
                        <Menu.Item onPress={cloneHandler}>Создать копированием</Menu.Item>
                    </Menu>
                </Box>
            </HStack>
        </Box>
    );
};
