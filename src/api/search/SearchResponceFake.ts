import { ApiCommonResult } from "../common/commonApi";
import { SearchResponse } from "./Search";
import { PackagingType } from "../transportation/PackagingType";
import { TransportationStatus } from "../transportation/TransportationStatus";
import { CarBodyType } from "../truck/CarBodyType";
import { LoadingType } from "../truck/LoadingType";

export const searchResponseFake: SearchResponse = {
	result: ApiCommonResult.Ok,
	reasons: [],
	transportationOrders: [
		{
			transferInfo: {
				loadingDateFrom: "2024-04-27T08:02:17+07:00",
				loadingDateTo: "",
				loadingPlace: { city: "Томск", country: "Россия", region: "обл. Томская" },
				loadingAddress: "ул. Погрузкина, 1",
				unloadingPlace: { city: "Тараз", country: "Казахстан", region: "обл. Таразкая" },
				unloadingAddress: "пр. Выгрузкина, 404а/1 к7",
			},
			cargo: {
				createdId: "2024-04-27T08:02:17+07:00",
				name: "Снег, очень много качественного кристалического снега в коробках (не желтый)",
				weight: 50,
				volume: 30,
				packagingType: PackagingType.bags,
				length: 15,
				height: 2,
				width: 2,
				diameter: 3,
				packagingQuantity: 99,
				truckRequirements: {
					carBodies: [
						CarBodyType.tentTruck,
						CarBodyType.Autocart,
						CarBodyType.bus,
						CarBodyType.bitumenTruck,
						CarBodyType.allMetal,
						CarBodyType.crane,
					],
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
			transportationOrderStatus: TransportationStatus.carrierFinding,
		},
		{
			transferInfo: {
				loadingDateFrom: "2024-04-27T08:02:17+07:00",
				loadingDateTo: "",
				loadingPlace: { city: "Санкт-Петербург", country: "Россия", region: "обл. Ленинградская" },
				loadingAddress: "пр. Невский, 1",
				unloadingPlace: { city: "Астана", country: "Казахстан", region: "обл. Целеноградская" },
				unloadingAddress: "пр. Выгрузкина, 404а/1 к7",
			},
			cargo: {
				createdId: "2024-04-27T08:02:17+07:00",
				name: "Воздух",
				weight: 100,
				volume: 30,
				packagingType: PackagingType.bags,
			},
			transportationOrderStatus: TransportationStatus.carrierFinding,
		},
		{
			transferInfo: {
				loadingDateFrom: "2024-04-27T08:02:17+07:00",
				loadingDateTo: "",
				loadingPlace: { city: "Томск", country: "Россия", region: "обл. Томская" },
				loadingAddress: "ул. Погрузкина, 1",
				unloadingPlace: { city: "Тараз", country: "Казахстан", region: "обл. Таразкая" },
				unloadingAddress: "пр. Выгрузкина, 404а/1 к7",
			},
			cargo: {
				createdId: "2024-04-27T08:02:17+07:00",
				name: "Вода",
				weight: 150,
				volume: 30,
				packagingType: PackagingType.bags,
			},
			transportationOrderStatus: TransportationStatus.carrierFinding,
		},
	],
};
