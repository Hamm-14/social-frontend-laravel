import { projectApi } from "./query";
import { UserBusiness } from "../types/business";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const businessApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinesses: builder.query<UserBusiness[], any>({
      query: () => ({
        url: `${base_url}/business`,
        method: "GET",
      }),
      providesTags: ["Business"],
    }),
    getBusiness: builder.query<UserBusiness, any>({
      query: (businessId: string) => ({
        url: `${base_url}/business/${businessId}`,
        method: "GET",
      }),
      providesTags: ["Business"],
    }),
  }),
});

export const { useGetAllBusinessesQuery, useGetBusinessQuery } = businessApi;
