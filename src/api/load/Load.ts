import { CarBodyType } from "../truck/CarBodyType";
import { LoadingType } from "../truck/LoadingType";
import { IDangerousGoods, ITruckBase } from "../truck/Truck";
import { PackagingType } from "./PackagingType";

export interface ITruckRequirementsForLoad extends ITruckBase, IDangerousGoods {
    carBodies: CarBodyType[]; // Кузов
    loadingType: LoadingType[]; // Тип загрузки
    unloadingTypes: LoadingType[]; // Тип выгрузки
}

// prettier-ignore
export interface ILoad {
    createdId: string,              // Нужно ли ???
    name: string,                   // Название
    weight: number,                 // Вес, т
    volume: number,                 // Объем, м3
    packagingType: PackagingType,   // Тип упаковки
    packagingQuantity?: number,     // Количество упаковки. НЕ для всех packagingType
     
    // Габариты груза (Д/Ш/В), м; Не должны превышать 50м, не должно быть более 2 знаков после запятой
    length?: number,
    width?: number,
    height?: number,

    diameter?: number,

    truckRequirements?: ITruckRequirementsForLoad
}
