import * as React from 'react';
import SelectList from '../components/common/selectList/SelectList';
import { CarBodyType } from '../api/truck/CarBodyType';
import { CARBODY_SELECT_ITEMS } from '../components/common/selectList/CarBodySelectItemArray';

export default function SelectCarBodyModal() {
    const carBodies = (Object.values(CarBodyType) as Array<keyof typeof CarBodyType>)
    
    const onSavedHandler = (item: Object) => {
        alert('zzz')
        //dispatch(setAdditionServicesForBooking(services))
    };

    return (<SelectList isSelectionMode={true} data={CARBODY_SELECT_ITEMS} onSaved={onSavedHandler} />);
}
