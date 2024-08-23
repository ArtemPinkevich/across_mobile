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
	}),
});

export const { useLazySearchTransportationsQuery } = searchApi;
