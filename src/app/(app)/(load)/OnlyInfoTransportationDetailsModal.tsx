import * as React from "react";
import { useSelector } from "react-redux";
import { Center, Text } from "native-base";
import { RootState } from "../../../store/configureStore";
import { View } from "../../../components/Themed";
import TransportationDetails from "../../../components/load/TransportationDetails";

export default function OnlyInfoTransportationDetailsModal() {
    const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);

    if (!viewedTransportation) {
        return (
            <View style={{ flex: 1, alignItems: "stretch" }}>
                <Center>
                    <Text>Информация отсутствует</Text>
                </Center>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: "stretch" }}>
            <TransportationDetails />
        </View>
    );
}
