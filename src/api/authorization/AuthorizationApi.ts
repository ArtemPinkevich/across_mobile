import { httpClient } from "../httpClient";

export interface IAuthorizeResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
  expireDateTime: Date;
}

async function authorize(
  login: string,
  password: string
): Promise<IAuthorizeResponse | undefined> {
  try {
    const response = await httpClient.get<IAuthorizeResponse>(
      `/Authorization/driver/${login}/${password}`
    );
    return response.data;
  } catch (error) {
    console.error("Authorize error", error);
  }
}

export const AuthorizationApi = {
  authorize,
};
