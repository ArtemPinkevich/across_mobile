import * as React from "react";
import { CarBodyType } from "../../api/truck/CarBodyType";
import { CheckIcon, Select } from "native-base";

export interface CarBodySelectProps {
    onChange: (value: string) => void;
    value?: string;
}

export default function CarBodySelect(props: CarBodySelectProps) {
    const { value, onChange } = props;

    return (
        <Select
            selectedValue={value}
            variant="underlined"
            onValueChange={onChange}
            _selectedItem={{
                bg: "primary.500",
                endIcon: <CheckIcon size="5" color="coolGray.200" />,
            }}
        >
            <Select.Item label="Тентованный" value={CarBodyType.tentTruck.toString()} />
            <Select.Item label="Контейнер" value={CarBodyType.container.toString()} />
            <Select.Item label="Фургон" value={CarBodyType.van.toString()} />
            <Select.Item label="Цельнометалл" value={CarBodyType.allMetal.toString()} />
            <Select.Item label="Изотермический" value={CarBodyType.isothermal.toString()} />
            <Select.Item label="Рефрижератор" value={CarBodyType.refrigerator.toString()} />
            <Select.Item label="Реф. мультирежимный" value={CarBodyType.refrigeratorMult.toString()} />
            <Select.Item label="Реф. с перегородкой" value={CarBodyType.bulkheadRefr.toString()} />
            <Select.Item label="Реф.-тушевоз" value={CarBodyType.meatRailsRef.toString()} />
            <Select.Item label="Бортовой" value={CarBodyType.flatbed.toString()} />
            <Select.Item label="Открытый конт." value={CarBodyType.opentop.toString()} />
            <Select.Item label="Площадка без бортов" value={CarBodyType.opentrailer.toString()} />
            <Select.Item label="Самосвал" value={CarBodyType.dumpTruck.toString()} />
            <Select.Item label="Шаланда" value={CarBodyType.barge.toString()} />
            <Select.Item label="Низкорамный" value={CarBodyType.dolly.toString()} />
            <Select.Item label="Низкорам.платф." value={CarBodyType.dollyPlat.toString()} />
            <Select.Item label="Телескопический" value={CarBodyType.adjustable.toString()} />
            <Select.Item label="Трал" value={CarBodyType.tral.toString()} />
            <Select.Item label="Балковоз(негабарит)" value={CarBodyType.beamTruckNgb.toString()} />
            <Select.Item label="Автобус" value={CarBodyType.bus.toString()} />
            <Select.Item label="Автовоз" value={CarBodyType.Autocart.toString()} />
            <Select.Item label="Автовышка" value={CarBodyType.autotower.toString()} />
            <Select.Item label="Автотранспортер" value={CarBodyType.autoCarrier.toString()} />
            <Select.Item label="Бетоновоз" value={CarBodyType.сoncreteTruck.toString()} />
            <Select.Item label="Битумовоз" value={CarBodyType.bitumenTruck.toString()} />
            <Select.Item label="Бензовоз" value={CarBodyType.fuelTank.toString()} />
            <Select.Item label="Вездеход" value={CarBodyType.offRoader.toString()} />
            <Select.Item label="Газовоз" value={CarBodyType.gas.toString()} />
            <Select.Item label="Зерновоз" value={CarBodyType.grainTruck.toString()} />
            <Select.Item label="Коневоз" value={CarBodyType.horseTruck.toString()} />
            <Select.Item label="Контейнеровоз" value={CarBodyType.containerTrail.toString()} />
            <Select.Item label="Кормовоз" value={CarBodyType.furageTuck.toString()} />
            <Select.Item label="Кран" value={CarBodyType.crane.toString()} />
            <Select.Item label="Лесовоз" value={CarBodyType.timberTruck.toString()} />
            <Select.Item label="Ломовоз" value={CarBodyType.scrapTruck.toString()} />
            <Select.Item label="Манипулятор" value={CarBodyType.manipulator.toString()} />
            <Select.Item label="Микроавтобус" value={CarBodyType.microbus.toString()} />
            <Select.Item label="Муковоз" value={CarBodyType.flourTruck.toString()} />
            <Select.Item label="Панелевоз" value={CarBodyType.panelsTruck.toString()} />
            <Select.Item label="Пикап" value={CarBodyType.pickup.toString()} />
            <Select.Item label="Пухтовоз" value={CarBodyType.ripetruck.toString()} />
            <Select.Item label="Пирамида" value={CarBodyType.pyramid.toString()} />
            <Select.Item label="Рулоновоз" value={CarBodyType.rollTruck.toString()} />
            <Select.Item label="Седельный тягач" value={CarBodyType.tractor.toString()} />
            <Select.Item label="Скотовоз" value={CarBodyType.cattle.toString()} />
            <Select.Item label="Стекловоз" value={CarBodyType.innloader.toString()} />
            <Select.Item label="Трубовоз" value={CarBodyType.pipeTruck.toString()} />
            <Select.Item label="Цементовоз" value={CarBodyType.cementTruck.toString()} />
            <Select.Item label="Автоцистерна" value={CarBodyType.tankerTruck.toString()} />
            <Select.Item label="Щеповоз" value={CarBodyType.chipTruck.toString()} />
            <Select.Item label="Эвакуатор" value={CarBodyType.wrecker.toString()} />
            <Select.Item label="Грузопассажирский" value={CarBodyType.dualPurpose.toString()} />
            <Select.Item label="Клюшковоз" value={CarBodyType.klyushkovoz.toString()} />
            <Select.Item label="Мусоровоз" value={CarBodyType.garbageTruck.toString()} />
            <Select.Item label="Jumbo" value={CarBodyType.jumbo.toString()} />
            <Select.Item label="20' танк-контейнер" value={CarBodyType.tankContainer20.toString()} />
            <Select.Item label="40' танк-контейнер" value={CarBodyType.tankContainer40.toString()} />
            <Select.Item label="Мега фура" value={CarBodyType.mega.toString()} />
            <Select.Item label="Допельшток" value={CarBodyType.doppelstock.toString()} />
            <Select.Item label="Раздвижной полуприцеп 20'/40'" value={CarBodyType.slidingSemiTrailer2040.toString()} />
        </Select>
    );
}
