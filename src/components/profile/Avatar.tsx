import * as React from "react";
import { useState } from "react";
import { Box, Avatar, Pressable, IconButton } from "native-base";
import { UserContentType } from "../../api/profile/documentsEnums";
import { getUserContentFromBackend } from "../../services/ImageHelper";
import ChooseSourceAndUploadModal from "./ChooseSourceAndUploadModal";
import { useFocusEffect } from "expo-router";
import EditSvg from "../svg/EditSvg";

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
			<Pressable onPress={() => setShowUploadModal(true)}>
				<Avatar
					bg="blueGray.500"
					style={{ height: 160, width: 160 }}
					source={{
						uri: base64FromServer,
					}}
				>
					A
				</Avatar>
			</Pressable>
			<IconButton
				position={"absolute"}
				bottom={0}
				right={0}
				rounded={"full"}
				size={"lg"}
				shadow={"5"}
				bg={"#fff"}
				onPress={() => setShowUploadModal(true)}
				icon={<EditSvg />}
				_pressed={{
					bgColor: "gray.200",
				}}
			/>
		</Box>
	);
}
