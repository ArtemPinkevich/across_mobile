import * as React from "react";
import { Text, Box, ScrollView, Button, VStack, Link } from "native-base";
import { View } from "../../../components/Themed";
import { router } from "expo-router";
import { GENERAL_RED_COLOR } from "../../../constants/Colors";
import { useGetPayInfoQuery } from "../../../store/rtkQuery/payApi";

export default function PaymentModal() {
	const { data: payInfo } = useGetPayInfoQuery(undefined, {
		pollingInterval: 5000,
	});

	const payPressHandler = () => {
		router.push("https://auth.robokassa.kz/Merchant/Index/bde81938-b312-d43a-3cbe-424840d40999");
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView px={4}>
				<VStack space={4}>
					<Box p={4} my={4} variant={"gray_card"}>
						{payInfo?.isPaymentDateExpired ? (
							<Text key={"subscription-expired-text-key"} variant={"header15_gray"} color={GENERAL_RED_COLOR}>
								Срок действия подписки истек
							</Text>
						) : (
							<Text key={"subscription-active-text-key"} variant={"header15_gray"} color={"green.500"}>
								Подписка активна
							</Text>
						)}
						<Box my={2}>
							<Text variant={"body13"}>Дата действия подписки до</Text>
							<Text variant={"body17_black"}>{payInfo?.paymentExpireDate !== "" ? payInfo?.paymentExpireDate : "-"}</Text>
						</Box>
					</Box>

					<Button variant="blue_button" onPress={payPressHandler}>
						Оплатить 10 000 ₸
					</Button>
					<Text variant={"body13"}>
						Нажимая "Оплатить" я подтверждаю, что ознакомился и принимаю условия{" "}
						<Link onPress={() => router.push("/OfferAgreementsModal")}>договора оферты</Link> и{" "}
						<Link onPress={() => router.push("/PrivacyPolicyModal")}>политики конфиденциальности</Link>
					</Text>
				</VStack>
			</ScrollView>
		</View>
	);
}
