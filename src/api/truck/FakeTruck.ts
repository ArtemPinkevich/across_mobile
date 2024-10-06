import { CarBodyType } from "./CarBodyType";
import { LoadingType } from "./LoadingType";
import { TrailerType } from "./TrailerType";
import { ITruck } from "./Truck";

export const FAKE_TRUCK: ITruck = {
	createdId: "",
	regNumber: "",

	trailerType: TrailerType.Truck,
	carBodyType: CarBodyType.tentTruck,
	loadingType: [LoadingType.hydraulic, LoadingType.apparels],
	bodyVolume: 80, // объем кузова, m3 (макс. 9999)

	carryingCapacity: 20,
	hasLtl: true,
	hasLiftgate: false,
	hasStanchionTrailer: false,

	// Внутренние габариты кузова (Д/Ш/В), м; Не должны превышать 50м, не должно быть более 2 знаков после запятой
	innerBodyLength: 20,
	innerBodyWidth: 2,
	innerBodyHeight: 2,

	adr1: false,
	adr2: false,
	adr3: false,
	adr4: false,
	adr5: false,
	adr6: false,
	adr7: false,
	adr8: false,
	adr9: false,
	tir: false,
	ekmt: false,
};
