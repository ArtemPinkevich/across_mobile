import { ApiCommonResult } from "../common/commonApi";
import { ITransportation } from "../transportation/Transportation";

export interface SearchRequest {
    fromAddress: string;
    toAddress: string;
    loadDate: string;
}

export interface SearchResponse {
    result: ApiCommonResult;
    reasons: string[];
    transportationOrders: ITransportation[];
}
