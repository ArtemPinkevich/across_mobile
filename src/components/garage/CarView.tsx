import React from "react";
import { useDispatch } from "react-redux";
import { Pressable } from "react-native";
import { HStack, Center, VStack, Menu, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeCar } from "../../store/slices/garageSlice";
import { ITruck } from "../../api/truck/Truck";
import { CARBODY_DISPLAY_NAME_MAP } from "../common/selectList/CarBodyToDisplayNameMap";
import { TRAILER_TYPE_DISPLAY_NAME_MAP } from "../common/selectList/TrailerTypeToDisplayNameMap";

type CarProps = {
    truck: ITruck;
};

export const CarView = (props: CarProps) => {
    const { truck } = props;
    const dispatch = useDispatch();

    const trailerTypeDisplayName = truck?.trailerType || truck?.trailerType === 0 ? TRAILER_TYPE_DISPLAY_NAME_MAP.get(truck.trailerType) ?? "" : "";
    const carBodyDisplayName = truck?.carBody || truck?.carBody === 0 ? CARBODY_DISPLAY_NAME_MAP.get(truck.carBody) ?? "" : "";

    const removeHandler = () => {
        dispatch(removeCar(truck.createdId));
    };

    return (
        <HStack py={4} pl={4}>
            <Center>
                <MaterialCommunityIcons name="truck-outline" size={17} />
            </Center>
            <VStack pl={5} w="80%">
                <Text bold fontSize="xl">
                    {trailerTypeDisplayName}
                </Text>
                <Text>{carBodyDisplayName}</Text>
            </VStack>
            <Center>
                {/* defaultIsOpen={false} чтобы не фризился экран (по мотивам https://github.com/GeekyAnts/NativeBase/issues/4730) */}
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
                    <Menu.Item onPress={removeHandler}>Удалить</Menu.Item>
                </Menu>
            </Center>
        </HStack>
    );
};
