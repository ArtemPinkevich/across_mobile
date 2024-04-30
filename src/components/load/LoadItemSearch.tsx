import React from "react";
import { HStack, Center, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";

type LoadItemSearchProps = {
    transportation: ITransportation;
};

export const LoadItemSearch = (props: LoadItemSearchProps) => {
    const { transportation } = props;

    return (
        <Box overflow="hidden" borderColor="coolGray.200" borderWidth="1" shadow={1}>
            <HStack my={1} pl={4}>
                <VStack w="90%">
                    <Text bold fontSize="md">
                        {transportation.load.name}
                    </Text>
                    <Text fontSize="xs">{`${transportation.load.weight}т ${transportation.load.volume}м³`}</Text>

                    <HStack>
                        <Center>
                            <MaterialCommunityIcons name="map-marker-outline" size={12} color="blue" />
                        </Center>
                        <Text ml={5} fontSize="xs">
                            {transportation.loadPublishInfo.loadingAddress}
                        </Text>
                    </HStack>

                    <HStack>
                        <Center>
                            <MaterialCommunityIcons name="map-marker" size={12} color="red" />
                        </Center>
                        <Text ml={5} fontSize="xs">
                            {transportation.loadPublishInfo.unloadingAddress}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    );
};
