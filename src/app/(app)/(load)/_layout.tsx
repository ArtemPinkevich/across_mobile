import { Stack } from "expo-router";

export default function LoadLayout() {
    return (
        <Stack>
            <Stack.Screen name="EditLoadModal" options={{ title: "Информация о грузе", presentation: "modal" }} />
            <Stack.Screen name="PackagingTypeSelectListModal" options={{ title: "Выбор типа упаковки", presentation: "modal" }} />
        </Stack>
    );
}
