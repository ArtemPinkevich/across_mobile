import { Redirect, router } from "expo-router";
import { useLazyGetProfileQuery } from "../../store/rtkQuery/profileApi";
import { useEffect } from "react";
import { SHIPPER_ROLE } from "../../api/profile/Profile";

export default function Index() {
	const [trigger] = useLazyGetProfileQuery();

	useEffect(() => {
		const replaceByRoleAsync = async () => {
			const result = await trigger();

			if (result.isSuccess) {
				const profile = result.data;
				profile.role === SHIPPER_ROLE ? router.replace("/FreeTransportationsTab") : router.replace("/DriverOrdersTab");
			}
		};

		replaceByRoleAsync();
	}, []);

	return <Redirect href="/(app)/(tabs)/ProfileTab" />;
}
