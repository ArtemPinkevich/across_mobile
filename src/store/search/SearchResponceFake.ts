import { ApiCommonResult } from "../../api/common/commonApi";
import { SearchResponse } from "../../api/search/Search";
import { PackagingType } from "../../api/transportation/PackagingType";
import { TransportationStatus } from "../../api/transportation/TransportationStatus";

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
                name: "Снег",
                weight: 50,
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
