import * as React from 'react';
import { CARBODY_DISPLAYNAME_ARRAY } from '../../components/common/selectList/CarBodySelectItemArray';
import SelectList from '../../components/common/selectList/SelectList';
import { useDispatch } from 'react-redux';
import { setCarBody } from '../../store/slices/garageSlice';
import { ISelectItem } from '../../components/common/selectList/SelectItem';

export default function CarBodySelectListModal() {
    const dispatch = useDispatch()
    
    const onChangedHandler = (items: ISelectItem[]) => {
        if (items && items[0]){
            dispatch(setCarBody(items[0].value))
        }
    };

    return (<SelectList data={CARBODY_DISPLAYNAME_ARRAY} onChanged={onChangedHandler} />);
}
