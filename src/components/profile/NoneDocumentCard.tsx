import { VStack, Button, Modal } from "native-base";
import { useState } from "react";
import { router } from "expo-router";
import { UserDocumentType } from "../../api/profile/documentsEnums";
import { uploadDocumentFromGallery } from "../../services/ImageHelper";
import { SectionDashedHoc } from "../screenItems/SectionDashedHoc";
import { documentTypeToDisplayStringConverter } from "../../api/profile/DocumentTypeToDisplayStringConverter";
import { Text } from "../Themed";
import { TouchableOpacity } from "react-native";

type Props = {
	documentType: UserDocumentType;
};

export default function NoneDocumentCard(props: Props) {
	const { documentType } = props;
	const [showModal, setShowModal] = useState(false);

	const onPictureUploadPress = async () => {
		setShowModal(false);
		await uploadDocumentFromGallery(documentType);
	};

	const onTakePhotoPress = async () => {
		setShowModal(false);
		router.navigate({ pathname: "/TakeDocumentPhotoModal", params: { docType: documentType } });
	};

	return (
		<TouchableOpacity onPress={() => setShowModal(true)}>
			<SectionDashedHoc title={documentTypeToDisplayStringConverter(documentType)}>
				<VStack>
					<Text lightColor="#999">{"Нажмите, чтобы загрузить"}</Text>
					<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
						<Modal.Content maxWidth="400px">
							<Modal.Header>Выберите источник</Modal.Header>
							<Modal.Body>
								<Button variant={"ghost"} size={"lg"} onPress={onPictureUploadPress}>
									Из галереи
								</Button>
								<Button variant={"ghost"} size={"lg"} onPress={onTakePhotoPress}>
									Сделать фото
								</Button>
							</Modal.Body>
							<Modal.Footer>
								<Button minW={100} onPress={() => setShowModal(false)}>
									Отмена
								</Button>
							</Modal.Footer>
						</Modal.Content>
					</Modal>
				</VStack>
			</SectionDashedHoc>
		</TouchableOpacity>
	);
}
