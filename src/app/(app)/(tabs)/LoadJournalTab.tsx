import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, FlatList, Center } from "native-base";
import { ITransportation } from "../../../api/transportation/Transportation";
import { View } from "../../../components/Themed";
import { LoadJournalItem } from "../../../components/load/LoadJournalItem";
import { useGetTransportationsQuery } from "../../../store/load/transportationApi";
import { TransportationStatus } from "../../../api/transportation/TransportationStatus";

export default function LoadJournalTab() {
    const { data } = useGetTransportationsQuery();
    const filtred = data?.transportationOrderDtos.filter((o) => o.transportationStatus === TransportationStatus.Delivered) ?? [];

    const renderItem = ({ item }: any) => <LoadJournalItem transportation={item as ITransportation} />;

    return (
        <View style={styles.container}>
            {filtred?.length === 0 ? (
                <Center h={"100%"}>
                    <Text fontSize={"lg"}>Отправлений не найдено</Text>
                </Center>
            ) : (
                <FlatList data={filtred} renderItem={renderItem} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
});
