import { router } from "expo-router";
import { AuthorizationApi } from "../api/authorization/AuthorizationApi";
import { JwtTokenService } from "./JwtTokenService";

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
	await JwtTokenService.removeAccessToken();
	router.replace("/sign-in");
}

async function checkAuthorization(): Promise<void> {
	if (await JwtTokenService.getAccessToken()) {
		await JwtTokenService.refreshTokens();
	}

	if (!(await JwtTokenService.getAccessToken())) {
		router.replace("/sign-in");
	}
}

export const AuthorizationService = {
	signIn,
	sendVerificationCode,
	signOut,
	checkAuthorization,
};
