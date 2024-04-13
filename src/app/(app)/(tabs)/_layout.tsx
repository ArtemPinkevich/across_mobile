import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tab One",
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={Colors[colorScheme ?? "light"].text}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="SearchOrdersTab"
                options={{
                    title: "Поиск",
                    tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="LoadTab"
                options={{
                    title: "Груз",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package-variant-closed" size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name="LoadJournalTab"
                options={{
                    title: "История",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" size={30} color={color} />,
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
