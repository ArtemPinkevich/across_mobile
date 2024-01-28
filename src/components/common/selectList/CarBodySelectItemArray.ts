import { CarBodyType } from "../../../api/truck/CarBodyType";
import { ISelectItem } from "./SelectItem";

export const CARBODY_SELECT_ITEMS: ISelectItem[] = [
    {
        displayName: "Тентованный", 
        value: CarBodyType.tentTruck
    },
    {
        displayName: "Контейнер", 
        value: CarBodyType.container
    },
    {
        displayName: "Фургон",
        value: CarBodyType.van
    },
    {
        displayName: "Цельнометалл", 
        value: CarBodyType.allMetal
    },
    {
        displayName: "Изотермический", 
        value: CarBodyType.isothermal
    },
    {
        displayName: "Рефрижератор", 
        value: CarBodyType.refrigerator
    },
    {
        displayName: "Реф. мультирежимный", 
        value: CarBodyType.refrigeratorMult
    },
    {
        displayName: "Реф. с перегородкой", 
        value: CarBodyType.bulkheadRefr
    },
    {
        displayName: "Реф.-тушевоз", 
        value: CarBodyType.meatRailsRef
    },
    {
        displayName: "Бортовой", 
        value: CarBodyType.flatbed
    },
    {
        displayName: "Открытый конт.", 
        value: CarBodyType.opentop
    },
    {
        displayName: "Площадка без бортов", 
        value: CarBodyType.opentrailer
    },
    {
        displayName: "Самосвал", 
        value: CarBodyType.dumpTruck
    },
    {
        displayName: "Шаланда", 
        value: CarBodyType.barge
    },
    {
        displayName: "Низкорамный", 
        value: CarBodyType.dolly
    },
    {
        displayName: "Низкорам.платф.", 
        value: CarBodyType.dollyPlat
    },
    {
        displayName: "Телескопический", 
        value: CarBodyType.adjustable
    },
    {
        displayName: "Трал", 
        value: CarBodyType.tral
    },
    {
        displayName: "Балковоз(негабарит)", 
        value: CarBodyType.beamTruckNgb
    },
    {
        displayName: "Автобус", 
        value: CarBodyType.bus
    },
    {
        displayName: "Автовоз", 
        value: CarBodyType.Autocart
    },
    {
        displayName: "Автовышка", 
        value: CarBodyType.autotower
    },
    {
        displayName: "Автотранспортер", 
        value: CarBodyType.autoCarrier
    },
    {
        displayName: "Бетоновоз", 
        value: CarBodyType.сoncreteTruck
    },
    {
        displayName: "Битумовоз", 
        value: CarBodyType.bitumenTruck
    },
    {
        displayName: "Бензовоз", 
        value: CarBodyType.fuelTank
    },
    {
        displayName: "Вездеход", 
        value: CarBodyType.offRoader
    },
    {
        displayName: "Газовоз", 
        value: CarBodyType.gas
    },
    {
        displayName: "Зерновоз", 
        value: CarBodyType.grainTruck
    },
    {
        displayName: "Коневоз", 
        value: CarBodyType.horseTruck
    },
    {
        displayName: "Контейнеровоз", 
        value: CarBodyType.containerTrail
    },
    {
        displayName: "Кормовоз", 
        value: CarBodyType.furageTuck
    },
    {
        displayName: "Кран", 
        value: CarBodyType.crane
    },
    {
        displayName: "Лесовоз", 
        value: CarBodyType.timberTruck
    },
    {
        displayName: "Ломовоз", 
        value: CarBodyType.scrapTruck
    },
    {
        displayName: "Манипулятор", 
        value: CarBodyType.manipulator
    },
    {
        displayName: "Микроавтобус", 
        value: CarBodyType.microbus
    },
    {
        displayName: "Муковоз", 
        value: CarBodyType.flourTruck
    },
    {
        displayName: "Панелевоз", 
        value: CarBodyType.panelsTruck
    },
    {
        displayName: "Пикап", 
        value: CarBodyType.pickup
    },
    {
        displayName: "Пухтовоз", 
        value: CarBodyType.ripetruck
    },
    {
        displayName: "Пирамида", 
        value: CarBodyType.pyramid
    },
    {
        displayName: "Рулоновоз", 
        value: CarBodyType.rollTruck
    },
    {
        displayName: "Седельный тягач", 
        value: CarBodyType.tractor
    },
    {
        displayName: "Скотовоз", 
        value: CarBodyType.cattle
    },
    {
        displayName: "Стекловоз", 
        value: CarBodyType.innloader
    },
    {
        displayName: "Трубовоз", 
        value: CarBodyType.pipeTruck
    },
    {
        displayName: "Цементовоз", 
        value: CarBodyType.cementTruck
    },
    {
        displayName: "Автоцистерна", 
        value: CarBodyType.tankerTruck
    },
    {
        displayName: "Щеповоз", 
        value: CarBodyType.chipTruck
    },
    {
        displayName: "Эвакуатор", 
        value: CarBodyType.wrecker
    },
    {
        displayName: "Грузопассажирский", 
        value: CarBodyType.dualPurpose
    },
    {
        displayName: "Клюшковоз", 
        value: CarBodyType.klyushkovoz
    },
    {
        displayName: "Мусоровоз", 
        value: CarBodyType.garbageTruck
    },
    {
        displayName: "Jumbo", 
        value: CarBodyType.jumbo
    },
    {
        displayName: "20' танк-контейнер", 
        value: CarBodyType.tankContainer20
    },
    {
        displayName: "40' танк-контейнер", 
        value: CarBodyType.tankContainer40
    },
    {
        displayName: "Мега фура", 
        value: CarBodyType.mega
    },
    {
        displayName: "Допельшток", 
        value: CarBodyType.doppelstock
    },
    {
        displayName: "Раздвижной полуприцеп 20'/40'", 
        value: CarBodyType.slidingSemiTrailer2040
    }
]
