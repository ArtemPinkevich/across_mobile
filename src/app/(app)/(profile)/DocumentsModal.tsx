import * as React from "react";
import { View } from "../../../components/Themed";
import NoneDocumentCard from "../../../components/profile/NoneDocumentCard";
import VerificationDocumentCard from "../../../components/profile/VerificationDocumentCard";
import { UserDocumentStatus } from "../../../api/profile/documentsEnums";
import DocumentCardRejected from "../../../components/profile/DocumentCardRejected";
import AcceptedDocumentCard from "../../../components/profile/AcceptedDocumentCard";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";

export default function DocumentsModal() {
	const { data: profile } = useGetProfileQuery(undefined, {
		pollingInterval: 5000,
	});

	if (!profile?.documentDtos) {
		return null;
	}

	return (
		<View style={{ flex: 1, alignItems: "center" }}>
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
