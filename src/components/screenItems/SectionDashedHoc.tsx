import React, { Children } from "react";
import { Text, Center, Flex } from "native-base";

type Props = {
	title: string;
	children: React.ReactNode;
};

export const SectionDashedHoc = (props: Props) => {
	const { title, children } = props;
	return (
		<Flex p="3" direction="column" w={"100%"} rounded="lg" overflow="hidden" borderColor="gray.300" borderStyle={"dashed"} borderWidth="2">
			<Text
				fontSize="xs"
				fontWeight="500"
				_light={{
					color: "blue.500",
				}}
				_dark={{
					color: "blue.400",
				}}
			>
				{title}
			</Text>
			<Center my={2}>{Children.only(children)}</Center>
		</Flex>
	);
};
