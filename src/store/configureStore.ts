import { configureStore } from "@reduxjs/toolkit";
import { garageSlice } from "./slices/garageSlice";
import { buildTransportationSlice } from "./slices/buildTransportationSlice";
import { garageApi } from "./rtkQuery/garageApi";
import { transportationApi } from "./rtkQuery/transportationApi";
import { profileApi } from "./rtkQuery/profileApi";
import { searchApi } from "./rtkQuery/searchApi";
import { placesApi } from "./rtkQuery/placesApi";
import { locationApi } from "./rtkQuery/locationApi";
import { payApi } from "./rtkQuery/payApi";
import { transportationsSlice } from "./slices/transportationsSlice";
import { placesSlice } from "./slices/placesSlice";

export const store = configureStore({
	reducer: {
		[garageSlice.name]: garageSlice.reducer,
		[buildTransportationSlice.name]: buildTransportationSlice.reducer,
		[transportationsSlice.name]: transportationsSlice.reducer,
		[placesSlice.name]: placesSlice.reducer,
		[garageApi.reducerPath]: garageApi.reducer,
		[transportationApi.reducerPath]: transportationApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[searchApi.reducerPath]: searchApi.reducer,
		[placesApi.reducerPath]: placesApi.reducer,
		[locationApi.reducerPath]: locationApi.reducer,
		[payApi.reducerPath]: payApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			garageApi.middleware,
			transportationApi.middleware,
			profileApi.middleware,
			searchApi.middleware,
			placesApi.middleware,
			locationApi.middleware,
			payApi.middleware,
		]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
