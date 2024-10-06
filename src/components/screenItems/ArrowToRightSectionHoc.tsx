import React, { Children } from "react";
import { Text, Box, Center, HStack, Spacer } from "native-base";
import ChevronRightSmallSvg from "../svg/ChevronRightSmallSvg";

type Props = {
	title: string;
	children?: React.ReactNode;
};

export const ArrowToRightSectionHoc = (props: Props) => {
	const { title, children } = props;
	return (
		<HStack>
			<Box maxW={"90%"}>
				<Text variant={"body13"} mb={1}>
					{title}
				</Text>
				{children && <Box mt={1}>{Children.only(children)}</Box>}
			</Box>
			<Spacer />
			<Center>
				<ChevronRightSmallSvg />
			</Center>
		</HStack>
	);
};
