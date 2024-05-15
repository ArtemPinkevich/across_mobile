import { useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Button, Input } from "native-base";

import { AuthorizationService } from "../services/AuthorizationService";

export default function SignInVerify() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();

  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerificationCodeChange = (value: string) => setVerificationCode(value);

  const handleSendVerifyCode = async () => {
    setIsLoading(true);
    await AuthorizationService.sendVerificationCode(phoneNumber, verificationCode);
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input
        variant="underlined"
        size="md"
        placeholder="Код подтверждения"
        value={verificationCode}
        onChangeText={handleVerificationCodeChange}
        keyboardType="number-pad"
      />
      <Button variant="outline" minW={200} size={"lg"} disabled={!verificationCode} onPress={handleSendVerifyCode} isLoading={isLoading}>
        Отправить
      </Button>
    </View>
  );
}
