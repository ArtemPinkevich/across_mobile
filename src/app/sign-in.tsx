import { router } from "expo-router";
import { View } from "react-native";
import { useSession } from "../auth/ctx";
import { useEffect, useState } from "react";
import { AuthorizationApi } from "../api/authorization/AuthorizationApi";
import PhoneNumberInput from "../components/common/PhoneNumberInput";
import { Center, Button, Spinner } from "native-base";
import { AsyncStorageKeys, getFromAsyncStorage, saveInAsyncStorage } from "../services/AsyncStorageService";

export default function SignIn() {
    const { signIn } = useSession();

    const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAuthorize = async () => {
        let phone = phoneNumber;
        if (!phone) {
            phone = (await getFromAsyncStorage(AsyncStorageKeys.phoneNumber)) ?? "";
        }

        if (phone) {
            setIsLoading(true);
            const response = await AuthorizationApi.authorize(phone, "Qq_string1");

            if (response) {
                saveInAsyncStorage(AsyncStorageKeys.phoneNumber, phone);
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
