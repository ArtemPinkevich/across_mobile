import React from 'react'
import { Text, Box, VStack } from '@gluestack-ui/themed'

type Props = {
    title: string;
    value: string;
}

export const TitleValueItem = ({ title, value }: Props) => {
  return (
    <Box
        rounded="$lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="$1">
        <VStack p="$1" space="xs">
            <Text
                fontSize="$xs"
                fontWeight="500"
                ml="-$0.5">
                {title}
            </Text>
            <Text>{value}</Text>
        </VStack>
    </Box>
  )
}
