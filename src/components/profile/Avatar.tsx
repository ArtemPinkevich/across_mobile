import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Avatar, Pressable } from "native-base";
import { UserDocumentType } from "../../api/profile/documentsEnums";
import { getImageFromBackend } from "../../services/ImageHelper";
import ChooseSourceAndUploadModal from "./ChooseSourceAndUploadModal";

export default function UserAvatar() {
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [base64FromServer, setBase64FromServer] = useState<string>();

	useEffect(() => {
		getImageFromBackendAsync(UserDocumentType.AVATAR);
	}, []);

	const getImageFromBackendAsync = async (docType: UserDocumentType) => {
		const base64 = await getImageFromBackend(docType);
		setBase64FromServer(base64);
	};

	return (
		<Box>
			<ChooseSourceAndUploadModal documentType={UserDocumentType.AVATAR} showModal={showUploadModal} onClose={() => setShowUploadModal(false)} />
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
