import { MaterialIcons } from "@expo/vector-icons";
import { Box, FlatList, HStack, Pressable, Text, Icon, Center, Button } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { ISelectItem } from "./SelectItem";
import { View } from "../../Themed";

type SelectListProps = {
    data: ISelectItem[];
    onChanged: (value: ISelectItem[]) => void;
    isMultiselect?: boolean;
    defaultSelected?: ISelectItem[];
};

export default function SelectList(props: SelectListProps) {
    const { data, isMultiselect, defaultSelected, onChanged } = props;

    const [selectedItems, setSelectedItems] = useState<ISelectItem[]>(defaultSelected ?? []);

    const itemPressHandler = (item: ISelectItem) => {
        if (!isMultiselect) {
            onChanged && onChanged([item]);
            router.back();
            return;
        }

        let items: ISelectItem[] = [];
        if (selectedItems.findIndex((o) => o.value === item.value) === -1) {
            items = [...selectedItems, item];
        } else {
            items = selectedItems.filter((o) => o.value !== item.value);
        }

        setSelectedItems(items);
    };

    const saveHandler = () => {
        onChanged && onChanged(selectedItems);
        router.back();
    };

    let content = (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <Pressable key={item.value.toString()} onPress={() => itemPressHandler(item)}>
                    <Box
                        borderBottomWidth="1"
                        justifyContent={"center"}
                        _dark={{
                            borderColor: "gray.600",
                        }}
                        borderColor="coolGray.200"
                        pl="4"
                        pr="5"
                        py="4"
                    >
                        <HStack space={3}>
                            {" "}
                            {isMultiselect ? (
                                <Center>
                                    <Icon
                                        color={"primary.500"}
                                        size="md"
                                        as={
                                            <MaterialIcons
                                                name={
                                                    selectedItems.find((o) => o.value === item.value) !== undefined
                                                        ? "check-box"
                                                        : "check-box-outline-blank"
                                                }
                                            />
                                        }
                                    />
                                </Center>
                            ) : null}
                            <Text px="4">{item.displayName}</Text>
                        </HStack>
                    </Box>
                </Pressable>
            )}
            keyExtractor={(item) => item.value.toString()}
        />
    );

    return (
        <View style={styles.container}>
            {content}
            {isMultiselect ? (
                <Center my={"2"}>
                    <Button variant="solid" minW={200} onPress={saveHandler}>
                        Сохранить
                    </Button>
                </Center>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
});
