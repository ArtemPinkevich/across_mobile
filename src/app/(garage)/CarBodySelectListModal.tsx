import * as React from 'react';
import { CARBODY_SELECT_ITEMS } from '../../components/common/selectList/CarBodySelectItemArray';
import SelectList from '../../components/common/selectList/SelectList';

export default function CarBodySelectListModal() {
    const onSavedHandler = (item: Object) => {
        alert('CARBODY_SELECT_ITEMS onSavedHandler')
        //dispatch(setAdditionServicesForBooking(services))
    };

    return (<SelectList isSelectionMode={true} data={CARBODY_SELECT_ITEMS} onSaved={onSavedHandler} />);
}
