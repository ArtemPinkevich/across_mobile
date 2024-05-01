import React from "react";
import { Pressable } from "react-native";
import { HStack, Center, Menu, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setViewedTransportation } from "../../store/slices/transportationsSlice";
import { router } from "expo-router";

type LoadJournalItemProps = {
    transportation: ITransportation;
};

export const LoadJournalItem = (props: LoadJournalItemProps) => {
    const { transportation } = props;
    const dispatch = useDispatch();

    const cloneHandler = () => {};

    const showDetailsHandler = () => {
        dispatch(setViewedTransportation(transportation));
        router.push("/OnlyInfoTransportationDetailsModal");
    };

    return (
        <Box overflow="hidden" borderColor="coolGray.200" borderWidth="1" shadow={1}>
            <HStack my={1} pl={4}>
                <VStack w="90%">
                    <Text bold fontSize="md">
                        {transportation.load.name}
                    </Text>
                    <Text fontSize="xs">{`${transportation.load.weight}т ${transportation.load.volume}м³`}</Text>

                    <HStack>
                        <Center>
                            <MaterialCommunityIcons name="map-marker-outline" size={12} color="blue" />
                        </Center>
                        <VStack>
                            <Text ml={5} fontSize="xs">
                                {`${moment(transportation.loadPublishInfo.loadingDateFrom).format("DD.MM.YYYY")}`}
                            </Text>
                            <Text ml={5} fontSize="xs">
                                {transportation.loadPublishInfo.loadingAddress}
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
                                {transportation.loadPublishInfo.unloadingAddress}
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
                        <Menu.Item onPress={cloneHandler}>Удалить</Menu.Item>
                    </Menu>
                </Box>
            </HStack>
        </Box>
    );
};
