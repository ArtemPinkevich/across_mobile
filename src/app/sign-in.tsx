import { useState } from "react";
import { View } from "react-native";
import { Button } from "native-base";
import PhoneNumberInput from "../components/common/PhoneNumberInput";
import { AuthorizationService } from "../services/AuthorizationService";

export default function SignIn() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignIn = async () => {
		setIsLoading(true);
		await AuthorizationService.signIn(phoneNumber);
		setIsLoading(false);
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} />
			<Button mt={5} variant="outline" minW={200} size={"lg"} disabled={!phoneNumber} onPress={handleSignIn} isLoading={isLoading}>
				Войти
			</Button>
		</View>
	);
}
