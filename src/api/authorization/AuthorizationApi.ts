import { httpClient } from "../httpClient";
import { ApiCommonResult } from "../common/commonApi";

export interface ISignInResponse {
  result: ApiCommonResult;
  errors: string[];
}

export interface IVerifyCodeResponse {
  result: ApiCommonResult;
  accessToken: string;
  errors: string[];
}

async function signIn(phoneNumber: string): Promise<ISignInResponse | undefined> {
  try {
    const response = await httpClient.post<ISignInResponse>(`/Verification/send_sms/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error("Sign-in error", error);
  }
}

async function sendVerificationCode(phoneNumber: string, verificationCode: string): Promise<IVerifyCodeResponse | undefined> {
  try {
    const response = await httpClient.get<IVerifyCodeResponse>(`/Verification/verify/${phoneNumber}/${verificationCode}`);
    return response.data;
  } catch (error) {
    console.error("Verification error", error);
  }
}

export const AuthorizationApi = {
  signIn,
  sendVerificationCode,
};
