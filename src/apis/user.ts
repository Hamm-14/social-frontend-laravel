import { projectApi } from "./query";
import { User, UserData, UserRegisterData } from "../types/user";

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
    getUser: builder.query<User, any>({
      query: (userId: string) => ({
        url: `${base_url}/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAdminAndStaffUser: builder.query<User[], any>({
      query: () => ({
        url: `${base_url}/user`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getCustomerUser: builder.query<User[], any>({
      query: () => ({
        url: `${base_url}/user/customer`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useGetAdminAndStaffUserQuery,
  useGetCustomerUserQuery,
} = userApi;
