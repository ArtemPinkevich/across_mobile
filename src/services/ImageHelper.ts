import axios, { AxiosRequestConfig } from "axios";
import * as ImagePicker from "expo-image-picker";
import { SERVER_ADDRESS } from "../constants/GlobalConstants";
import { UserContentType } from "../api/profile/documentsEnums";
import { AsyncStorageKeys, getFromAsyncStorage } from "./AsyncStorageService";

export const uploadUserContentFromGallery = async (userContentType: UserContentType, sectionKey?: string) => {
	const imageAsset: ImagePicker.ImagePickerAsset | undefined = await getImageAssetFromGallery();
	if (!imageAsset) {
		return;
	}

	await sendUserContentToBackend(userContentType, imageAsset, sectionKey);
};

export const sendUserContentToBackend = async (userContentType: UserContentType, img: ImagePicker.ImagePickerAsset, sectionKey?: string) => {
	try {
		const formData = await createFormDataFromImageAsset(img);

		const accessToken = await getFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN);
		const config = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};

		await axios.post(SERVER_ADDRESS + `/File/upload-user-content?ContentType=${userContentType}&SectionKey=${sectionKey ?? ""}`, formData, config);
	} catch (err) {
		console.error(err);
	}
};

export const getUserContentFromBackend = async (userContentType: UserContentType, sectionKey?: string): Promise<string | undefined> => {
	try {
		const accessToken = await getFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN);
		const config: AxiosRequestConfig = {
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}`, "Cache-Control": "no-cache" },
			responseType: "blob",
		};

		const response = await axios.get(`${SERVER_ADDRESS}/File/get-user-content?ContentType=${userContentType}&SectionKey=${sectionKey ?? ""}`, config);

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

export const createFormDataFromImageAsset = async (img: ImagePicker.ImagePickerAsset) => {
	const formData = new FormData();
	const responce = await fetch(img.uri);
	const blob = await responce.blob();
	formData.append("image", blob, img.fileName ?? undefined);
	return formData;
};

export const getImageAssetFromGallery = async () => {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		base64: true,
		allowsEditing: true,
		quality: 1,
	});

	if (result.canceled) {
		return undefined;
	}

	if (result.assets.length < 1) {
		return undefined;
	}

	const imageAsset: ImagePicker.ImagePickerAsset = result.assets[0];

	if (!imageAsset?.base64) {
		console.log("Не удалось считать изображение в формате base64");
		return undefined;
	}

	return imageAsset;
};
