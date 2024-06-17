import * as React from "react";
import { View } from "../../../components/Themed";
import NoneDocumentCard from "../../../components/profile/NoneDocumentCard";
import VerificationDocumentCard from "../../../components/profile/VerificationDocumentCard";
import { UserDocumentStatus } from "../../../api/profile/documentsEnums";
import DocumentCardRejected from "../../../components/profile/DocumentCardRejected";
import AcceptedDocumentCard from "../../../components/profile/AcceptedDocumentCard";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";

export default function DocumentsModal() {
	const { data: profile } = useGetProfileQuery();

	if (!profile?.documents) {
		return null;
	}

	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			{profile?.documents.map((document, index) => (
				<View key={index} style={{ width: "90%", marginTop: "4%" }}>
					{document.status === UserDocumentStatus.NONE && <NoneDocumentCard documentType={document.documentType} />}
					{document.status === UserDocumentStatus.VERIFICATION && <VerificationDocumentCard documentType={document.documentType} />}
					{document.status === UserDocumentStatus.ACCEPTED && <AcceptedDocumentCard documentType={document.documentType} />}
					{document.status === UserDocumentStatus.REJECTED && <DocumentCardRejected documentType={document.documentType} />}
				</View>
			))}
		</View>
	);
}
