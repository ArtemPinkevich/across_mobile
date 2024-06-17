import { HStack, Flex, Box, Text, Center, Icon, Spacer } from "native-base";
import { UserDocumentType } from "../../api/profile/documentsEnums";
import { documentTypeToDisplayStringConverter } from "../../api/profile/DocumentTypeToDisplayStringConverter";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

type Props = {
	documentType: UserDocumentType;
};

export default function VerificationDocumentCard(props: Props) {
	const { documentType } = props;

	return (
		<Flex direction="column" w={"100%"} rounded="lg" overflow="hidden" borderColor="yellow.300" borderStyle={"solid"} borderWidth="1">
			<Box p="3" w={"100%"}>
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
					{documentTypeToDisplayStringConverter(documentType)}
				</Text>
				<HStack my={2} px={2}>
					<Center>
						<HStack space={2}>
							<Icon color={"yellow.300"} size="md" as={<MaterialCommunityIcons name="progress-check" size={24} />} />
							<Text fontSize="xs">На проверке</Text>
						</HStack>
					</Center>
					<Spacer />
					<TouchableOpacity onPress={() => router.navigate({ pathname: "/ShowDocumentModal", params: { docType: documentType } })}>
						<Center rounded="md" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
							<HStack my={1} mx={2} space={2}>
								<Text fontSize="xs">Посмотреть</Text>
								<Icon mx={0} color={"gray.600"} size="md" as={<FontAwesome name="eye" size={24} />} />
							</HStack>
						</Center>
					</TouchableOpacity>
				</HStack>
			</Box>
		</Flex>
	);
}
