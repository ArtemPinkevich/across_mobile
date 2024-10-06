import * as React from "react";
import { View } from "../../../components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Spacer, Text } from "native-base";
import ChooseSourceAndUploadModal from "../../../components/profile/ChooseSourceAndUploadModal";
import { useState } from "react";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { FAKE_PROFILE, IProfile } from "../../../api/profile/Profile";

export default function DocumentRejectDetailsModal() {
	const { docType } = useLocalSearchParams<{ docType: string }>();
	const [showChooseSourceModal, setShowChooseSourceModal] = useState(false);
	//const { data: profile } = useGetProfileQuery();

	const profile: IProfile = FAKE_PROFILE;

	if (!profile?.documentDtos) {
		return null;
	}

	const doc = profile.documentDtos.find((o) => o.documentType === +docType);

	const modalOnclose = () => {
		setShowChooseSourceModal(false);
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch", padding: 16 }}>
			<Text>{doc?.comment ?? "Комментарий отсутствует"}</Text>

			<Button my={6} variant="blue_button" onPress={() => setShowChooseSourceModal(true)}>
				Загрузить
			</Button>

			<ChooseSourceAndUploadModal userContentType={+docType} showModal={showChooseSourceModal} onClose={modalOnclose} />
		</View>
	);
}
