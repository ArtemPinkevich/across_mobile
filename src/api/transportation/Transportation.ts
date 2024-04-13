import { ApiCommonResult } from "../common/commonApi";
import { CarBodyType } from "../truck/CarBodyType";
import { LoadingType } from "../truck/LoadingType";
import { IDangerousGoods, ITruckBase } from "../truck/Truck";
import { PackagingType } from "./PackagingType";
import { TransportationStatus } from "./TransportationStatus";

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

export interface ILoadPublishInfo {
    loadingDateFrom: string; // Строка формата DateOnly, например "30.01.2022"
    loadingDateTo: string;
    // LoadingTimeFrom: string;            // Строка формата TimeOnly, например "08:00"
    // LoadingTimeTo: string;
    loadingLocalityName: string;
    loadingAddress: string;

    unloadingLocalityName: string;
    unloadingAddress: string;
    // unloadingDateFrom: string;            // Строка формата DateOnly, например "30.01.2022"
    // unloadingDateTo: string;
    // UnloadingTimeFrom: string;            // Строка формата TimeOnly, например "08:00"
    // UnloadingTimeTo: string;
}

export interface ITransportation {
    transportationOrderId?: number;
    loadPublishInfo: ILoadPublishInfo;
    load: ILoad;
    transportationStatus: TransportationStatus;
}

export interface ITransportationResult {
    result: TransportationOrderResult;
    transportationOrderDtos: ITransportation[];
}

export interface TransportationOrderResult {
    transportationId?: number;
    result: ApiCommonResult;
    reasons: string[];
}
