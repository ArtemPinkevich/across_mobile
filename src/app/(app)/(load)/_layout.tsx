import { Stack } from "expo-router";

export default function LoadLayout() {
    return (
        <Stack>
            <Stack.Screen name="EditLoadModal" options={{ title: "Информация о грузе", presentation: "modal" }} />
            <Stack.Screen name="PackagingTypeSelectListModal" options={{ title: "Выбор типа упаковки", presentation: "modal" }} />
            <Stack.Screen name="TruckRequirementsModal" options={{ title: "Требования к грузовику", presentation: "modal" }} />
            <Stack.Screen name="CarBodiesSelectListModal" options={{ title: "Выбор типа кузова", presentation: "modal" }} />
            <Stack.Screen name="LoadingTypesSelectListModal" options={{ title: "Выбор типа загрузки", presentation: "modal" }} />
            <Stack.Screen name="UnloadingTypesSelectListModal" options={{ title: "Выбор типа выгрузки", presentation: "modal" }} />
        </Stack>
    );
}
