import * as React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, FlatList, Fab, Icon, Pressable } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { View } from "../Themed";
import { LoadView } from "./LoadView";
import { RootState } from "../../store/configureStore";
import { router } from "expo-router";
import { resetEditingLoad } from "../../store/slices/loadSlice";
import { ILoad } from "../../api/load/Load";

type LoadScreenContentProps = {
    isSelectionMode: boolean;
};

export default function LoadScreenContent(props: LoadScreenContentProps) {
    const { isSelectionMode } = props;

    const dispatch = useDispatch();

    const loads = useSelector((state: RootState) => state.load.loads);

    const itemPressHandler = (load: ILoad) => {
        if (isSelectionMode) {
            router.back();
        }
    };

    const addPressHandler = () => {
        dispatch(resetEditingLoad());
        router.push("/EditLoadModal");
    };

    const renderItem = ({ item }: any) => (
        <Pressable onPress={() => itemPressHandler(item)}>
            <LoadView load={item as ILoad} />
            <View style={styles.separator} />
        </Pressable>
    );

    let content = <FlatList px={"4"} data={loads} renderItem={renderItem} />;

    if (loads.length === 0) {
        content = (
            <View style={styles.imgWrap}>
                <Text style={styles.getStartedText}>Список пуст</Text>
            </View>
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
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
    },
    imgWrap: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: 300,
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#ddd",
    },
});
