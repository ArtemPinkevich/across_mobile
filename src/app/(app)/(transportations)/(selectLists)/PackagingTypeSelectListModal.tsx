import * as React from "react";
import SelectList from "../../../../components/common/selectList/SelectList";
import { useDispatch } from "react-redux";
import { ISelectItem } from "../../../../components/common/selectList/SelectItem";
import { setPackagingType } from "../../../../store/slices/buildTransportationSlice";
import { PACKAGING_TYPE_DISPLAY_NAME_ARRAY } from "../../../../api/transportation/toDisplayNameMappers/PackagingTypeToDisplayNameMap";

export default function PackagingTypeSelectListModal() {
    const dispatch = useDispatch();

    const onChangedHandler = (items: ISelectItem[]) => {
        if (items && items[0]) {
            dispatch(setPackagingType(items[0].value));
        }
    };

    return <SelectList data={PACKAGING_TYPE_DISPLAY_NAME_ARRAY} onChanged={onChangedHandler} />;
}
