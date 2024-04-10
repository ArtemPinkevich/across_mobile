import * as React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Text, FlatList, Fab, Icon, Pressable, Center } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { View } from "../../components/Themed";
import { CarView } from "./CarView";
import { router } from "expo-router";
import { ITruck } from "../../api/truck/Truck";
import { resetEditingTruсk } from "../../store/slices/garageSlice";
import { useGetTrucksQuery } from "../../store/garage/garageApi";

type CarScreenContentProps = {
    isSelectionMode: boolean;
};

export default function CarScreenContent(props: CarScreenContentProps) {
    const { isSelectionMode } = props;

    const dispatch = useDispatch();

    const { data } = useGetTrucksQuery();
    const cars = data?.trucks ?? [];

    const itemPressHandler = (car: ITruck) => {
        if (isSelectionMode) {
            router.back();
        }
    };

    const addPressHandler = () => {
        dispatch(resetEditingTruсk());
        router.push("/EditCarModal");
    };

    const renderItem = ({ item }: any) => (
        <Pressable onPress={() => itemPressHandler(item)}>
            <CarView truck={item as ITruck} />
            <View style={styles.separator} />
        </Pressable>
    );

    let content = <FlatList px={"4"} data={cars} renderItem={renderItem} />;

    if (cars.length === 0) {
        content = (
            <Center h={"100%"}>
                <Text fontSize={"lg"}>Список автомобилей пуст</Text>
            </Center>
        );
    }

    return (
        <View style={styles.container}>
            {content}
            <Fab
                position="absolute"
                placement="bottom-right"
                icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
                renderInPortal={false}
                onPress={addPressHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#ddd",
    },
});
