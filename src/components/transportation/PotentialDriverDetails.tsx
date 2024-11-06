import * as React from "react";
import { ScrollView, VStack, Text, Heading, Box, View } from "native-base";
import { CARBODY_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { ICorrelation } from "../../api/transportation/Transportation";
import { TRAILER_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/TrailerTypeToDisplayNameMap";

type Props = {
	correlation: ICorrelation;
};

export default function PotentialDriverDetails(props: Props) {
	const { correlation } = props;

	if (!correlation?.truck) {
		return null;
	}

	const driver = correlation.driver;
	const truck = correlation.truck;

	const trailerTypeDisplayName = truck.trailerType || truck.trailerType === 0 ? TRAILER_TYPE_DISPLAY_NAME_MAP.get(truck.trailerType) ?? "" : "";
	const carBodyDisplayName = truck.carBodyType || truck.carBodyType === 0 ? CARBODY_DISPLAY_NAME_MAP.get(truck.carBodyType) ?? "" : "";

	const loadingTypeDisplayNames = truck.loadingType?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];

	const additionalTruckRequirements = [];
	if (truck.hasLtl) additionalTruckRequirements.push("Догруз");
	if (truck.hasLiftgate) additionalTruckRequirements.push("Гидролифт");
	if (truck.hasStanchionTrailer) additionalTruckRequirements.push("Коники");

	const dangerousGoodsRequirements = [];
	if (truck.adr1) dangerousGoodsRequirements.push("ADR-1");
	if (truck.adr2) dangerousGoodsRequirements.push("ADR-2");
	if (truck.adr3) dangerousGoodsRequirements.push("ADR-3");
	if (truck.adr4) dangerousGoodsRequirements.push("ADR-4");
	if (truck.adr5) dangerousGoodsRequirements.push("ADR-5");
	if (truck.adr6) dangerousGoodsRequirements.push("ADR-6");
	if (truck.adr7) dangerousGoodsRequirements.push("ADR-7");
	if (truck.adr8) dangerousGoodsRequirements.push("ADR-8");
	if (truck.adr9) dangerousGoodsRequirements.push("ADR-9");
	if (truck.tir) dangerousGoodsRequirements.push("TIR");
	if (truck.ekmt) dangerousGoodsRequirements.push("EKMT");

	return (
		<View mb={1}>
			<ScrollView px={4}>
				{correlation.driver && (
					<VStack space={3}>
						<Box p={4} variant={"gray_card"}>
							<VStack space={4}>
								<Text variant={"header15_gray"}>Переозчик</Text>

								<Box>
									<Text variant={"body13"}>ФИО</Text>
									<Text>{`${driver.surname || ""} ${driver.name || ""} ${driver.patronymic || ""}`}</Text>
								</Box>
							</VStack>
						</Box>

						<Box p={4} variant={"gray_card"}>
							<VStack space={4}>
								<Text variant={"header15_gray"}>Грузовик</Text>

								<Box>
									<Text variant={"body13"}>Тип прицепа</Text>
									<Text variant={"body17_black"}>{trailerTypeDisplayName}</Text>
								</Box>

								<Box>
									<Text variant={"body13"}>Грузоподъемность</Text>
									<Text variant={"body17_black"}>{truck.carryingCapacity} т</Text>
								</Box>

								<Box>
									<Text variant={"body13"}>Объем кузова</Text>
									<Text variant={"body17_black"}>{truck.bodyVolume} м³</Text>
								</Box>

								{loadingTypeDisplayNames.length > 0 && (
									<Box>
										<Text variant={"body13"}>Способы загрузки</Text>
										<Text variant={"body17_black"}>{loadingTypeDisplayNames.join(",\n")}</Text>
									</Box>
								)}

								{additionalTruckRequirements.length > 0 && (
									<Box>
										<Text variant={"body13"}>Доп. возможности</Text>
										<Text variant={"body17_black"}>{additionalTruckRequirements.join(",\n")}</Text>
									</Box>
								)}

								{dangerousGoodsRequirements.length > 0 && (
									<Box>
										<Text variant={"body13"}>Разрешения</Text>
										<Text variant={"body17_black"}>{dangerousGoodsRequirements.join(", ")}</Text>
									</Box>
								)}
							</VStack>
						</Box>
					</VStack>
				)}
			</ScrollView>
		</View>
	);
}
