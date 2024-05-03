import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { ITransportation, ITransportationResult, TransportationOrderResult } from "../../api/transportation/Transportation";

export const transportationApi = createApi({
    reducerPath: "transportationApi",
    tagTypes: ["Transportations"],
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
    }),
});

export const { useGetTransportationsQuery, useAddOrUpdateTransportationMutation, useDeleteTransportationMutation } = transportationApi;
