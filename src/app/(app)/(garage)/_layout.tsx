import { Stack } from 'expo-router';

export default function GarageLayout() {
  return (
    <Stack>
      <Stack.Screen name="EditCarModal" options={{ title: 'Информация о грузовике', presentation: 'modal' }} />
      <Stack.Screen name="CarBodySelectListModal" options={{ title: 'Выбор типа кузова', presentation: 'modal' }} />
      <Stack.Screen name="LoadingTypeSelectListModal" options={{ title: 'Выбор типа загрузки', presentation: 'modal' }} />
    </Stack>
  )
}
