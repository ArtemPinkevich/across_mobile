import { configureStore } from "@reduxjs/toolkit";
import { garageSlice } from "./slices/garageSlice";
import { buildTransportationSlice } from "./slices/buildTransportationSlice";
import { garageApi } from "./garage/garageApi";
import { transportationApi } from "./load/transportationApi";
import { profileApi } from "./profile/profileApi";

export const store = configureStore({
    reducer: {
        [garageSlice.name]: garageSlice.reducer,
        [buildTransportationSlice.name]: buildTransportationSlice.reducer,
        [garageApi.reducerPath]: garageApi.reducer,
        [transportationApi.reducerPath]: transportationApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([garageApi.middleware, transportationApi.middleware, profileApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
