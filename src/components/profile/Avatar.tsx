import * as React from "react";
import { useState } from "react";
import { Box, Avatar, Pressable } from "native-base";
import { UserDocumentType } from "../../api/profile/documentsEnums";
import { getImageFromBackend } from "../../services/ImageHelper";
import ChooseSourceAndUploadModal from "./ChooseSourceAndUploadModal";
import { useFocusEffect } from "expo-router";

export default function UserAvatar() {
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [base64FromServer, setBase64FromServer] = useState<string>();

	useFocusEffect(
		React.useCallback(() => {
			getImageFromBackendAsync(UserDocumentType.AVATAR);
		}, []),
	);

	const getImageFromBackendAsync = async (docType: UserDocumentType) => {
		const base64 = await getImageFromBackend(docType);
		setBase64FromServer(base64);
	};

	const uploadModalOnClose = () => {
		setShowUploadModal(false);
		getImageFromBackendAsync(UserDocumentType.AVATAR);
	};

	return (
		<Box>
			<ChooseSourceAndUploadModal documentType={UserDocumentType.AVATAR} showModal={showUploadModal} onClose={uploadModalOnClose} />
			<Pressable onPress={() => setShowUploadModal(true)} my={2}>
				<Avatar
					bg="blueGray.500"
					size={"xl"}
					source={{
						uri: base64FromServer,
					}}
				>
					A
				</Avatar>
			</Pressable>
		</Box>
	);
}
