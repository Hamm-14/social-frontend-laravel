import type { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn, retry } from "@reduxjs/toolkit/query";
import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";

const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
  },
  unknown,
  unknown
> = async (args, api) => {
  const token = localStorage.getItem("token");
  try {
    const result = await axios({
      url: args.url,
      method: args.method,
      data: args.data,
      params: args.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    console.log(err.message);
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
// Define a service using a base URL and expected endpoints
export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: retry(axiosBaseQuery),
  tagTypes: ["User", "Post", "Comment"],
  endpoints: (builder) => ({}),
});
