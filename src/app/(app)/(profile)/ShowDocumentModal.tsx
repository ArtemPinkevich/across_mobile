import * as React from "react";
import { View } from "../../../components/Themed";
import { Image } from "expo-image";
import { Button, Text, Modal } from "native-base";
import { useEffect, useState } from "react";
import { UserDocumentType } from "../../../api/profile/documentsEnums";
import { getImageFromBackend } from "../../../services/ImageHelper";
import { router, useLocalSearchParams } from "expo-router";
import ChooseSourceAndUploadModal from "../../../components/profile/ChooseSourceAndUploadModal";

export default function ShowDocumentModal() {
	const { docType } = useLocalSearchParams<{ docType: string }>();

	const [base64FromServer, setBase64FromServer] = useState<string>();
	const [showModal, setShowModal] = useState(false);
	const [showChooseSourceModal, setShowChooseSourceModal] = useState(false);

	useEffect(() => {
		getImageFromBackendAsync(+docType);
	}, []);

	const getImageFromBackendAsync = async (docType: UserDocumentType) => {
		const base64 = await getImageFromBackend(docType);
		setBase64FromServer(base64);
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<Image style={{ flex: 1, width: "100%" }} source={base64FromServer} />
			<Button.Group alignSelf={"end"} my={2} mx={4} space={2}>
				<Button minW={120} size={"md"} variant="outline" onPress={() => setShowModal(true)}>
					Заменить
				</Button>
				<Button minW={120} size={"lg"} variant="solid" onPress={() => router.back()}>
					Назад
				</Button>
			</Button.Group>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content maxWidth="400px">
					<Modal.CloseButton />
					<Modal.Header>Внимание</Modal.Header>
					<Modal.Body>
						<Text>После замены документа процедура подтверждения личности запустится заново.</Text>
						<Text>Вы не сможете участвовать в сделках, пока личность не будет подтверждена.</Text>
					</Modal.Body>
					<Modal.Footer>
						<Button.Group space={2}>
							<Button
								variant="outline"
								colorScheme="blueGray"
								onPress={() => {
									setShowModal(false);
									setShowChooseSourceModal(true);
								}}
							>
								Продолжить
							</Button>
							<Button minW={100} onPress={() => setShowModal(false)}>
								Отмена
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>

			<ChooseSourceAndUploadModal documentType={+docType} showModal={showChooseSourceModal} onCancel={() => setShowChooseSourceModal(false)} />
		</View>
	);
}
