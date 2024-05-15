import { Input, Text } from "native-base";
import * as React from "react";

export interface PhoneNumberInputProps {
  onChange: (value: string) => void;
  value: string;
}

export default function PhoneNumberInput(props: PhoneNumberInputProps) {
  const onPhoneChange = (value: string) => {
    props.onChange(`+7${value}`);
  };

  return (
    <Input
      InputLeftElement={<Text>+7 </Text>}
      variant="underlined"
      size="md"
      placeholder="Номер телефона"
      value={props.value.slice(2)}
      onChangeText={onPhoneChange}
      keyboardType="number-pad"
    />
  );
}
