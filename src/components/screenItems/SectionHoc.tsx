import React, { Children } from "react";
import { Text, Box, Center, Icon, Flex } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    title: string;
    children: React.ReactNode;
};

export const SectionHoc = (props: Props) => {
    const { title, children } = props;
    return (
        <Flex direction="row" w={"100%"} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
            <Box p="4" w={"90%"}>
                <Text
                    fontSize="xs"
                    fontWeight="500"
                    ml={"-0.5"}
                    _light={{
                        color: "blue.500",
                    }}
                    _dark={{
                        color: "blue.400",
                    }}
                >
                    {title}
                </Text>
                {Children.only(children)}
            </Box>
            <Center w={"10%"}>
                <Icon color={"gray.400"} size="md" as={<MaterialCommunityIcons name="chevron-right" size={24} />} />
            </Center>
        </Flex>
    );
};
