import { Button, Center, Text } from "native-base";
import { router } from "expo-router";
import { View } from "../Themed";
import { GENERAL_RED_COLOR } from "../../constants/Colors";

export default function SubscriptionExpired() {
	return (
		<View style={{ flex: 1, alignItems: "center", padding: 16 }}>
			<Center my={4}>
				<Text variant={"header15_gray"} color={GENERAL_RED_COLOR} textAlign={"center"}>
					Для использования сервиса необходимо активировать подписку
				</Text>
			</Center>
			<Button variant="blue_button" onPress={() => router.push("/PaymentModal")}>
				Перейти к подписке
			</Button>
		</View>
	);
}
