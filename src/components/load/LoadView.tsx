import React from "react";
import { useDispatch } from "react-redux";
import { Pressable } from "react-native";
import { HStack, Center, Menu, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeLoad } from "../../store/slices/loadSlice";
import { ILoad } from "../../api/load/Load";

type LoadProps = {
    load: ILoad;
};

export const LoadView = (props: LoadProps) => {
    const { load } = props;
    const dispatch = useDispatch();

    const removeHandler = () => {
        dispatch(removeLoad(load.createdId));
    };

    return (
        <HStack py={4} pl={4}>
            <Center>
                <MaterialCommunityIcons name="package-variant-closed" size={17} />
            </Center>
            <Text pl={5} w="80%" bold fontSize="xl">
                {load.name}
            </Text>
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
