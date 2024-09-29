import { PackagingType } from "../transportation/PackagingType";
import { TransportationStatus } from "../transportation/TransportationStatus";
import { CarBodyType } from "../truck/CarBodyType";
import { LoadingType } from "../truck/LoadingType";
import { ITransferInfo, ITransportation } from "../transportation/Transportation";
import { IPlace } from "../places/Places";

export const FAKE_PLACE_FROM_LONG: IPlace = {
	city: "Лланвайр-Пуллгуингилл",
	country: "Российская Федерация",
	region: "Сибирский федеральный округ Томская обл.",
	latitide: "56.4887526",
	longtitude: "84.9523434",
	mapDisplayName: "mapDisplayName",
};

export const FAKE_PLACE_TO_LONG: IPlace = {
	city: "ДлинноеНазваниеГорода",
	country: "Республика Казахстан",
	region: "Сибирский федеральный округ Алтайский край",
	latitide: "53.3475493",
	longtitude: "83.7788448",
	mapDisplayName: "mapDisplayName",
};

export const FAKE_TRANSFER_INFO_LONG: ITransferInfo = {
	loadingDateFrom: "2024-04-27T08:02:17+07:00",
	loadingDateTo: "",
	loadingPlace: FAKE_PLACE_FROM_LONG,
	loadingAddress: "ул. Очень длинное название улицы, 1",
	unloadingPlace: FAKE_PLACE_TO_LONG,
	unloadingAddress: "пр. Выгрузка тоже на с длинным адресом, 404а/1 к7",
};

export const FAKE_TRANSPORTATION_LONG: ITransportation = {
	transferInfo: FAKE_TRANSFER_INFO_LONG,
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
		loadingContactPerson: "Фамилия ОченьДлинноеИмя Отчество",
		loadingContactPhone: "79001110011",
		unloadingContactPerson: "Выгружателев Выгрузительус Выгрузеевич",
		unloadingContactPhone: "79002220022",
	},
	transportationOrderStatus: TransportationStatus.waitingForLoading,
	price: 300000,
};
