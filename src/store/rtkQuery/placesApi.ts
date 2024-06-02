import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPlace, PlacesRequest } from "../../api/places/Places";
import { GEO_SERVER_ADDRESS } from "../../constants/GlobalConstants";

export const placesApi = createApi({
	reducerPath: "placesApi",
	// TODO Скорее всего надо будет переделать через axio да с единым токеном
	baseQuery: fetchBaseQuery({ baseUrl: GEO_SERVER_ADDRESS }),
	endpoints: (build) => ({
		getPlaces: build.query<IPlace[], PlacesRequest>({
			query: (request) => ({
				url: `Places/get_places/${encodeURIComponent(request.searchKey)}`,
			}),
		}),
	}),
});

export const { useLazyGetPlacesQuery } = placesApi;
