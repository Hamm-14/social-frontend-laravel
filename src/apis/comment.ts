import { projectApi } from "./query";

const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;

export const commentApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    likeComment: builder.mutation({
        query: (commentData: any) => ({
          url: `${base_url}/comment/like/toggle`,
          method: "POST",
          data: commentData
        }),
        invalidatesTags: ["Comment", "Post"],
      }),
      createComment: builder.mutation({
        query: (commentData: any) => ({
          url: `${base_url}/comment`,
          method: "POST",
          data: commentData
        }),
        invalidatesTags: ["Comment", "Post"],
      }),
  }),
});

export const { useLikeCommentMutation, useCreateCommentMutation } = commentApi;
