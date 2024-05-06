import React from "react";
import { HStack, Center, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";

type TransportationSearchItemProps = {
    transportation: ITransportation;
};

export const TransportationSearchItem = (props: TransportationSearchItemProps) => {
    const { transportation } = props;

    return (
        <Box overflow="hidden" borderColor="coolGray.200" borderWidth="1" shadow={1} borderRadius={5}>
            <HStack my={1} pl={4}>
                <VStack w="90%">
                    <Text bold fontSize="md">
                        {transportation.cargo.name}
                    </Text>
                    <Text fontSize="xs">{`${transportation.cargo.weight}т ${transportation.cargo.volume}м³`}</Text>

                    <HStack>
                        <Center>
                            <MaterialCommunityIcons name="map-marker-outline" size={12} color="blue" />
                        </Center>
                        <Text ml={5} fontSize="xs">
                            {transportation.transferInfo.loadingAddress}
                        </Text>
                    </HStack>

                    <HStack>
                        <Center>
                            <MaterialCommunityIcons name="map-marker" size={12} color="red" />
                        </Center>
                        <Text ml={5} fontSize="xs">
                            {transportation.transferInfo.unloadingAddress}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    );
};
