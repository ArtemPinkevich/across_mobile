import { VStack } from "native-base";
import { useState } from "react";
import { UserContentType } from "../../api/profile/documentsEnums";
import { SectionDashedHoc } from "../screenItems/SectionDashedHoc";
import { userContentTypeToDisplayStringConverter } from "../../api/profile/DocumentTypeToDisplayStringConverter";
import { Text } from "../Themed";
import { TouchableOpacity } from "react-native";
import ChooseSourceAndUploadModal from "./ChooseSourceAndUploadModal";

type Props = {
	documentType: UserContentType;
	sectionKey?: string; // Раздел, в который складывать фото, например, ID грузовика
	onEventHappened?: () => void;
};

export default function NoneDocumentCard(props: Props) {
	const { documentType, sectionKey, onEventHappened: eventHappened } = props;
	const [showUploadModal, setShowUploadModal] = useState(false);

	const onModalClosed = () => {
		setShowUploadModal(false);
		eventHappened && eventHappened();
	};

	return (
		<TouchableOpacity onPress={() => setShowUploadModal(true)}>
			<SectionDashedHoc title={userContentTypeToDisplayStringConverter(documentType)}>
				<VStack>
					<Text lightColor="#999">{"Нажмите, чтобы загрузить"}</Text>
					<ChooseSourceAndUploadModal userContentType={documentType} sectionKey={sectionKey} showModal={showUploadModal} onClose={onModalClosed} />
				</VStack>
			</SectionDashedHoc>
		</TouchableOpacity>
	);
}
