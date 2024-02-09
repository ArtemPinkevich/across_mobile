import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../auth/ctx';

// Отсюда https://docs.expo.dev/router/reference/authentication/
export default function AppLayout() {
  const { session } = useSession();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }
  
  return (
    <Stack>
      <Stack.Screen name="(garage)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)/EditProfileModal" options={{ title: 'Редактирование профиля', presentation: 'modal' }} />
    </Stack>
  )
}
