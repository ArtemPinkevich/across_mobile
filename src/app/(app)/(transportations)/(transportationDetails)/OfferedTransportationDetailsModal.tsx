import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { Center, Button, Text, HStack } from "native-base";
import { RootState } from "../../../../store/configureStore";
import { View } from "../../../../components/Themed";
import TransportationDetails from "../../../../components/transportation/TransportationDetails";

export default function OfferedTransportationDetailsModal() {
    const dispatch = useDispatch();

    const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);

    const backHandler = () => {
        router.back();
    };

    const takeHandler = () => {
        // dispatch(setTruckRequirements(truckRequirements));
        // router.push("/TransferInfoModal");
    };

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
            <Center my={2}>
                <HStack space={10}>
                    <Button minW={120} size={"md"} variant="outline" onPress={backHandler}>
                        Назад
                    </Button>
                    <Button minW={120} size={"md"} variant="outline" onPress={takeHandler}>
                        Взять груз
                    </Button>
                </HStack>
            </Center>
        </View>
    );
}
