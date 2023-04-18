import { projectApi } from "./query";
import { VehicleFiles } from "../types/documents";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const documentsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicleDocuments: builder.query<VehicleFiles[], any>({
      query: (vehicleId: string) => ({
        url: `${base_url}/file/vehicle-files/${vehicleId}`,
        method: "GET",
      }),
      providesTags: ["File"],
    }),
  }),
});

export const { useGetVehicleDocumentsQuery } = documentsApi;
