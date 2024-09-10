import axios, { AxiosRequestConfig } from "axios";
import * as ImagePicker from "expo-image-picker";
import { SERVER_ADDRESS } from "../constants/GlobalConstants";
import { UserDocumentType } from "../api/profile/documentsEnums";
import { JwtTokenService } from "./JwtTokenService";

export const uploadDocumentFromGallery = async (documentType: UserDocumentType) => {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		base64: true,
		allowsEditing: true,
		quality: 1,
	});

	if (!result.canceled) {
		const imageAsset: ImagePicker.ImagePickerAsset = result.assets[0];
		await sendImageToBackend(documentType, imageAsset);
	}
};

export const sendImageToBackend = async (documentType: UserDocumentType, img: ImagePicker.ImagePickerAsset) => {
	try {
		const formData = new FormData();

		if (img?.base64) {
			const responce = await fetch(img.uri);
			const blob = await responce.blob();
			formData.append("image", blob, img.fileName ?? undefined);
		} else {
			console.log("Но удалось считать изображение в формате base64");
		}

		const accessToken = await JwtTokenService.getAccessToken();
		const config = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};

		await axios.post(SERVER_ADDRESS + `/File/upload/${documentType}`, formData, config);
	} catch (err) {
		console.error(err);
	}
};

export const getImageFromBackend = async (documentType: UserDocumentType): Promise<string | undefined> => {
	try {
		const accessToken = await JwtTokenService.getAccessToken();
		const config: AxiosRequestConfig = {
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` },
			responseType: "blob",
		};

		const response = await axios.get(`${SERVER_ADDRESS}/File/get-image?documentType=${documentType}`, config);

		if (response.status) {
			const base64 = await convertBlobToBase64(response.data);
			if (base64 && (typeof base64 === "string" || base64 instanceof String)) {
				return base64 as string;
			} else {
				throw new Error("Ошибка при конвертации Blob в Base64");
			}
		} else {
			throw new Error("Ошибка при получении изображения");
		}
	} catch (err) {
		console.error(err);
	}
};

export const convertBlobToBase64 = async (blob: Blob) => {
	const reader = new FileReader();
	const dataPromise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
	});
	reader.readAsDataURL(blob);
	return await dataPromise;
};
