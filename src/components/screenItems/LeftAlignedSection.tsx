import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, Box, Center, Icon, Flex } from 'native-base'
import React from 'react'

type Props = {
    title: string;
    value: string;
}

export const LeftAlignedSection = (props: Props) => {
    const { title, value } = props;
    return (
        <Flex 
            direction="row"
            w={"100%"}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1">
                
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
                        }}>
                        {title}
                    </Text>
                    <Text>{value}</Text>
                </Box>
                
                <Center w={"10%"}>
                    <Icon color={"gray.400"} size="md" as={<MaterialCommunityIcons name="chevron-right" size={24} />} />
                </Center>
        </Flex>
    )
}
