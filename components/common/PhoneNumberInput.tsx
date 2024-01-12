import { Input, InputField, InputSlot, Text } from '@gluestack-ui/themed';
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface PhoneNumberInputProps {
    onChange: (value: string) => void;
    value?: string;
}
  
export default function PhoneNumberInput(props: PhoneNumberInputProps) {
  
    const [phoneNumber, setPhoneNumber] = useState('')

  	useEffect(() => {
		let trimmedPhone: string | undefined = props.value;
		if (trimmedPhone && trimmedPhone.length > 0){
			if (trimmedPhone.indexOf('+7') != -1){
				trimmedPhone = trimmedPhone.substring(2);
			}
			const firstChar = trimmedPhone.charAt(0);
			if (firstChar === '7' || firstChar === '8'){
				trimmedPhone = trimmedPhone.substring(1);
			}
		}
		
		setPhoneNumber(trimmedPhone ?? '')
	}, []);
    
    const onPhoneChange = (value: string) => {
        setPhoneNumber(value);
        const adjustedPhoneNumber = value?.length > 0 ? `+7${value}` : '';
        props.onChange(adjustedPhoneNumber);
    }

    return (
        <Input variant="underlined" size="md">
            <InputSlot pl="$3">
                <Text>+7</Text>
            </InputSlot>
            <InputField placeholder="Номер телефона" value={phoneNumber} onChangeText={onPhoneChange} keyboardType="number-pad" />
        </Input>
    );
}
