import { HStack, Box, Text, Center, Icon } from "native-base";
import { UserContentType, UserDocumentStatus } from "../../api/profile/documentsEnums";
import { userContentTypeToDisplayStringConverter } from "../../api/profile/DocumentTypeToDisplayStringConverter";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ArrowToRightBlackHeaderSectionHoc } from "../screenItems/ArrowToRightBlackHeaderSectionHoc";
import { DocumentStatusToDisplayStringConverter } from "../../api/profile/DocumentStatusToDisplayStringConverter";
import { IUserDocument } from "../../api/profile/Profile";
import ClockSvg from "../svg/ClockSvg";
import CircleCheckSvg from "../svg/CircleCheckSvg";
import { GENERAL_RED_COLOR } from "../../constants/Colors";

type Props = {
	document: IUserDocument;
};

export default function DocumentCard(props: Props) {
	const { document } = props;

	if (!document) {
		return null;
	}

	return (
		<HStack>
			<Center mr={2}>
				{document.documentStatus === UserDocumentStatus.NONE && (
					<Icon color={"yellow.300"} size="md" as={<MaterialCommunityIcons name="alert-octagon-outline" size={32} />} />
				)}
				{document.documentStatus === UserDocumentStatus.VERIFICATION && <ClockSvg />}
				{document.documentStatus === UserDocumentStatus.ACCEPTED && <CircleCheckSvg />}
				{document.documentStatus === UserDocumentStatus.REJECTED && (
					<Icon color={GENERAL_RED_COLOR} size="md" as={<MaterialIcons name="do-not-disturb" size={32} />} />
				)}
			</Center>

			<Box width={"90%"}>
				<ArrowToRightBlackHeaderSectionHoc title={userContentTypeToDisplayStringConverter(document.documentType)}>
					<Text variant={"body13"}>{DocumentStatusToDisplayStringConverter(document.documentStatus)}</Text>
				</ArrowToRightBlackHeaderSectionHoc>
			</Box>
		</HStack>
	);
}
