import { projectApi } from "./query";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const postApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<any,any>({
      query: () => ({
        url: `${base_url}/post/all`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    likePost: builder.mutation({
        query: (likeData: any) => ({
          url: `${base_url}/post/like/toggle`,
          method: "POST",
          data: likeData
        }),
        invalidatesTags: ["Post"],
      }),
  }),
});

export const { useGetAllPostsQuery, useLikePostMutation } = postApi;
