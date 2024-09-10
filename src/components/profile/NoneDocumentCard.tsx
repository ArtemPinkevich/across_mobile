import { VStack } from "native-base";
import { useState } from "react";
import { UserDocumentType } from "../../api/profile/documentsEnums";
import { SectionDashedHoc } from "../screenItems/SectionDashedHoc";
import { documentTypeToDisplayStringConverter } from "../../api/profile/DocumentTypeToDisplayStringConverter";
import { Text } from "../Themed";
import { TouchableOpacity } from "react-native";
import ChooseSourceAndUploadModal from "./ChooseSourceAndUploadModal";

type Props = {
	documentType: UserDocumentType;
};

export default function NoneDocumentCard(props: Props) {
	const { documentType } = props;
	const [showUploadModal, setShowUploadModal] = useState(false);

	return (
		<TouchableOpacity onPress={() => setShowUploadModal(true)}>
			<SectionDashedHoc title={documentTypeToDisplayStringConverter(documentType)}>
				<VStack>
					<Text lightColor="#999">{"Нажмите, чтобы загрузить"}</Text>
					<ChooseSourceAndUploadModal documentType={documentType} showModal={showUploadModal} onClose={() => setShowUploadModal(false)} />
				</VStack>
			</SectionDashedHoc>
		</TouchableOpacity>
	);
}
