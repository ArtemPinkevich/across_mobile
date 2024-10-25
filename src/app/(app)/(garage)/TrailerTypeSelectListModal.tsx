import * as React from "react";
import SelectList from "../../../components/common/selectList/SelectList";
import { useDispatch } from "react-redux";
import { setTrailerType } from "../../../store/slices/garageSlice";
import { ISelectItem } from "../../../components/common/selectList/SelectItem";
import { TRAILER_TYPE_DISPLAY_NAME_ARRAY } from "../../../api/transportation/toDisplayNameMappers/TrailerTypeToDisplayNameMap";

export default function TrailerTypeSelectListModal() {
	const dispatch = useDispatch();

	const onChangedHandler = (items: ISelectItem[]) => {
		if (items && items[0]) {
			dispatch(setTrailerType(items[0].value));
		}
	};

	return <SelectList data={TRAILER_TYPE_DISPLAY_NAME_ARRAY} onChanged={onChangedHandler} />;
}
