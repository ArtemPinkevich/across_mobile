import { ApiCommonResult } from "../common/commonApi";
import { ITransportation } from "../transportation/Transportation";

export interface SearchRequest {
    fromAddress: string;
    toAddress: string;
    loadingDate: string; // Строка формата ISO 8601: moment().toISOString(true)
}

export interface SearchResponse {
    result: ApiCommonResult;
    reasons: string[];
    transportationOrders: ITransportation[];
}
