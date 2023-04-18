import { projectApi } from "./query";
import { FormStepEnum, GetFloorPlan, CreateLoanTermsData, UpdateFloorPlan } from "../types/floorPlan";
import { StatusTypeEnum } from "../types/creditLine";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const floorPlanApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFloorPlans: builder.query<GetFloorPlan[], any>({
      query: () => ({
        url: `${base_url}/floor-plan-request`,
        method: "GET",
      }),
      providesTags: ["FloorPlan"],
    }),
    updateFloorPlanRequestStatus: builder.mutation({
      query: (updateBody: { floorPlanId: string; status: StatusTypeEnum }) => ({
        url: `${base_url}/floor-plan-request/${updateBody.floorPlanId}?status=${updateBody.status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["FloorPlan"],
    }),
    getFloorPlanDetails: builder.query<GetFloorPlan, any>({
      query: (floorPlanId: string) => ({
        url: `${base_url}/floor-plan-request/${floorPlanId}`,
        method: "GET",
      }),
      providesTags: ["FloorPlan"],
    }),
    updateFloorPlanRequest: builder.mutation({
      query: (updateParams: { updateFloorPlanData: UpdateFloorPlan; step: FormStepEnum }) => ({
        url: `${base_url}/floor-plan-request?step=${updateParams.step}`,
        method: "PATCH",
        data: updateParams.updateFloorPlanData,
      }),
      invalidatesTags: ["FloorPlan"],
    }),
    createLoanTermsForApprovingCreditLine: builder.mutation({
      query: (addBody:{floorPlanId: string, loanTermsData: CreateLoanTermsData}) => ({
        url: `${base_url}/loan-terms?floorPlanId=${addBody.floorPlanId}`,
        method: "POST",
        data: addBody.loanTermsData,
      }),
      
    }),
  }),
});

export const {
  useGetAllFloorPlansQuery,
  useUpdateFloorPlanRequestStatusMutation,
  useGetFloorPlanDetailsQuery,
  useUpdateFloorPlanRequestMutation,
  useCreateLoanTermsForApprovingCreditLineMutation,
} = floorPlanApi;
