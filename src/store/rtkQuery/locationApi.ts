import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { TransportationOrderRouteResultDto } from "../../api/places/LocationModels";

export const locationApi = createApi({
	reducerPath: "locationApi",
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getTransportationRoute: build.query<TransportationOrderRouteResultDto, number>({
			query: (orderId) => ({ url: `TransportationOrder/get_transportation_route/${orderId}` }),
		}),
	}),
});

export const { useGetTransportationRouteQuery } = locationApi;
