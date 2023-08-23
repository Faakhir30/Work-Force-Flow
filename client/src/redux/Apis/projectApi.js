import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookie from "js-cookie";
export const projectApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/projects/`,
    prepareHeaders: (headers, { getState }) => {
      // Get the JWT token from cookies
      const token = cookie.get("jwt");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "projectApi",
  tagTypes: ["Prjects"],
  endpoints: (builder) => ({
    allProjects: builder.query({
      query: () => ({ url: "/all" }),
    }),
    singleProject: builder.mutation({
      query: (pid) => ({ url: "/project/" + pid }),
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAllProjectsQuery, useCreateProjectMutation, useSingleProjectMutation } = projectApi;
