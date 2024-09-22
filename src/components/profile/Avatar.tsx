import * as React from "react";
import { useState } from "react";
import { Box, Avatar, Pressable } from "native-base";
import { UserContentType } from "../../api/profile/documentsEnums";
import { getUserContentFromBackend } from "../../services/ImageHelper";
import ChooseSourceAndUploadModal from "./ChooseSourceAndUploadModal";
import { useFocusEffect } from "expo-router";

export default function UserAvatar() {
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [base64FromServer, setBase64FromServer] = useState<string>();

	useFocusEffect(
		React.useCallback(() => {
			getImageFromBackendAsync(UserContentType.AVATAR);
		}, []),
	);

	const getImageFromBackendAsync = async (docType: UserContentType) => {
		const base64 = await getUserContentFromBackend(docType);
		setBase64FromServer(base64);
	};

	const uploadModalOnClose = () => {
		setShowUploadModal(false);
		getImageFromBackendAsync(UserContentType.AVATAR);
	};

	return (
		<Box>
			<ChooseSourceAndUploadModal userContentType={UserContentType.AVATAR} showModal={showUploadModal} onClose={uploadModalOnClose} />
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
