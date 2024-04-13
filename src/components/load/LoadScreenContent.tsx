import * as React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Text, FlatList, Pressable, Fab, Icon, Center } from "native-base";

import { View } from "../Themed";
import { LoadView } from "./LoadView";
import { router } from "expo-router";
import { resetEditingLoad } from "../../store/slices/buildTransportationSlice";
import { ITransportation } from "../../api/transportation/Transportation";
import { AntDesign } from "@expo/vector-icons";
import { useGetTransportationsQuery } from "../../store/load/transportationApi";
import { TransportationStatus } from "../../api/transportation/TransportationStatus";

type LoadScreenContentProps = {
    isSelectionMode: boolean;
};

export default function LoadScreenContent(props: LoadScreenContentProps) {
    const { isSelectionMode } = props;

    const dispatch = useDispatch();

    const { data } = useGetTransportationsQuery();
    const filtred = data?.transportationOrderDtos.filter((o) => o.transportationStatus !== TransportationStatus.Delivered) ?? [];

    const itemPressHandler = (load: ITransportation) => {
        if (isSelectionMode) {
            router.back();
        }
    };

    const renderItem = (item: ITransportation) => (
        <Pressable onPress={() => itemPressHandler(item)} my={2}>
            <LoadView transportation={item as ITransportation} />
        </Pressable>
    );

    let content = <FlatList px={"4"} data={filtred} renderItem={(o) => renderItem(o.item)} />;

    if (filtred.length === 0) {
        content = (
            <Center h={"100%"}>
                <Text fontSize={"lg"}>Активных отправлений не найдено</Text>
            </Center>
        );
    }

    const addPressHandler = () => {
        dispatch(resetEditingLoad()); // Сбрасываем временную информацию, чтобы начать создание груза с нуля
        router.push("/EditLoadModal");
    };

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
});
