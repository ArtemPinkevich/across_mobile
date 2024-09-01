import axios from "axios";
import { SERVER_ADDRESS } from "../constants/GlobalConstants";
import { JwtTokenService } from "../services/JwtTokenService";

const httpClient = axios.create({
	baseURL: SERVER_ADDRESS,
	timeout: 2000,
	headers: {
		Accept: "application/json;charset=utf-8",
		"Content-Type": "application/json;charset=utf-8",
	},
	// автоматическая подстановка cookies (нужно настроить на сервере тоже)
	withCredentials: true,
	// диапазон кодов ответа, который будет возвращать положительный ответ
	validateStatus: (status) => status >= 200 && status <= 399,
});

// перехватчик запроса
httpClient.interceptors.request.use(
	async (config) => {
		// при каждом запросе добавляем access token в headers
		const accessToken = await JwtTokenService.getAccessToken();
		config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

		return config;
	},
	(error) => {
		console.error(error);
		return Promise.reject(error);
	},
);

// перехватчик ответа
httpClient.interceptors.response.use(
	// если получен ответ
	async (response) => {
		// если успешный ответ авторизации (тут вообще лучше проверять response.config.url, но для этого нужно переделать код сервера)
		if (response.status === 200 && response.data.accessToken) {
			// сохраняем access token
			await JwtTokenService.saveAccessToken(response.data.accessToken);
		}

		return response;
	},
	// если ошибка, то идентифицируем ее
	async (error) => {
		// если ошибки ответа
		if (error.response) {
			const {
				data: { errors = null, message = null },
				status,
			} = error.response;

			const authError = status === 401;

			// если access token есть и код статус 401 Unauthorized
			if ((await JwtTokenService.getAccessToken()) && authError) {
				// сохраняем конфигурацию предыдущего неуспешного запроса
				const prevRequestConfig = error.config;

				// обновим access и refresh токены через новый запрос
				await JwtTokenService.refreshTokens();

				// переопределяем access token в headers предыдущего запроса (возможно это дублирование, т.к. в request interceptor устанавливаем!)
				const accessToken = await JwtTokenService.getAccessToken();

				prevRequestConfig.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

				// повторяем предыдущий запрос
				return httpClient.request(prevRequestConfig);
			}

			// при других ошибках выводим в консоль ошибку и передаем дальше
			console.error("Axios response error", error.response);
			return Promise.reject({ status, errors, message });
		}
		// если нет ответа от сервера
		else if (error.request) {
			console.error("Axios request error", error.request);
			const { status, statusText } = error.request;
			return Promise.reject({ status, message: statusText });
		}
		// если ошибки настройки запроса
		else {
			console.error("Axios undefined error", error.message);
			return Promise.reject({ message: error.message });
		}
	},
);

export { httpClient };
