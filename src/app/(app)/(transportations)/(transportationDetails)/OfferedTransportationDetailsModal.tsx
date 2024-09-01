import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { Center, Button, Text, HStack } from "native-base";
import { RootState } from "../../../../store/configureStore";
import { View } from "../../../../components/Themed";
import TransportationDetails from "../../../../components/transportation/TransportationDetails";
import { useTryTakeOrderMutation } from "../../../../store/rtkQuery/transportationApi";
import { TransportationOrderResult, TryTakeOrderRequest } from "../../../../api/transportation/Transportation";
import { useGetTrucksQuery } from "../../../../store/rtkQuery/garageApi";
import { ApiCommonResult } from "../../../../api/common/commonApi";

export default function OfferedTransportationDetailsModal() {
	const dispatch = useDispatch();

	const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);
	const [tryTakeOrder, { isLoading, error }] = useTryTakeOrderMutation();
	const { data: trucksListRDto } = useGetTrucksQuery();
	const trucks = trucksListRDto?.trucks ?? [];

	const backHandler = () => {
		router.back();
	};

	const takeHandler = async () => {
		if (!viewedTransportation?.transportationOrderId) {
			return;
		}

		// TODO Сделать механизм выбора грузовика
		if (trucks.length === 0 || !trucks[0].truckId) {
			return;
		}

		const tryTakeOrderRequest: TryTakeOrderRequest = {
			truckId: trucks[0].truckId,
			transportationOrderId: viewedTransportation.transportationOrderId,
		};

		const responce: TransportationOrderResult = await tryTakeOrder(tryTakeOrderRequest).unwrap();
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
					<Button minW={120} size={"md"} variant="outline" onPress={backHandler}>
						Назад
					</Button>
					<Button minW={120} size={"md"} variant="outline" isLoading={isLoading} onPress={takeHandler}>
						Взять груз
					</Button>
				</HStack>
				{error && <Text color={"red.500"}>Не удалось выполнить операцию</Text>}
			</Center>
		</View>
	);
}
