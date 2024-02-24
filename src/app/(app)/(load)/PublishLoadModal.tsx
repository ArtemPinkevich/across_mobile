import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { ScrollView, Center, Button, FormControl, Input } from "native-base";
import { RootState } from "../../../store/configureStore";
import { View } from "../../../components/Themed";
import { ILoadPublishInfo, ITransportation } from "../../../api/load/Load";
import { addActiveTransportation } from "../../../store/slices/loadSlice";
import { TransportationStatus } from "../../../api/load/TransportationStatus";
import moment, { Moment } from "moment";
import DateTimePickerWrapper from "../../../components/common/DateTimePickerWrapper";

export default function PublishLoadModal() {
    const dispatch = useDispatch();

    const editingLoad = useSelector((state: RootState) => state.load.editingLoad);

    const [loadingAddress, setLoadingAddress] = useState("");
    const [unloadingAddress, setUnloadingAddress] = useState("");
    const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | undefined>(moment());
    const [loadingDateTo, setLoadingDateTo] = useState<Moment | undefined>();

    const saveHandler = () => {
        const newLoadPublishInfo: ILoadPublishInfo = {
            loadingDateFrom: loadingDateFrom?.toISOString() ?? "",
            loadingDateTo: loadingDateTo?.toISOString() ?? "",
            loadingLocalityName: "",
            loadingAddress: loadingAddress,
            unloadingLocalityName: "",
            unloadingAddress: unloadingAddress,
        };

        const transportation: ITransportation = {
            loadPublishInfo: newLoadPublishInfo,
            load: editingLoad,
            status: TransportationStatus.readyToLoad,
        };

        dispatch(addActiveTransportation(transportation));
        router.replace("/");
    };

    return (
        <View style={styles.container}>
            <ScrollView px={4}>
                <FormControl isRequired my={4}>
                    <FormControl.Label>Адрес загрузки</FormControl.Label>
                    <Input maxLength={300} variant="filled" size="md" value={loadingAddress} onChangeText={(o) => setLoadingAddress(o)} />
                    <FormControl.Label mt={4}>Адрес выгрузки</FormControl.Label>
                    <Input maxLength={300} variant="filled" size="md" value={unloadingAddress} onChangeText={(o) => setUnloadingAddress(o)} />
                </FormControl>

                <FormControl my={4}>
                    <FormControl.Label>Даты загрузки</FormControl.Label>
                    <FormControl.Label>с</FormControl.Label>
                    <DateTimePickerWrapper date={loadingDateFrom} placeholder="Дата загрузки, с" onChanged={(o) => setLoadingDateFrom(o)} />
                    <FormControl.Label>по</FormControl.Label>
                    <DateTimePickerWrapper date={loadingDateTo} placeholder="Дата загрузки, по" onChanged={(o) => setLoadingDateTo(o)} />
                </FormControl>
            </ScrollView>
            <Center my={2}>
                <Button minW={200} size={"lg"} variant="outline" onPress={saveHandler}>
                    Готово
                </Button>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
});
