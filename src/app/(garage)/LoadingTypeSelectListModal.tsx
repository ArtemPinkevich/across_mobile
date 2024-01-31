import * as React from 'react';
import SelectList from '../../components/common/selectList/SelectList';
import { LOADING_TYPE_DISPLAY_NAME_ARRAY, LOADING_TYPE_DISPLAY_NAME_MAP } from '../../components/common/selectList/LoadingTypeToDisplayNameMap';
import { useDispatch, useSelector } from 'react-redux';
import { ISelectItem } from '../../components/common/selectList/SelectItem';
import { setLoadingType } from '../../store/slices/garageSlice';
import { RootState } from '../../store/configureStore';

export default function LoadingTypeSelectListModal() {
    
    const dispatch = useDispatch()
    
    const editingTruсk = useSelector((state: RootState) => state.garage.editingTruсk)
    const defaultSelected = editingTruсk.loadingType?.map(o => {
        const selectItem: ISelectItem = { value: o, displayName: LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? '' };
        return selectItem;
    })
    
    const onChangedHandler = (items: ISelectItem[]) => {
        if (items){
            dispatch(setLoadingType(items.map(o => o.value)))
        }
    };

    return (<SelectList isMultiselect data={LOADING_TYPE_DISPLAY_NAME_ARRAY} defaultSelected={defaultSelected} onChanged={onChangedHandler} />);
}
