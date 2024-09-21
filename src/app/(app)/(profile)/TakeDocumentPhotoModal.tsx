import * as React from "react";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "native-base";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { View } from "../../../components/Themed";
import { sendUserContentToBackend } from "../../../services/ImageHelper";

export default function TakeDocumentPhotoModal() {
	const { docType } = useLocalSearchParams<{ docType: string }>();
	const { sectionKey } = useLocalSearchParams<{ sectionKey: string }>();

	const [uriFromCamera, setUriFromCamera] = useState("");
	const [imgAsset, setImgAsset] = useState<ImagePicker.ImagePickerAsset>();

	useEffect(() => {
		takePhoto();
	}, []);

	const takePhoto = async () => {
		try {
			const cameraResp = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			});

			if (!cameraResp.canceled) {
				const imgAsset = cameraResp.assets[0];
				setImgAsset(imgAsset);
				setUriFromCamera(imgAsset.uri);
			}
		} catch (e: any) {
			alert("Чтобы сделать фото приложению необходим доступ к камере.");
		}
	};

	const takePhotoPressHandle = async () => {
		takePhoto();
	};

	const onUploadPressHandle = async () => {
		if (imgAsset) {
			sendUserContentToBackend(+docType, imgAsset, sectionKey);
			router.back();
		}
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<Image style={{ flex: 1, width: "100%" }} source={uriFromCamera} />
			<Button.Group alignSelf={"end"} my={2} mx={4} space={2}>
				<Button size={"lg"} variant="outline" onPress={takePhotoPressHandle}>
					Переснять
				</Button>
				<Button size={"lg"} variant="outline" onPress={onUploadPressHandle}>
					Отправить
				</Button>
			</Button.Group>
		</View>
	);
}
