import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { IProfile, IProfileResult } from "../../api/profile/Profile";

export const profileApi = createApi({
	reducerPath: "profileApi",
	tagTypes: ["Profile"],
	baseQuery: axiosBaseQuery(),
	refetchOnMountOrArgChange: true,
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
		changeRole: build.mutation<void, string>({
			query: (body) => ({
				url: `Profiles/change_role`,
				method: "POST",
				data: body,
			}),
		}),
	}),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useChangeRoleMutation, useLazyGetProfileQuery } = profileApi;
