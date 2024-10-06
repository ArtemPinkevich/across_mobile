import * as React from "react";
import { View } from "../../../components/Themed";
import { Image } from "expo-image";
import { Button, Text, Modal, Box } from "native-base";
import { useEffect, useState } from "react";
import { UserContentType } from "../../../api/profile/documentsEnums";
import { getUserContentFromBackend } from "../../../services/ImageHelper";
import { router, useLocalSearchParams } from "expo-router";
import ChooseSourceAndUploadModal from "../../../components/profile/ChooseSourceAndUploadModal";
import { GENERAL_BLUE_COLOR } from "../../../constants/Colors";

export default function ShowDocumentModal() {
	const { docType } = useLocalSearchParams<{ docType: string }>();

	const [base64FromServer, setBase64FromServer] = useState<string>();
	const [showModal, setShowModal] = useState(false);
	const [showChooseSourceModal, setShowChooseSourceModal] = useState(false);

	useEffect(() => {
		getImageFromBackendAsync(+docType);
	}, []);

	const getImageFromBackendAsync = async (docType: UserContentType) => {
		const base64 = await getUserContentFromBackend(docType);
		setBase64FromServer(base64);
	};

	const modalOnclose = () => {
		setShowChooseSourceModal(false);
		router.back();
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch", padding: 16 }}>
			<Box w={"100%"} h={320} maxH={320}>
				<Image
					style={{ flex: 1, width: "100%", borderWidth: 2, borderRadius: 16, borderColor: GENERAL_BLUE_COLOR }}
					//source={"https://www.jquery-az.com/html/images/banana.jpg"}
					source={base64FromServer}
				/>
			</Box>

			<Button my={6} variant="blue_button" onPress={() => setShowModal(true)}>
				Заменить
			</Button>

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

			<ChooseSourceAndUploadModal userContentType={+docType} showModal={showChooseSourceModal} onClose={modalOnclose} />
		</View>
	);
}
