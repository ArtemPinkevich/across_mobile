import { ApiCommonResult } from "../../api/common/commonApi";
import { SearchResponse } from "../../api/search/Search";
import { PackagingType } from "../../api/transportation/PackagingType";
import { TransportationStatus } from "../../api/transportation/TransportationStatus";
import { CarBodyType } from "../../api/truck/CarBodyType";
import { LoadingType } from "../../api/truck/LoadingType";

export const searchResponseFake: SearchResponse = {
    result: ApiCommonResult.Ok,
    reasons: [],
    transportationOrders: [
        {
            loadPublishInfo: {
                loadingDateFrom: "2024-04-27T08:02:17+07:00",
                loadingDateTo: "",
                loadingLocalityName: "",
                loadingAddress: "Томск",
                unloadingLocalityName: "",
                unloadingAddress: "Тараз",
            },
            load: {
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
                    loadingType: [LoadingType.hydraulic, LoadingType.apparels],
                    unloadingTypes: [LoadingType.withRemovablePillars, LoadingType.dieselCompressor],
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
            transportationStatus: TransportationStatus.readyToLoad,
        },
        {
            loadPublishInfo: {
                loadingDateFrom: "2024-04-27T08:02:17+07:00",
                loadingDateTo: "",
                loadingLocalityName: "",
                loadingAddress: "Томск",
                unloadingLocalityName: "",
                unloadingAddress: "Тараз",
            },
            load: {
                createdId: "2024-04-27T08:02:17+07:00",
                name: "Воздух",
                weight: 100,
                volume: 30,
                packagingType: PackagingType.bags,
            },
            transportationStatus: TransportationStatus.readyToLoad,
        },
        {
            loadPublishInfo: {
                loadingDateFrom: "2024-04-27T08:02:17+07:00",
                loadingDateTo: "",
                loadingLocalityName: "",
                loadingAddress: "Томск",
                unloadingLocalityName: "",
                unloadingAddress: "Тараз",
            },
            load: {
                createdId: "2024-04-27T08:02:17+07:00",
                name: "Вода",
                weight: 150,
                volume: 30,
                packagingType: PackagingType.bags,
            },
            transportationStatus: TransportationStatus.readyToLoad,
        },
    ],
};
