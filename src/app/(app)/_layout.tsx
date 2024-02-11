import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../auth/ctx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';

// Отсюда https://docs.expo.dev/router/reference/authentication/
export default function AppLayout() {
	const { session } = useSession();
	const phoneNumber = useSelector((state: RootState) => state.profile.phoneNumber);

	// TODO Что делать когда phoneNumber будет записываться в localStorage?
	if (!session || !phoneNumber || phoneNumber === ''){
		return <Redirect href="/sign-in" />;
	}
	
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(profile)/EditProfileModal" options={{ title: 'Редактирование профиля', presentation: 'modal' }} />
		</Stack>
	)
}
