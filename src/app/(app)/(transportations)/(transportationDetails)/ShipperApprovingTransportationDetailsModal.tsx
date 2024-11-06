import * as React from "react";
import { useSelector } from "react-redux";
import { Button, Center, HStack, ScrollView, Text } from "native-base";
import { RootState } from "../../../../store/configureStore";
import { View } from "../../../../components/Themed";
import TransportationDetails from "../../../../components/transportation/TransportationDetails";
import { router } from "expo-router";
import { useAssignTruckMutation } from "../../../../store/rtkQuery/transportationApi";
import { IAssignTruckRequest, TransportationOrderResult } from "../../../../api/transportation/Transportation";
import { ApiCommonResult } from "../../../../api/common/commonApi";
import PotentialDriverDetails from "../../../../components/transportation/PotentialDriverDetails";

export default function ShipperApprovingTransportationDetailsModal() {
	const viewedCorrelation = useSelector((state: RootState) => state.transportations.viewedCorrelation);

	const [assignTruck, { isLoading, error }] = useAssignTruckMutation();

	const assignTruckHandler = async () => {
		if (!viewedCorrelation?.transportationOrder?.transportationOrderId) {
			return;
		}

		const request: IAssignTruckRequest = {
			truckId: viewedCorrelation?.truck.truckId,
			transportationOrderId: viewedCorrelation.transportationOrder.transportationOrderId,
		};

		const responce: TransportationOrderResult = await assignTruck(request).unwrap();
		if (responce?.result === ApiCommonResult.Ok) {
			router.replace("/ShipperOrdersInProgressTab");
		} else {
			alert("Не удалось обработать запрос. Попробуйте снова или позже");
			console.log(responce?.reasons);
			return;
		}
	};

	if (!viewedCorrelation) {
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
			<ScrollView>
				<TransportationDetails transportation={viewedCorrelation.transportationOrder} />
				<PotentialDriverDetails correlation={viewedCorrelation} />
			</ScrollView>
			<Center my={2} px={4}>
				<Button variant="blue_button" isLoading={isLoading} onPress={assignTruckHandler}>
					Согласовать перевозчика
				</Button>
				{error && <Text color={"red.500"}>Не удалось выполнить операцию</Text>}
			</Center>
		</View>
	);
}
