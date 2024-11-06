import * as React from "react";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { View } from "../../../components/Themed";
import NoneDocumentCard from "../../../components/profile/NoneDocumentCard";
import { UserContentType } from "../../../api/profile/documentsEnums";
import { getUserContentFromBackend } from "../../../services/ImageHelper";
import { Box, Button, Center, ScrollView, VStack } from "native-base";
import { Pressable } from "react-native";
import ChooseSourceAndUploadModal from "../../../components/profile/ChooseSourceAndUploadModal";

export default function TruckPhotosModal() {
	const { truckId } = useLocalSearchParams<{ truckId: string }>();
	if (!truckId) {
		return null;
	}

	const [frontTruckPhoto, setFrontTruckPhoto] = useState<string>();
	const [backTruckPhoto, setBackTruckPhoto] = useState<string>();
	const [leftTruckPhoto, setLeftTruckPhoto] = useState<string>();
	const [rightTruckPhoto, setRightTruckPhoto] = useState<string>();

	const [showUploadModal, setShowUploadModal] = useState(false);
	const [selectedUserContentType, setSelectedUserContentType] = useState<UserContentType>();

	useEffect(() => {
		getImageFromBackendAsync();
	}, []);

	const getImageFromBackendAsync = async () => {
		const front = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_FRONT, truckId);
		setFrontTruckPhoto(front);
		const back = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_BACK, truckId);
		setBackTruckPhoto(back);
		const left = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_LEFT, truckId);
		setLeftTruckPhoto(left);
		const right = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_RIGHT, truckId);
		setRightTruckPhoto(right);
	};

	const setImgSourceByDocType = async (docType: UserContentType, imgSource: string) => {
		switch (docType) {
			case UserContentType.TRUCK_PHOTO_FRONT:
				setFrontTruckPhoto(imgSource);
				break;
			case UserContentType.TRUCK_PHOTO_BACK:
				setBackTruckPhoto(imgSource);
				break;
			case UserContentType.TRUCK_PHOTO_LEFT:
				setLeftTruckPhoto(imgSource);
				break;
			case UserContentType.TRUCK_PHOTO_RIGHT:
				setRightTruckPhoto(imgSource);
				break;
		}
	};

	const uploadModalOnClose = async () => {
		setShowUploadModal(false);

		if (selectedUserContentType) {
			const base64 = await getUserContentFromBackend(selectedUserContentType, truckId);
			if (base64) {
				setImgSourceByDocType(selectedUserContentType, base64);
			}
		}
	};

	const photoOnClick = async (docType: UserContentType) => {
		setSelectedUserContentType(docType);
		setShowUploadModal(true);
	};

	const onEventHappened = async (docType: UserContentType) => {
		const base64 = await getUserContentFromBackend(docType, truckId);
		if (base64) {
			setImgSourceByDocType(docType, base64);
		}
	};

	const getPressableTruckPhoto = (docType: UserContentType, imgSource?: string) => {
		if (imgSource) {
			return (
				<Pressable style={{ flex: 1, width: "100%" }} onPress={() => photoOnClick(docType)}>
					<Box flex={1} w={"100%"} minH={200} maxH={250}>
						<Image style={{ flex: 1, width: "100%" }} contentFit="scale-down" transition={10} source={imgSource} />
					</Box>
				</Pressable>
			);
		}
		return <NoneDocumentCard documentType={docType} sectionKey={truckId} onEventHappened={() => onEventHappened(docType)} />;
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<ScrollView px={4} flex={1} w={"100%"} py={5}>
				<VStack space={5}>
					{getPressableTruckPhoto(UserContentType.TRUCK_PHOTO_FRONT, frontTruckPhoto)}
					{getPressableTruckPhoto(UserContentType.TRUCK_PHOTO_BACK, backTruckPhoto)}
					{getPressableTruckPhoto(UserContentType.TRUCK_PHOTO_LEFT, leftTruckPhoto)}
					{getPressableTruckPhoto(UserContentType.TRUCK_PHOTO_RIGHT, rightTruckPhoto)}
				</VStack>
				{selectedUserContentType && (
					<ChooseSourceAndUploadModal
						userContentType={selectedUserContentType}
						sectionKey={truckId}
						showModal={showUploadModal}
						onClose={uploadModalOnClose}
					/>
				)}
			</ScrollView>
			<Center my={2} p={2}>
				<Button variant="blue_button" onPress={() => router.replace("/ProfileTab")}>
					ОК
				</Button>
			</Center>
		</View>
	);
}
