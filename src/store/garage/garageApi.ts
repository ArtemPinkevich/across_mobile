import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import { ITruck, ITrucksListResultDto, ITruckResultDto } from "../../api/truck/Truck";

export const garageApi = createApi({
    reducerPath: "garageApi",
    tagTypes: ["Trucks"],
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getTrucks: build.query<ITrucksListResultDto, void>({
            query: () => ({ url: `Truck/get_trucks` }),
            providesTags: (result) =>
                result && Array.isArray(result)
                    ? [...result.map(({ id }: any) => ({ type: "Trucks" as const, id })), { type: "Trucks", id: "LIST" }]
                    : [{ type: "Trucks", id: "LIST" }],
        }),
        addOrUpdateTruck: build.mutation<ITruckResultDto, ITruck>({
            query: (body) => ({
                url: `Truck/add_or_update_truck`,
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Trucks"],
        }),
        deleteTruck: build.mutation<ITruckResultDto, number>({
            query: (id) => ({
                url: `Truck/delete_truck/${id}`,
                method: "DELETE",
                data: id,
            }),
            invalidatesTags: ["Trucks"],
        }),
    }),
});

export const { useGetTrucksQuery, useAddOrUpdateTruckMutation, useDeleteTruckMutation } = garageApi;
