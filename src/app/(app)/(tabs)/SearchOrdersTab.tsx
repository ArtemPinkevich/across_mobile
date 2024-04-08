import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Button, Center, FormControl, Input, HStack } from "native-base";
import { View } from "../../../components/Themed";
import DateTimePickerWrapper from "../../../components/common/DateTimePickerWrapper";
import moment, { Moment } from "moment";
import { router } from "expo-router";

export default function SearchOrdersTab() {
    const [loadingAddress, setLoadingAddress] = useState("");
    const [unloadingAddress, setUnloadingAddress] = useState("");
    const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | undefined>(moment());
    const [loadingDateTo, setLoadingDateTo] = useState<Moment | undefined>();
    const [weight, setWeight] = useState<number>();
    const [volume, setVolume] = useState<number>();

    const saveHandler = () => {
        router.replace("/");
    };

    return (
        <View style={styles.container}>
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
                    <FormControl.Label>Даты загрузки</FormControl.Label>
                    <HStack>
                        <DateTimePickerWrapper date={loadingDateFrom} placeholder="Дата загрузки, с" onChanged={(o) => setLoadingDateFrom(o)} />
                        -
                        <DateTimePickerWrapper date={loadingDateTo} placeholder="Дата загрузки, по" onChanged={(o) => setLoadingDateTo(o)} />
                    </HStack>
                </FormControl>

                <FormControl.Label mt={2}>Вес, т</FormControl.Label>
                <HStack>
                    <Input
                        keyboardType="numeric"
                        mr={1}
                        maxLength={4}
                        variant="filled"
                        size="xs"
                        placeholder="Вес, от"
                        value={weight?.toString()}
                        onChangeText={(o) => setWeight(+o)}
                    />
                    {"_"}
                    <Input
                        keyboardType="numeric"
                        ml={1}
                        maxLength={4}
                        variant="filled"
                        size="xs"
                        placeholder="Вес, до"
                        value={weight?.toString()}
                        onChangeText={(o) => setWeight(+o)}
                    />
                </HStack>

                <FormControl.Label mt={2}>Объем, м3</FormControl.Label>
                <HStack>
                    <Input
                        keyboardType="numeric"
                        mr={1}
                        maxLength={4}
                        variant="filled"
                        size="xs"
                        placeholder="Объем, от"
                        value={volume?.toString()}
                        onChangeText={(o) => setVolume(+o)}
                    />
                    {"_"}
                    <Input
                        keyboardType="numeric"
                        ml={1}
                        maxLength={4}
                        variant="filled"
                        size="xs"
                        placeholder="Объем, до"
                        value={volume?.toString()}
                        onChangeText={(o) => setVolume(+o)}
                    />
                </HStack>
                <Center my={4}>
                    <Button minW={200} size={"md"} variant="outline" onPress={saveHandler}>
                        Найти
                    </Button>
                </Center>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
});
