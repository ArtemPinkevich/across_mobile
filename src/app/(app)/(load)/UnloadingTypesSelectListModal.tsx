import { useDispatch, useSelector } from "react-redux";
import { ISelectItem } from "../../../components/common/selectList/SelectItem";
import SelectList from "../../../components/common/selectList/SelectList";
import { RootState } from "../../../store/configureStore";
import { setTruckRequirementsUnloadingTypes } from "../../../store/slices/loadSlice";
import { LOADING_TYPE_DISPLAY_NAME_ARRAY, LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../components/common/selectList/LoadingTypeToDisplayNameMap";

export default function UnloadingTypesSelectListModal() {
    const dispatch = useDispatch();

    const editingLoad = useSelector((state: RootState) => state.load.editingLoad);
    const defaultSelected = editingLoad.truckRequirements?.unloadingTypes?.map((o) => {
        const selectItem: ISelectItem = { value: o, displayName: LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "" };
        return selectItem;
    });

    const onChangedHandler = (items: ISelectItem[]) => {
        if (items) {
            dispatch(setTruckRequirementsUnloadingTypes(items.map((o) => o.value)));
        }
    };

    return <SelectList isMultiselect data={LOADING_TYPE_DISPLAY_NAME_ARRAY} defaultSelected={defaultSelected} onChanged={onChangedHandler} />;
}
