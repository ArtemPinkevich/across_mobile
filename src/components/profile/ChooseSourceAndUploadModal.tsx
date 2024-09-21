import * as React from "react";
import { Button, Modal } from "native-base";
import { router } from "expo-router";
import { UserContentType } from "../../api/profile/documentsEnums";
import { uploadUserContentFromGallery } from "../../services/ImageHelper";

type Props = {
	documentType: UserContentType;
	sectionKey?: string; // Раздел, в который складывать фото, например, ID грузовика
	showModal: boolean;
	onClose: () => void;
};

export default function ChooseSourceAndUploadModal(props: Props) {
	const { documentType, sectionKey, showModal, onClose } = props;

	const onFromGalleryPress = async () => {
		await uploadUserContentFromGallery(documentType, sectionKey);
		onClose();
	};

	return (
		<Modal isOpen={showModal} onClose={onClose}>
			<Modal.Content maxWidth="400px">
				<Modal.Header>Выберите источник</Modal.Header>
				<Modal.Body>
					<Button variant={"ghost"} size={"lg"} onPress={onFromGalleryPress}>
						Из галереи
					</Button>
					<Button
						variant={"ghost"}
						size={"lg"}
						onPress={() => router.replace({ pathname: "/TakeDocumentPhotoModal", params: { docType: documentType, sectionKey: sectionKey ?? "" } })}
					>
						Сделать фото
					</Button>
				</Modal.Body>
				<Modal.Footer>
					<Button minW={100} onPress={onClose}>
						Отмена
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
}
