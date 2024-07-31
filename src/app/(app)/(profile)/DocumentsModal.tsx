import * as React from "react";
import { View } from "../../../components/Themed";
import NoneDocumentCard from "../../../components/profile/NoneDocumentCard";
import VerificationDocumentCard from "../../../components/profile/VerificationDocumentCard";
import { UserDocumentStatus } from "../../../api/profile/documentsEnums";
import DocumentCardRejected from "../../../components/profile/DocumentCardRejected";
import AcceptedDocumentCard from "../../../components/profile/AcceptedDocumentCard";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { Button } from "native-base";

export default function DocumentsModal() {
	const { data: profile, refetch } = useGetProfileQuery();

	if (!profile?.documentDtos) {
		return null;
	}

	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<Button mt={3} mr={5} variant={"ghost"} alignSelf={"end"} onPress={refetch}>
				Обновить статусы
			</Button>
			{profile.documentDtos.map((document, index) => (
				<View key={index} style={{ width: "90%", marginTop: "4%" }}>
					{document.documentStatus === UserDocumentStatus.NONE && <NoneDocumentCard documentType={document.documentType} />}
					{document.documentStatus === UserDocumentStatus.VERIFICATION && <VerificationDocumentCard documentType={document.documentType} />}
					{document.documentStatus === UserDocumentStatus.ACCEPTED && <AcceptedDocumentCard documentType={document.documentType} />}
					{document.documentStatus === UserDocumentStatus.REJECTED && <DocumentCardRejected documentType={document.documentType} />}
				</View>
			))}
		</View>
	);
}
