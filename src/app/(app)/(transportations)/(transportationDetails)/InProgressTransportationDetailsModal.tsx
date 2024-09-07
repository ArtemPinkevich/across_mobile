import * as React from "react";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { Center, Button, Text, HStack } from "native-base";
import { RootState } from "../../../../store/configureStore";
import { View } from "../../../../components/Themed";
import TransportationDetails from "../../../../components/transportation/TransportationDetails";
import { useDeliveredTransportationMutation } from "../../../../store/rtkQuery/transportationApi";
import { TransportationOrderResult } from "../../../../api/transportation/Transportation";
import { ApiCommonResult } from "../../../../api/common/commonApi";

export default function InProgressTransportationDetailsModal() {
	const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);
	const [deliveredTransportation, { isLoading, error }] = useDeliveredTransportationMutation();

	const doneHandler = async () => {
		if (!viewedTransportation?.transportationOrderId) {
			return;
		}

		const responce: TransportationOrderResult = await deliveredTransportation(viewedTransportation.transportationOrderId).unwrap();
		if (responce?.result === ApiCommonResult.Ok) {
			router.replace("/");
		} else {
			alert("Не удалось обработать запрос. Попробуйте снова или позже");
			console.log(responce?.reasons);
			return;
		}
	};

	if (!viewedTransportation) {
		return (
			<View style={{ flex: 1, alignItems: "stretch" }}>
				<Center>
					<Text>Информация отсутствует</Text>
				</Center>
			</View>
		);
	}

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<TransportationDetails transportation={viewedTransportation} />
			<Center my={2}>
				<HStack space={10}>
					<Button minW={120} size={"md"} variant="outline" onPress={() => router.back()}>
						Назад
					</Button>
					<Button minW={120} size={"md"} variant="outline" isLoading={isLoading} onPress={doneHandler}>
						Завершить перевозку
					</Button>
				</HStack>
				{error && <Text color={"red.500"}>Не удалось выполнить операцию</Text>}
			</Center>
		</View>
	);
}
