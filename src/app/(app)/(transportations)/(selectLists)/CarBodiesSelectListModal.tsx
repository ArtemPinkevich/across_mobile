import { useDispatch, useSelector } from "react-redux";
import { CARBODY_DISPLAY_NAME_ARRAY, CARBODY_DISPLAY_NAME_MAP } from "../../../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { ISelectItem } from "../../../../components/common/selectList/SelectItem";
import SelectList from "../../../../components/common/selectList/SelectList";
import { RootState } from "../../../../store/configureStore";
import { setTruckRequirementsCarBodies } from "../../../../store/slices/buildTransportationSlice";

export default function CarBodiesSelectListModal() {
    const dispatch = useDispatch();

    const editingCargo = useSelector((state: RootState) => state.buildTransportation.editingTransportation.cargo);
    const defaultSelected = editingCargo.truckRequirements?.carBodies.map((o) => {
        const selectItem: ISelectItem = { value: o, displayName: CARBODY_DISPLAY_NAME_MAP.get(o) ?? "" };
        return selectItem;
    });

    const onChangedHandler = (items: ISelectItem[]) => {
        if (items) {
            dispatch(setTruckRequirementsCarBodies(items.map((o) => o.value)));
        }
    };

    return <SelectList isMultiselect data={CARBODY_DISPLAY_NAME_ARRAY} defaultSelected={defaultSelected} onChanged={onChangedHandler} />;
}
