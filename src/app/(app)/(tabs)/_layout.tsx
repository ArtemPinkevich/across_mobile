import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
				}}
			>
				<Tabs.Screen
					name="SearchTab"
					options={{
						title: "Поиск",
						tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="TransportationTab"
					options={{
						title: "Груз",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package-variant-closed" size={30} color={color} />,
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
					name="JournalTab"
					options={{
						title: "Журнал",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" size={30} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="GarageTab"
					options={{
						title: "Гараж",
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="garage-variant" size={30} color={color} />,
						href: null,
					}}
				/>
				<Tabs.Screen
					name="ProfileTab"
					options={{
						title: "Профиль",
						tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
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
				name="TransportationTab"
				options={{
					title: "Груз",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package-variant-closed" size={30} color={color} />,
					href: null,
				}}
			/>
			<Tabs.Screen
				name="DriverOrdersTab"
				options={{
					title: "Перевозки",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-delivery-outline" size={30} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="JournalTab"
				options={{
					title: "Журнал",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" size={30} color={color} />,
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
				name="GarageTab"
				options={{
					title: "Гараж",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="garage-variant" size={30} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="ProfileTab"
				options={{
					title: "Профиль",
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
				}}
			/>
		</Tabs>
	);
}
