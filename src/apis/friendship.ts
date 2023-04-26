import { projectApi } from "./query";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const friendshipApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    allFollowers: builder.mutation({
      query: (userData: any) => ({
        url: `${base_url}/followers`,
        method: "POST",
        data: userData
      }),
      invalidatesTags: ["Friendship"],
    }),
    allFollowings: builder.mutation({
      query: (userData: any) => ({
        url: `${base_url}/followings`,
        method: "POST",
        data: userData
      }),
      invalidatesTags: ["Friendship"],
    }),
    follow: builder.mutation({
        query: (userData: any) => ({
          url: `${base_url}/follow`,
          method: "POST",
          data: userData
        }),
        invalidatesTags: ["Friendship"],
      }),
      unFollow: builder.mutation({
        query: (userData: any) => ({
          url: `${base_url}/unfollow`,
          method: "POST",
          data: userData
        }),
        invalidatesTags: ["Friendship"],
      }),
  }),
});

export const {
    useAllFollowersMutation,
    useAllFollowingsMutation,
    useFollowMutation,
    useUnFollowMutation
} = friendshipApi;
