import * as React from "react";
import { useState } from "react";
import { Platform } from "react-native";
import { View, Pressable, Input, Text } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment, { Moment } from "moment";

type DateTimePickerWrapperProps = {
	date?: Moment;
	onChanged: (value: Moment | undefined) => void;
	placeholder?: string;
	leftText?: string;
};

export default function DateTimePickerWrapper(props: DateTimePickerWrapperProps) {
	const { date, onChanged, placeholder, leftText } = props;

	const [selectedDate, setSelectedDate] = useState<Moment | undefined>(date);
	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const dateOnChange = (event: any, selectedDate?: Date) => {
		setShowDateTimePicker(false);
		const newDate = selectedDate ? moment(selectedDate) : undefined;
		setSelectedDate(newDate);
		onChanged(newDate);
	};

	return (
		<View>
			{Platform.OS === "web" ? null : (
				<Pressable onPress={() => setShowDateTimePicker(true)}>
					<Input
						isReadOnly={true}
						variant="filled"
						size="md"
						placeholder={placeholder}
						value={selectedDate?.format("DD MMMM YYYY")}
						leftElement={
							<Text minW={8} variant={"body17_gray"} ml={3}>
								{leftText}
							</Text>
						}
					/>
				</Pressable>
			)}

			{showDateTimePicker && (
				<DateTimePicker value={selectedDate?.toDate() ?? new Date()} is24Hour={true} display="default" onChange={dateOnChange} />
			)}
		</View>
	);
}
