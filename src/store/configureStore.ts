import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./slices/profileSlice";
import { garageSlice } from "./slices/garageSlice";
import { loadSlice } from "./slices/loadSlice";

export const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
        garage: garageSlice.reducer,
        load: loadSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
