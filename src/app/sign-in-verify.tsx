import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Button, Input, Text } from "native-base";
import { AuthorizationService } from "../services/AuthorizationService";
import { useLazyGetProfileQuery } from "../store/rtkQuery/profileApi";
import { DRIVER_ROLE } from "../api/profile/Profile";

export default function SignInVerify() {
	const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
	const [trigger] = useLazyGetProfileQuery();

	const [verificationCode, setVerificationCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorText, setErrorText] = useState("");

	const handleVerificationCodeChange = (value: string) => setVerificationCode(value);

	const handleSendVerifyCode = async () => {
		setIsLoading(true);
		const isVerificated = await AuthorizationService.sendVerificationCode(phoneNumber, verificationCode);
		setIsLoading(false);

		if (isVerificated) {
			const result = await trigger();

			if (result.isSuccess) {
				const profile = result.data;
				if (profile.name == undefined) {
					router.replace("/InitialEntryPersonalInfo");
				} else {
					profile.role === DRIVER_ROLE ? router.replace("/location-permission") : router.replace("/ShipperOrdersInProgressTab");
				}
			} else {
				setErrorText("Не удалась загрузить пользовательские данные. Пожалуйста, перезапустите приложение и попробуйте еще раз.");
			}
		} else {
			setErrorText("Верификация не удалась. Пожалуйста, перезапустите приложение и попробуйте еще раз.");
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "stretch", padding: 32 }}>
			<Input
				variant="underlined"
				size="md"
				isFullWidth
				placeholder="Код подтверждения"
				value={verificationCode}
				onChangeText={handleVerificationCodeChange}
				keyboardType="number-pad"
			/>
			<Button mt={10} variant="blue_button" disabled={!verificationCode} onPress={handleSendVerifyCode} isLoading={isLoading}>
				Отправить
			</Button>
			{errorText && (
				<Text mt={5} textAlign={"center"} color={"red.500"}>
					{errorText}
				</Text>
			)}
		</View>
	);
}
