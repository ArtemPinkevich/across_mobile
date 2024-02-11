import { router } from "expo-router";
import { View } from "react-native";
import { useSession } from "../auth/ctx";
import { useEffect, useState } from "react";
import { authorizeAsync } from "../api/authorization/AuthorizationApi";
import { useDispatch, useSelector } from "react-redux";
import PhoneNumberInput from "../components/common/PhoneNumberInput";
import { RootState } from "../store/configureStore";
import { Center, Button, Spinner } from "native-base";
import { setProfilePhoneNumber } from "../store/slices/profileSlice";

export default function SignIn() {
    const { signIn } = useSession();
    const dispatch = useDispatch();

    const profilePhoneNumber: string = useSelector((state: RootState) => state.profile.phoneNumber);

    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(profilePhoneNumber);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAuthorize = async () => {
        if (phoneNumber && phoneNumber !== "") {
            setIsLoading(true);
            const response = await authorizeAsync(phoneNumber, "Qq_string1");

            if (response) {
                dispatch(setProfilePhoneNumber(phoneNumber));
                signIn(response.accessToken);
                router.replace("/(app)/(tabs)");
            }

            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthorize();
    }, []);

    const signInHandler = () => {
        if (phoneNumber === "") {
            alert("Необходимо указать номер телефона");
            return;
        }

        fetchAuthorize();
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} />
            <Center my={"10"}>
                {isLoading ? (
                    <Spinner accessibilityLabel="Loading Auth" />
                ) : (
                    <Button variant="outline" minW={200} size={"lg"} onPress={signInHandler}>
                        Войти
                    </Button>
                )}
            </Center>
        </View>
    );
}
