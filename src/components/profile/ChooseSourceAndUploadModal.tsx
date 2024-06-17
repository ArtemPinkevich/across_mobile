import * as React from "react";
import { Button, Modal } from "native-base";
import { router } from "expo-router";
import { UserDocumentType } from "../../api/profile/documentsEnums";
import { uploadDocumentFromGallery } from "../../services/ImageHelper";

type Props = {
	documentType: UserDocumentType;
	showModal: boolean;
	onCancel: () => void;
};

export default function ChooseSourceAndUploadModal(props: Props) {
	const { documentType, showModal, onCancel } = props;

	const onFromGalleryPress = async () => {
		await uploadDocumentFromGallery(documentType);
		router.back();
	};

	return (
		<Modal isOpen={showModal} onClose={onCancel}>
			<Modal.Content maxWidth="400px">
				<Modal.Header>Выберите источник</Modal.Header>
				<Modal.Body>
					<Button variant={"ghost"} size={"lg"} onPress={onFromGalleryPress}>
						Из галереи
					</Button>
					<Button
						variant={"ghost"}
						size={"lg"}
						onPress={() => router.replace({ pathname: "/TakeDocumentPhotoModal", params: { docType: documentType } })}
					>
						Сделать фото
					</Button>
				</Modal.Body>
				<Modal.Footer>
					<Button minW={100} onPress={onCancel}>
						Отмена
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
}
