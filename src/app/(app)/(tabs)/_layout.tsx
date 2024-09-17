import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { SHIPPER_ROLE } from "../../../api/profile/Profile";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { data: profile } = useGetProfileQuery();

	if (profile?.role === SHIPPER_ROLE) {
		return (
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					tabBarLabelPosition: "below-icon",
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
						tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="SearchTab"
					options={{
						title: "Поиск",
						tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="DriverOrdersTab"
					options={{
						title: "Перевозки",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-delivery-outline" size={30} color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="DriverRequestsTab"
					options={{
						title: "Заявки",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="progress-question" size={30} color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="RecommendationsTab"
					options={{
						title: "Предложения",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="store-plus-outline" size={30} color={color} />,
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
			}}
		>
			<Tabs.Screen
				name="DriverOrdersTab"
				options={{
					title: "Перевозки",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-delivery-outline" size={30} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="DriverRequestsTab"
				options={{
					title: "Заявки",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="progress-question" size={30} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="RecommendationsTab"
				options={{
					title: "Предложения",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="store-plus-outline" size={30} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="SearchTab"
				options={{
					title: "Поиск",
					tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="ProfileTab"
				options={{
					title: "Профиль",
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
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
