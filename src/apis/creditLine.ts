import { projectApi } from "./query";
import { CreditLine, StatusTypeEnum } from "../types/creditLine";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const creditLineApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCreditLines: builder.query<CreditLine[], any>({
      query: () => ({
        url: `${base_url}/credit-line-application`,
        method: "GET",
      }),
      providesTags: ["CreditLine"],
    }),
    getCreditLine: builder.query<CreditLine, any>({
      query: (creditLineId: string) => ({
        url: `${base_url}/credit-line-application/${creditLineId}`,
        method: "GET",
      }),
      providesTags: ["CreditLine"],
    }),
    updateCreditLineApplicationStatus: builder.mutation({
      query: (updateBody: {
        applicationId: string;
        status: StatusTypeEnum;
        approvedAmount: number;
      }) => ({
        url: `${base_url}/credit-line-application/update/${updateBody.applicationId}?type=status-and-amount`,
        method: "PATCH",
        data: updateBody,
      }),
      invalidatesTags: ["CreditLine"],
    }),
  }),
});

export const {
  useGetAllCreditLinesQuery,
  useGetCreditLineQuery,
  useUpdateCreditLineApplicationStatusMutation,
} = creditLineApi;
