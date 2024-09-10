import * as React from "react";
import { View } from "../../../components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Spacer, Text } from "native-base";
import ChooseSourceAndUploadModal from "../../../components/profile/ChooseSourceAndUploadModal";
import { useState } from "react";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";

export default function DocumentRejectDetailsModal() {
	const { docType } = useLocalSearchParams<{ docType: string }>();
	const [showChooseSourceModal, setShowChooseSourceModal] = useState(false);
	const { data: profile } = useGetProfileQuery();

	if (!profile?.documentDtos) {
		return null;
	}

	const doc = profile.documentDtos.find((o) => o.documentType === +docType);

	const modalOnclose = () => {
		setShowChooseSourceModal(false);
		router.back();
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<Text m={4}>{doc?.comment ?? ""}</Text>
			<Spacer />
			<Button.Group alignSelf={"end"} my={2} mx={4} space={2}>
				<Button minW={120} size={"md"} variant="outline" onPress={() => setShowChooseSourceModal(true)}>
					Загрузить
				</Button>
				<Button minW={120} size={"lg"} variant="solid" onPress={() => router.back()}>
					Назад
				</Button>
			</Button.Group>

			<ChooseSourceAndUploadModal documentType={+docType} showModal={showChooseSourceModal} onClose={modalOnclose} />
		</View>
	);
}
