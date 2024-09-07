import { ApiCommonResult } from "../common/commonApi";
import { IPlace } from "../places/Places";
import { IProfile } from "../profile/Profile";
import { CarBodyType } from "../truck/CarBodyType";
import { LoadingType } from "../truck/LoadingType";
import { IDangerousGoods, ITruck, ITruckBase } from "../truck/Truck";
import { PackagingType } from "./PackagingType";
import { TransportationStatus } from "./TransportationStatus";

export interface ITruckRequirements extends ITruckBase, IDangerousGoods {
	carBodies: CarBodyType[]; // Кузов
	loadingTypeDtos: LoadingType[]; // Тип загрузки
	unloadingTypeDtos: LoadingType[]; // Тип выгрузки
}

// prettier-ignore
export interface ICargo {
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

    truckRequirements: ITruckRequirements
}

export interface ITransferInfo {
	loadingDateFrom: string; // Строка формата DateOnly, например "30.01.2022"
	loadingDateTo: string;
	// LoadingTimeFrom: string;            // Строка формата TimeOnly, например "08:00"
	// LoadingTimeTo: string;
	loadingPlace: IPlace;
	loadingAddress: string;

	unloadingPlace: IPlace;
	unloadingAddress: string;
	// unloadingDateFrom: string;            // Строка формата DateOnly, например "30.01.2022"
	// unloadingDateTo: string;
	// UnloadingTimeFrom: string;            // Строка формата TimeOnly, например "08:00"
	// UnloadingTimeTo: string;
}

export interface ITransportation {
	transportationOrderId?: number;
	transferInfo: ITransferInfo;
	cargo: ICargo;
	transportationOrderStatus: TransportationStatus;
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

export interface TryTakeOrderRequest {
	truckId: number;
	transportationOrderId: number;
}

export interface IAssignTruckRequest {
	truckId?: number;
	transportationOrderId?: number;
}

export interface CorrelationsResponse {
	result: ApiCommonResult;
	reasons: string[];
	ordersInProgress: ICorrelation[];
}

export interface ICorrelation {
	shipper: IProfile;
	driver: IProfile;
	truck: ITruck;
	transportationOrder: ITransportation;
}
