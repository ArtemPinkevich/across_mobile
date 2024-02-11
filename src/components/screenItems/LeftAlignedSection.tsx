import React from "react";
import { Text } from "native-base";
import { SectionHoc } from "./SectionHoc";

type Props = {
    title: string;
    value: string;
};

export const LeftAlignedSection = (props: Props) => {
    const { title, value } = props;
    return (
        <SectionHoc title={title}>
            <Text>{value}</Text>
        </SectionHoc>
    );
};
