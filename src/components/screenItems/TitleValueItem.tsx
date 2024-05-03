import React from "react";
import { Text, Box, Stack } from "native-base";

type Props = {
    title: string;
    value: string;
};

export const TitleAndValueItem = ({ title, value }: Props) => {
    return (
        <Box
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
            }}
            _light={{
                backgroundColor: "gray.50",
            }}
        >
            <Stack p="4" space={1}>
                <Text
                    fontSize="xs"
                    fontWeight="500"
                    ml="-0.5"
                    _light={{
                        color: "blue.500",
                    }}
                    _dark={{
                        color: "blue.400",
                    }}
                >
                    {title}
                </Text>
                <Text>{value}</Text>
            </Stack>
        </Box>
    );
};
