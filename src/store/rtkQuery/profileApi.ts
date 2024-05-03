import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { IProfile, IProfileResult } from "../../api/profile/Profile";

export const profileApi = createApi({
    reducerPath: "profileApi",
    tagTypes: ["Profile"],
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getProfile: build.query<IProfile, void>({
            query: () => ({ url: `Profiles/get_profile` }),
            providesTags: ["Profile"],
        }),
        updateProfile: build.mutation<IProfileResult, IProfile>({
            query: (body) => ({
                url: `Profiles/update_profile`,
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
