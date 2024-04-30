import * as React from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import { ScrollView, Button, Center, FormControl, Input } from "native-base";
import { View } from "../../../components/Themed";
import DateTimePickerWrapper from "../../../components/common/DateTimePickerWrapper";
import moment, { Moment } from "moment";
import { useLazySearchTransportationsQuery } from "../../../store/search/searchApi";
import { SearchRequest } from "../../../api/search/Search";
import { ITransportation } from "../../../api/transportation/Transportation";
import { LoadItemSearch } from "../../../components/load/LoadItemSearch";

export default function SearchOrdersTab() {
    const [loadingAddress, setLoadingAddress] = useState("");
    const [unloadingAddress, setUnloadingAddress] = useState("");
    const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | undefined>(moment());

    const [trigger, { data: searchResponse }] = useLazySearchTransportationsQuery();

    const searchHandler = () => {
        if (!loadingAddress) {
            alert("Необходимо указать место отправления");
            return;
        }

        if (!unloadingAddress) {
            alert("Необходимо указать пункт назначения");
            return;
        }

        if (!loadingDateFrom) {
            alert("Необходимо указать дау загрузки");
            return;
        }

        const searchRequest: SearchRequest = {
            fromAddress: loadingAddress,
            toAddress: unloadingAddress,
            loadDate: loadingDateFrom.toISOString(true),
        };

        trigger(searchRequest);
    };

    const renderItem = ({ item }: any) => <LoadItemSearch transportation={item as ITransportation} />;

    return (
        <View style={{ flex: 1, alignItems: "stretch" }}>
            <ScrollView px={4}>
                <FormControl isRequired my={2}>
                    <Input
                        maxLength={300}
                        variant="underlined"
                        placeholder="Откуда"
                        size="md"
                        value={loadingAddress}
                        onChangeText={(o) => setLoadingAddress(o)}
                    />
                    <Input
                        maxLength={300}
                        variant="underlined"
                        placeholder="Куда"
                        size="md"
                        value={unloadingAddress}
                        onChangeText={(o) => setUnloadingAddress(o)}
                    />
                </FormControl>

                <FormControl my={2}>
                    <FormControl.Label>Дата загрузки</FormControl.Label>
                    <DateTimePickerWrapper date={loadingDateFrom} placeholder="Дата загрузки" onChanged={(o) => setLoadingDateFrom(o)} />
                </FormControl>

                <Center my={4}>
                    <Button minW={200} size={"md"} variant="outline" onPress={searchHandler}>
                        Найти
                    </Button>
                </Center>

                <FlatList data={searchResponse?.transportationOrders ?? []} renderItem={renderItem} />
            </ScrollView>
        </View>
    );
}
