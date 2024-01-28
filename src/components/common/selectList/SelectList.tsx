import { MaterialIcons } from '@expo/vector-icons';
import { Box, FlatList, HStack, Pressable, View, Text, Icon, Center, Button } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ISelectItem } from './SelectItem';

type SelectListProps = {
    isSelectionMode: boolean;
    data: ISelectItem[];
    selected?: ISelectItem[];
    onSaved?: (value: ISelectItem[]) => void;
};
  
export default function SelectList(props: SelectListProps) {
    const { data, selected, onSaved } = props;
    
    const [selectedItems, setSelectedItems] = useState<ISelectItem[]>(selected ?? []);

    const itemPressHandler = (item: ISelectItem) => {
        let items: ISelectItem[] = [];
        if (selectedItems.find(o => o === item) === undefined){
            items = [...selectedItems, item]
        }
        else{
            items = selectedItems.filter(o => o !== item)
        }

        setSelectedItems(items);
    };
    
    useEffect(() => {
        return () => {
            onSaved && onSaved(selectedItems);
        };
    }, []);
  
    let content = (
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Pressable key={item.value.toString()}  onPress={() => itemPressHandler(item)} >
                        <Box
                            borderBottomWidth="1"
                            justifyContent={"center"}
                            _dark={{
                            borderColor: "gray.600",
                            }}
                            borderColor="coolGray.200"
                            pl="4"
                            pr="5"
                            py="4"
                        >
                            <HStack space={3}>
                                <Center>
                                    <Icon 
                                        color={"primary.500"}
                                        size="md"
                                        as={<MaterialIcons name={selectedItems.find(o => o.value === item.value) !== undefined ? "check-box" : "check-box-outline-blank"} />} />
                                </Center>
                                <Text px="4">{item.displayName}</Text>
                            </HStack>
                        </Box>
                    </Pressable>
                )}
                keyExtractor={(item) => item.value.toString()}
            />
    )

    return (
        <View style={styles.container}>
            {content}
            <Center my={"2"}>
                <Button variant="solid" minW={200} onPress={() => router.back()}>Сохранить</Button>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
});
