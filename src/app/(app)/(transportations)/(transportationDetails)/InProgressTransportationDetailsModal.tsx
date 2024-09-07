import * as React from "react";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { Center, Button, Text, HStack } from "native-base";
import { RootState } from "../../../../store/configureStore";
import { View } from "../../../../components/Themed";
import TransportationDetails from "../../../../components/transportation/TransportationDetails";
import {
	useDeliveredTransportationMutation,
	useInformArrivalForLoadingMutation,
	useInformArrivalForUnloadingMutation,
	useStartTransportationMutation,
} from "../../../../store/rtkQuery/transportationApi";
import { TransportationOrderResult } from "../../../../api/transportation/Transportation";
import { ApiCommonResult } from "../../../../api/common/commonApi";
import { TransportationStatus } from "../../../../api/transportation/TransportationStatus";

export default function InProgressTransportationDetailsModal() {
	const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);
	const [deliveredTransportation, { isLoading, error }] = useDeliveredTransportationMutation();
	const [informArrivalForLoading, { isLoading: isLoadingForLoading, error: errorForLoading }] = useInformArrivalForLoadingMutation();
	const [startTransportation, { isLoading: isLoadingStartTransportation, error: errorStartTransportation }] = useStartTransportationMutation();
	const [informArrivalForUnloading, { isLoading: isLoadingForUnloading, error: errorForUnloading }] = useInformArrivalForUnloadingMutation();

	const doneHandler = async () => {
		if (!viewedTransportation?.transportationOrderId) {
			return;
		}

		let responce: TransportationOrderResult | undefined = undefined;

		if (viewedTransportation.transportationOrderStatus === TransportationStatus.waitingForLoading) {
			responce = await informArrivalForLoading(viewedTransportation.transportationOrderId).unwrap();
		} else if (viewedTransportation.transportationOrderStatus === TransportationStatus.loading) {
			responce = await startTransportation(viewedTransportation.transportationOrderId).unwrap();
		} else if (viewedTransportation.transportationOrderStatus === TransportationStatus.transporting) {
			responce = await informArrivalForUnloading(viewedTransportation.transportationOrderId).unwrap();
		} else if (viewedTransportation.transportationOrderStatus === TransportationStatus.unloading) {
			responce = await deliveredTransportation(viewedTransportation.transportationOrderId).unwrap();
		}

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

	const getButtonText = () => {
		switch (viewedTransportation.transportationOrderStatus) {
			case TransportationStatus.waitingForLoading:
				return "Прибыл для загрузки";
			case TransportationStatus.loading:
				return "В путь";
			case TransportationStatus.transporting:
				return "Прибыл для выгрузки";
			case TransportationStatus.unloading:
				return "Завершить перевозку";
			default:
				return "OK";
		}
	};

	return (
		<View style={{ flex: 1, alignItems: "stretch" }}>
			<TransportationDetails transportation={viewedTransportation} />
			<Center my={2}>
				<HStack space={10}>
					<Button minW={120} size={"md"} variant="outline" onPress={() => router.back()}>
						Назад
					</Button>
					<Button
						minW={120}
						size={"md"}
						variant="outline"
						isLoading={isLoading || isLoadingForLoading || isLoadingStartTransportation || isLoadingForUnloading}
						onPress={doneHandler}
					>
						{getButtonText()}
					</Button>
				</HStack>
				{(error || errorForLoading || errorStartTransportation || errorForUnloading) && <Text color={"red.500"}>Не удалось выполнить операцию</Text>}
			</Center>
		</View>
	);
}
