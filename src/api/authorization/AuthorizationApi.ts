import { SERVER_ADDRESS } from "../../constants/GlobalConstants";

export interface IAuthorizeResponse {
    id: string;
    accessToken: string;
    refreshToken: string;
    expireDateTime: Date;
}

export async function authorizeAsync(login: string, password: string) {
    try {
        const response = await fetch(`${SERVER_ADDRESS}/api/authorization/driver/${login}/${password}`);
        if (!response.ok) {
            console.error(`Ошибка авторизации: ${response.status}`);
            return undefined;
        }

        const authorizeResponse: IAuthorizeResponse = await response.json();
        return authorizeResponse;
    } catch (error) {
        console.log("---------- authorizeAsync Fetch error: ", error);
    }
}
