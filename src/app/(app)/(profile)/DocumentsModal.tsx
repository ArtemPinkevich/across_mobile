import * as React from "react";
import { View } from "../../../components/Themed";
import { UserContentType, UserDocumentStatus } from "../../../api/profile/documentsEnums";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { IProfile, IUserDocument } from "../../../api/profile/Profile";
import { Box, Pressable } from "native-base";
import DocumentCard from "../../../components/profile/DocumentCard";
import { router } from "expo-router";
import { useState } from "react";
import ChooseSourceAndUploadModal from "../../../components/profile/ChooseSourceAndUploadModal";

export default function DocumentsModal() {
	const { data: profile } = useGetProfileQuery(undefined, {
		pollingInterval: 5000,
	});

	const [showUploadModal, setShowUploadModal] = useState(false);
	const [selectedDocumentType, setSelectedDocumentType] = useState<UserContentType>();

	if (!profile?.documentDtos) {
		return <View style={{ flex: 1 }} />;
	}

	const doucumentOnPress = (document: IUserDocument) => {
		switch (document.documentStatus) {
			case UserDocumentStatus.NONE:
				setSelectedDocumentType(document.documentType);
				setShowUploadModal(true);
				return;

			case UserDocumentStatus.VERIFICATION:
			case UserDocumentStatus.ACCEPTED:
				router.navigate({ pathname: "/ShowDocumentModal", params: { docType: document.documentType } });
				return;

			case UserDocumentStatus.REJECTED:
				router.navigate({ pathname: "/DocumentRejectDetailsModal", params: { docType: document.documentType } });
				return;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Box my={7} mx={4} p={4} variant={"gray_card"}>
				{profile.documentDtos.map((document, index) => (
					<Pressable my={3} onPress={() => doucumentOnPress(document)}>
						<DocumentCard key={index} document={document} />
					</Pressable>
				))}
			</Box>
			{selectedDocumentType && (
				<ChooseSourceAndUploadModal userContentType={selectedDocumentType} showModal={showUploadModal} onClose={() => setShowUploadModal(false)} />
			)}
		</View>
	);
}
