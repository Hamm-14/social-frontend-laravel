import { projectApi } from "./query";
import { UserData, UserRegisterData } from "../types/user";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const userApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (user: UserData) => ({
        url: `${base_url}/login`,
        method: "POST",
        data: user
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (user: UserRegisterData) => ({
        url: `${base_url}/register`,
        method: "POST",
        data: user
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (userData: any) => ({
        url: `${base_url}/user`,
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation
} = userApi;
