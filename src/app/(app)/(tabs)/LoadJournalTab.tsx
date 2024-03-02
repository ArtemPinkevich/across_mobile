import * as React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Text, FlatList, Center } from "native-base";
import { ITransportation } from "../../../api/load/Load";
import { RootState } from "../../../store/configureStore";
import { View } from "../../../components/Themed";
import { LoadJournalItem } from "../../../components/load/LoadJournalItem";

export default function LoadJournalTab() {
    const transportationJournal: ITransportation[] = useSelector((state: RootState) => state.load.transportationJournal);

    const renderItem = ({ item }: any) => <LoadJournalItem transportation={item as ITransportation} />;

    let content = <FlatList data={transportationJournal} renderItem={renderItem} />;

    if (transportationJournal.length === 0) {
        content = (
            <Center h={"100%"}>
                <Text fontSize={"lg"}>Отправлений не найдено</Text>
            </Center>
        );
    }

    return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
});
