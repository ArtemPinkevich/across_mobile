import * as React from 'react';
import SelectList from '../../components/common/selectList/SelectList';
import { LOADING_TYPE_DISPLAY_NAME_ARRAY } from '../../components/common/selectList/LoadingTypeToDisplayNameMap';
import { useDispatch } from 'react-redux';
import { ISelectItem } from '../../components/common/selectList/SelectItem';
import { setLoadingType } from '../../store/slices/garageSlice';

export default function LoadingTypeSelectListModal() {
    
    const dispatch = useDispatch()
    
    const onChangedHandler = (items: ISelectItem[]) => {
        if (items){
            dispatch(setLoadingType(items.map(o => o.value)))
        }
    };

    return (<SelectList isMultiselect data={LOADING_TYPE_DISPLAY_NAME_ARRAY} onChanged={onChangedHandler} />);
}
