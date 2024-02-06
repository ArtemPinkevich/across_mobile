import React from 'react'
import { Text, Box, HStack } from 'native-base'
import { SectionHoc } from './SectionHoc';

type Props = {
    title: string;
    values: string[];
}

export const LeftAlignedWithChipsSection = (props: Props) => {
    const { title, values } = props;
    return (
        <SectionHoc title={title}>
            <HStack flexWrap={'wrap'} mt={2}>
                {values.map(value => 
                        <Box m={'1'} borderWidth="1" borderColor={'#bdbdbd'} rounded="3xl" >
                            <Text fontSize="xs" mx={1}>{value}</Text>
                        </Box>
                    )}
            </HStack>
        </SectionHoc>
    )
}
