import { Stack } from "expo-router";

export default function LoadLayout() {
    return (
        <Stack>
            <Stack.Screen name="CargoEditingModal" options={{ title: "Информация о грузе", presentation: "modal" }} />
            <Stack.Screen name="(selectLists)/PackagingTypeSelectListModal" options={{ title: "Выбор типа упаковки", presentation: "modal" }} />
            <Stack.Screen name="TruckRequirementsModal" options={{ title: "Требования к грузовику", presentation: "modal" }} />
            <Stack.Screen name="(selectLists)/CarBodiesSelectListModal" options={{ title: "Выбор типа кузова", presentation: "modal" }} />
            <Stack.Screen name="(selectLists)/LoadingTypesSelectListModal" options={{ title: "Выбор типа загрузки", presentation: "modal" }} />
            <Stack.Screen name="(selectLists)/UnloadingTypesSelectListModal" options={{ title: "Выбор типа выгрузки", presentation: "modal" }} />
            <Stack.Screen name="TransferInfoModal" options={{ title: "Публикация груза", presentation: "modal" }} />
            <Stack.Screen
                name="(transportationDetails)/OfferedTransportationDetailsModal"
                options={{ title: "Описание заказа", presentation: "modal" }}
            />
            <Stack.Screen
                name="(transportationDetails)/OnlyInfoTransportationDetailsModal"
                options={{ title: "Описание заказа", presentation: "modal" }}
            />
        </Stack>
    );
}
