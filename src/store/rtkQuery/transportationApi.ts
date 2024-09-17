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
		getShipperTransportations: build.query<ITransportationResult, void>({
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
		getOrdersInShipperApproving: build.query<CorrelationsResponse, void>({
			query: () => ({ url: `Search/search_orders_in_shipper_approving` }),
			providesTags: (result) =>
				result && Array.isArray(result)
					? [...result.map(({ id }: any) => ({ type: "Correlations" as const, id })), { type: "Correlations", id: "LIST" }]
					: [{ type: "Correlations", id: "LIST" }],
		}),

		// Далее общие запросы и водителя и отправителя

		getOrdersHistory: build.query<ITransportationResult, void>({
			query: () => ({ url: `TransportationOrder/get_orders_history` }),
			keepUnusedDataFor: 5,
		}),

		// Далее водительские запросы

		tryTakeOrder: build.mutation<TransportationOrderResult, TryTakeOrderRequest>({
			query: (body) => ({
				url: `TransportationOrder/try_take_order`,
				method: "POST",
				data: body,
			}),
			invalidatesTags: ["Transportations"],
		}),
		getRequestedOrders: build.query<ITransportationResult, void>({
			query: () => ({ url: `TransportationOrder/get_requested_orders` }),
			providesTags: (result) =>
				result && Array.isArray(result)
					? [...result.map(({ id }: any) => ({ type: "Transportations" as const, id })), { type: "Transportations", id: "LIST" }]
					: [{ type: "Transportations", id: "LIST" }],
		}),
		getAssignedOrders: build.query<ITransportationResult, void>({
			query: () => ({ url: `TransportationOrder/get_assigned_orders` }),
			providesTags: (result) =>
				result && Array.isArray(result)
					? [...result.map(({ id }: any) => ({ type: "Transportations" as const, id })), { type: "Transportations", id: "LIST" }]
					: [{ type: "Transportations", id: "LIST" }],
		}),
		informArrivalForLoading: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `TransportationOrder/inform_arrival_for_loading/${id}`,
				method: "POST",
				data: id,
			}),
			invalidatesTags: ["Transportations"],
		}),
		startTransportation: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `TransportationOrder/start_transportation/${id}`,
				method: "POST",
				data: id,
			}),
			invalidatesTags: ["Transportations"],
		}),
		informArrivalForUnloading: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `TransportationOrder/inform_arrival_for_unloading/${id}`,
				method: "POST",
				data: id,
			}),
			invalidatesTags: ["Transportations"],
		}),
		deliveredTransportation: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `TransportationOrder/delivered_transportation/${id}`,
				method: "POST",
				data: id,
			}),
			invalidatesTags: ["Transportations"],
		}),
	}),
});

export const {
	useGetShipperTransportationsQuery,
	useAddOrUpdateTransportationMutation,
	useDeleteTransportationMutation,
	useTryTakeOrderMutation,
	useAssignTruckMutation,
	useGetOrdersInShipperApprovingQuery,
	useDeliveredTransportationMutation,
	useGetRequestedOrdersQuery,
	useGetAssignedOrdersQuery,
	useGetOrdersHistoryQuery,
	useInformArrivalForLoadingMutation,
	useStartTransportationMutation,
	useInformArrivalForUnloadingMutation,
} = transportationApi;
