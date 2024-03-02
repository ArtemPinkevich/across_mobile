import { Stack } from "expo-router";

// Отсюда https://docs.expo.dev/router/reference/authentication/
export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(garage)" options={{ headerShown: false }} />
      <Stack.Screen name="(load)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(profile)/EditProfileModal"
        options={{ title: "Редактирование профиля", presentation: "modal" }}
      />
    </Stack>
  );
}
