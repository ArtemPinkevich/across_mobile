import * as React from "react";
import { Text, Center, HStack, VStack } from "native-base";
import { IPlace } from "../../api/places/Places";
import MapMarkerSvg from "../svg/MapMarkerSvg";

type Props = {
	place: IPlace | undefined;
	MapMarkerColor: string;
	placeholder: string;
};

export default function LocationTextBlock(props: Props) {
	const { place, MapMarkerColor, placeholder } = props;

	return (
		<HStack space={3}>
			<Center>
				<MapMarkerSvg color={MapMarkerColor} />
			</Center>
			{place ? (
				<VStack w={"100%"}>
					<Text variant={"header15"}>{place.city}</Text>
					<Text variant={"body13"}>{`${place.country}, ${place.region}`}</Text>
				</VStack>
			) : (
				<Center justifyContent={"left"}>
					<Text variant={"body15_gray"}>{placeholder}</Text>
				</Center>
			)}
		</HStack>
	);
}
