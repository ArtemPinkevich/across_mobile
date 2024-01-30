import * as React from 'react';
import SelectList from '../../components/common/selectList/SelectList';
import { LOADING_TYPE_SELECT_ITEM_ARRAY } from '../../components/common/selectList/LoadingTypeSelectItemArray';

export default function LoadingTypeSelectListModal() {
    const onSavedHandler = (item: Object) => {
        alert('LOADING_TYPE onSavedHandler')
        //dispatch(setAdditionServicesForBooking(services))
    };

    return (<SelectList isSelectionMode={true} data={LOADING_TYPE_SELECT_ITEM_ARRAY} onSaved={onSavedHandler} />);
}
