import { router } from "expo-router";
import { AuthorizationApi } from "../api/authorization/AuthorizationApi";
import { AsyncStorageKeys, getFromAsyncStorage, removeFromAsyncStorage } from "./AsyncStorageService";
import { refreshTokens } from "../api/httpClient";

async function signIn(phoneNumber: string): Promise<void> {
	const result = await AuthorizationApi.signIn(phoneNumber);

	if (result) {
		router.navigate({ pathname: "/sign-in-verify", params: { phoneNumber } });
	}
}

async function sendVerificationCode(phoneNumber: string, verificationCode: string): Promise<boolean> {
	const result = await AuthorizationApi.sendVerificationCode(phoneNumber, verificationCode);
	return result?.accessToken !== undefined;
}

async function signOut(): Promise<void> {
	await removeFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN);
	router.replace("/sign-in");
}

async function checkAuthorization(): Promise<void> {
	if (await getFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN)) {
		await refreshTokens();
	}
	if (!(await getFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN))) {
		router.replace("/sign-in");
	}
}

export const AuthorizationService = {
	signIn,
	sendVerificationCode,
	signOut,
	checkAuthorization,
};
