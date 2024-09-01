import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import {
	CorrelationsResponse,
	IAssignTruckRequest,
	ITransportation,
	ITransportationResult,
	TransportationOrderResult,
	TryTakeOrderRequest,
} from "../../api/transportation/Transportation";

export const transportationApi = createApi({
	reducerPath: "transportationApi",
	tagTypes: ["Transportations", "Correlations"],
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getTransportations: build.query<ITransportationResult, void>({
			query: () => ({ url: `TransportationOrder/get_orders` }),
			providesTags: (result) =>
				result && Array.isArray(result)
					? [...result.map(({ id }: any) => ({ type: "Transportations" as const, id })), { type: "Transportations", id: "LIST" }]
					: [{ type: "Transportations", id: "LIST" }],
		}),
		addOrUpdateTransportation: build.mutation<TransportationOrderResult, ITransportation>({
			query: (body) => ({
				url: `TransportationOrder/add_or_update_order`,
				method: "POST",
				data: body,
			}),
			invalidatesTags: ["Transportations"],
		}),
		deleteTransportation: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `TransportationOrder/delete_load/${id}`,
				method: "DELETE",
				data: id,
			}),
			invalidatesTags: ["Transportations"],
		}),
		assignTruck: build.mutation<TransportationOrderResult, IAssignTruckRequest>({
			query: (body) => ({
				url: "TransportationOrder/assign_truck",
				method: "POST",
				data: body,
			}),
			invalidatesTags: ["Transportations", "Correlations"],
		}),
		tryTakeOrder: build.mutation<TransportationOrderResult, TryTakeOrderRequest>({
			query: (body) => ({
				url: `TransportationOrder/try_take_order`,
				method: "POST",
				data: body,
			}),
			invalidatesTags: ["Transportations"],
		}),
		getOrdersInShipperApproving: build.query<CorrelationsResponse, void>({
			query: () => ({ url: `Search/search_orders_in_shipper_approving` }),
			providesTags: (result) =>
				result && Array.isArray(result)
					? [...result.map(({ id }: any) => ({ type: "Correlations" as const, id })), { type: "Correlations", id: "LIST" }]
					: [{ type: "Correlations", id: "LIST" }],
		}),
	}),
});

export const {
	useGetTransportationsQuery,
	useAddOrUpdateTransportationMutation,
	useDeleteTransportationMutation,
	useTryTakeOrderMutation,
	useAssignTruckMutation,
	useGetOrdersInShipperApprovingQuery,
} = transportationApi;
