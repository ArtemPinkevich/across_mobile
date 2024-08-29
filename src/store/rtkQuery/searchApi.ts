import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { SearchRequest, SearchResponse } from "../../api/search/Search";

export const searchApi = createApi({
	reducerPath: "searchApi",
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		searchTransportations: build.query<SearchResponse, SearchRequest>({
			query: (searchRequest) => ({
				url: `Search/search?FromAddress=${searchRequest.fromAddress}&ToAddress=${searchRequest.toAddress}&LoadingDate=${encodeURIComponent(
					searchRequest.loadingDate,
				)}`,
			}),
		}),
		searchRecommendationsByTruck: build.query<SearchResponse, number>({
			query: (truckId) => ({
				url: `Search/search_recommendations_by_truck/${truckId}`,
			}),
		}),
	}),
});

export const { useLazySearchTransportationsQuery, useLazySearchRecommendationsByTruckQuery } = searchApi;
