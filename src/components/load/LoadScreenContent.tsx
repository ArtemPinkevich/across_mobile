import * as React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, FlatList, Pressable, Fab, Icon, Center } from "native-base";

import { View } from "../Themed";
import { LoadView } from "./LoadView";
import { RootState } from "../../store/configureStore";
import { router } from "expo-router";
import { resetEditingLoad } from "../../store/slices/loadSlice";
import { ITransportation } from "../../api/load/Load";
import { AntDesign } from "@expo/vector-icons";

type LoadScreenContentProps = {
    isSelectionMode: boolean;
};

export default function LoadScreenContent(props: LoadScreenContentProps) {
    const { isSelectionMode } = props;

    const dispatch = useDispatch();

    const activeTransportation: ITransportation[] = useSelector((state: RootState) => state.load.activeTransportation);

    const itemPressHandler = (load: ITransportation) => {
        if (isSelectionMode) {
            router.back();
        }
    };

    const renderItem = ({ item }: any) => (
        <Pressable onPress={() => itemPressHandler(item)} my={2}>
            <LoadView transportation={item as ITransportation} />
        </Pressable>
    );

    let content = <FlatList px={"4"} data={activeTransportation} renderItem={renderItem} />;

    if (activeTransportation.length === 0) {
        content = (
            <Center h={"100%"}>
                <Text fontSize={"lg"}>Активных отправлений не найдено</Text>
            </Center>
        );
    }

    const addPressHandler = () => {
        dispatch(resetEditingLoad());
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
