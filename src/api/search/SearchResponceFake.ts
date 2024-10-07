import { ApiCommonResult } from "../common/commonApi";
import { SearchResponse } from "./Search";
import { PackagingType } from "../transportation/PackagingType";
import { TransportationStatus } from "../transportation/TransportationStatus";
import { CarBodyType } from "../truck/CarBodyType";
import { LoadingType } from "../truck/LoadingType";
import { ITransferInfo, ITransportation } from "../transportation/Transportation";
import { IPlace } from "../places/Places";

export const FAKE_PLACE_FROM: IPlace = {
	city: "Томск",
	country: "Россия",
	region: "Томская обл.",
	latitide: "56.4887526",
	longtitude: "84.9523434",
	mapDisplayName: "mapDisplayName",
};

export const FAKE_PLACE_TO: IPlace = {
	city: "Барнаул",
	country: "Россия",
	region: "Алтайский край",
	latitide: "53.3475493",
	longtitude: "83.7788448",
	mapDisplayName: "mapDisplayName",
};

export const FAKE_TRANSFER_INFO: ITransferInfo = {
	loadingDateFrom: "2024-04-27T08:02:17+07:00",
	loadingDateTo: "",
	loadingPlace: FAKE_PLACE_FROM,
	loadingAddress: "ул. Погрузкина, 1",
	unloadingPlace: FAKE_PLACE_TO,
	unloadingAddress: "пр. Выгрузкина, 404а/1 к7",
};

export const TRANSPORTATION_FAKE: ITransportation = {
	transferInfo: FAKE_TRANSFER_INFO,
	cargo: {
		createdId: "2024-04-27T08:02:17+07:00",
		name: "Уголь",
		weight: 50,
		volume: 30,
		packagingType: PackagingType.bags,
		length: 15,
		height: 2,
		width: 2,
		diameter: 3,
		packagingQuantity: 99,
		truckRequirements: {
			carBodies: [CarBodyType.tentTruck, CarBodyType.Autocart, CarBodyType.bus, CarBodyType.bitumenTruck, CarBodyType.allMetal, CarBodyType.crane],
			loadingTypeDtos: [LoadingType.hydraulic, LoadingType.apparels],
			unloadingTypeDtos: [LoadingType.withRemovablePillars, LoadingType.dieselCompressor],
			hasLtl: true,
			hasLiftgate: true,
			hasStanchionTrailer: true,
			carryingCapacity: 69,
			adr1: true,
			adr2: true,
			adr3: true,
			adr4: true,
			adr5: true,
			adr6: true,
			adr7: true,
			adr8: true,
			adr9: true,
			tir: true,
			ekmt: true,
		},
	},
	contactInfoDto: {
		loadingTime: "18:00",
		loadingContactPerson: "Фио На Загрузке",
		loadingContactPhone: "79001110011",
		unloadingContactPerson: "Фио На Выгрузке",
		unloadingContactPhone: "79002220022",
	},
	transportationOrderStatus: TransportationStatus.managerApproving,
	price: 300000,
};

export const searchResponseFake: SearchResponse = {
	result: ApiCommonResult.Ok,
	reasons: [],
	transportationOrders: [
		TRANSPORTATION_FAKE,
		{
			transferInfo: {
				loadingDateFrom: "2024-04-27T08:02:17+07:00",
				loadingDateTo: "",
				loadingPlace: {
					city: "Санкт-Петербург",
					country: "Россия",
					region: "обл. Ленинградская",
					latitide: "",
					longtitude: "",
					mapDisplayName: "",
				},
				loadingAddress: "пр. Невский, 1",
				unloadingPlace: {
					city: "Астана",
					country: "Казахстан",
					region: "обл. Целеноградская",
					latitide: "",
					longtitude: "",
					mapDisplayName: "",
				},
				unloadingAddress: "пр. Выгрузкина, 404а/1 к7",
			},
			cargo: {
				createdId: "2024-04-27T08:02:17+07:00",
				name: "Воздух",
				weight: 100,
				volume: 30,
				packagingType: PackagingType.bags,
				truckRequirements: undefined,
				price: 10000,
			},
			transportationOrderStatus: TransportationStatus.carrierFinding,
		},
		{
			transferInfo: {
				loadingDateFrom: "2024-04-27T08:02:17+07:00",
				loadingDateTo: "",
				loadingPlace: {
					city: "Томск",
					country: "Россия",
					region: "обл. Томская",
					latitide: "",
					longtitude: "",
					mapDisplayName: "",
				},
				loadingAddress: "ул. Погрузкина, 1",
				unloadingPlace: {
					city: "Тараз",
					country: "Казахстан",
					region: "обл. Таразкая",
					latitide: "",
					longtitude: "",
					mapDisplayName: "",
				},
				unloadingAddress: "пр. Выгрузкина, 404а/1 к7",
			},
			cargo: {
				createdId: "2024-04-27T08:02:17+07:00",
				name: "Вода",
				weight: 150,
				volume: 30,
				packagingType: PackagingType.bags,
				truckRequirements: undefined,
			},
			transportationOrderStatus: TransportationStatus.carrierFinding,
		},
	],
};
