import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Colors from "../../../constants/Colors";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { SHIPPER_ROLE } from "../../../api/profile/Profile";
import TruckSvg from "../../../components/svg/TruckSvg";
import DriverRequestsTabSvg from "../../../components/svg/DriverRequestsTabSvg";
import DriverRecommendationsTabSvg from "../../../components/svg/DriverRecommendationsTabSvg";
import SearchSvg from "../../../components/svg/SearchSvg";
import UserSvg from "../../../components/svg/UserSvg";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { data: profile } = useGetProfileQuery();

	if (profile?.role === SHIPPER_ROLE) {
		return (
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					tabBarLabelPosition: "below-icon",
					tabBarLabelStyle: {
						marginTop: -5,
						marginBottom: 5,
					},
					headerShadowVisible: true,
					headerStyle: {
						borderBottomWidth: 1,
						height: 80,
					},
					headerTitleAlign: "center",
					headerTitleStyle: {
						color: "#000",
						fontWeight: "600",
						fontSize: 17,
						lineHeight: 22,
						letterSpacing: -0.43,
						fontFamily: Platform.select({
							web: "Inter_400Regular",
							android: "Inter_400Regular",
							ios: "Inter-Black",
						}),
					},
				}}
			>
				<Tabs.Screen
					name="ShipperOrdersInProgressTab"
					options={{
						title: "В пути",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-delivery-outline" size={30} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="FreeTransportationsTab"
					options={{
						title: "Заявки",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package-variant-closed" size={30} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="TransportationOnApprovingTab"
					options={{
						title: "Согласование",
						tabBarIcon: ({ color }) => <FontAwesome6 name="handshake" size={30} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="ProfileTab"
					options={{
						title: "Профиль",
						tabBarIcon: ({ color }) => <UserSvg color={color} />,
					}}
				/>
				<Tabs.Screen
					name="SearchTab"
					options={{
						title: "Поиск",
						tabBarIcon: ({ color }) => <SearchSvg color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="DriverOrdersTab"
					options={{
						title: "Перевозки",
						headerTitleAlign: "center",
						tabBarIcon: ({ color }) => <TruckSvg color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="DriverRequestsTab"
					options={{
						title: "Заявки",
						tabBarIcon: ({ color }) => <DriverRequestsTabSvg color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="RecommendationsTab"
					options={{
						title: "Предложения",
						tabBarIcon: ({ color }) => <DriverRecommendationsTabSvg color={color} />,
						href: null,
					}}
				/>
			</Tabs>
		);
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				tabBarLabelPosition: "below-icon",
				tabBarLabelStyle: {
					marginTop: -5,
					marginBottom: 5,
				},
				headerShadowVisible: true,
				headerStyle: {
					borderBottomWidth: 1,
					height: 80,
				},
				headerTitleAlign: "center",
				headerTitleStyle: {
					color: "#000",
					fontWeight: "600",
					fontSize: 17,
					lineHeight: 22,
					letterSpacing: -0.43,
					fontFamily: Platform.select({
						web: "Inter_400Regular",
						android: "Inter_400Regular",
						ios: "Inter-Black",
					}),
				},
			}}
		>
			<Tabs.Screen
				name="DriverOrdersTab"
				options={{
					title: "Перевозки",
					tabBarIcon: ({ color }) => <TruckSvg color={color} />,
				}}
			/>
			<Tabs.Screen
				name="DriverRequestsTab"
				options={{
					title: "Заявки",
					tabBarIcon: ({ color }) => <DriverRequestsTabSvg color={color} />,
				}}
			/>
			<Tabs.Screen
				name="RecommendationsTab"
				options={{
					title: "Предложения",
					tabBarIcon: ({ color }) => <DriverRecommendationsTabSvg color={color} />,
				}}
			/>
			<Tabs.Screen
				name="SearchTab"
				options={{
					title: "Поиск",
					tabBarIcon: ({ color }) => <SearchSvg color={color} />,
				}}
			/>
			<Tabs.Screen
				name="ProfileTab"
				options={{
					title: "Профиль",
					tabBarIcon: ({ color }) => <UserSvg color={color} />,
				}}
			/>
			<Tabs.Screen
				name="FreeTransportationsTab"
				options={{
					title: "Груз",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package-variant-closed" size={30} color={color} />,
					href: null,
				}}
			/>
			<Tabs.Screen
				name="TransportationOnApprovingTab"
				options={{
					title: "Согласование",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package-variant-closed" size={30} color={color} />,
					href: null,
				}}
			/>
			<Tabs.Screen
				name="ShipperOrdersInProgressTab"
				options={{
					title: "В пути",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package-variant-closed" size={30} color={color} />,
					href: null,
				}}
			/>
		</Tabs>
	);
}
