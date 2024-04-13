import { useDispatch, useSelector } from "react-redux";
import { ISelectItem } from "../../../components/common/selectList/SelectItem";
import SelectList from "../../../components/common/selectList/SelectList";
import { RootState } from "../../../store/configureStore";
import { setTruckRequirementsLoadingTypes } from "../../../store/slices/buildTransportationSlice";
import { LOADING_TYPE_DISPLAY_NAME_ARRAY, LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../components/common/selectList/LoadingTypeToDisplayNameMap";

export default function LoadingTypesSelectListModal() {
    const dispatch = useDispatch();

    const editingLoad = useSelector((state: RootState) => state.buildTransportation.editingLoad);
    const defaultSelected = editingLoad.truckRequirements?.loadingType?.map((o) => {
        const selectItem: ISelectItem = { value: o, displayName: LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "" };
        return selectItem;
    });

    const onChangedHandler = (items: ISelectItem[]) => {
        if (items) {
            dispatch(setTruckRequirementsLoadingTypes(items.map((o) => o.value)));
        }
    };

    return <SelectList isMultiselect data={LOADING_TYPE_DISPLAY_NAME_ARRAY} defaultSelected={defaultSelected} onChanged={onChangedHandler} />;
}
