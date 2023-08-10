import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/users/`,
  }),
  reducerPath: "api",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerApi: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      providesTags: ["register"],
    }),
    loginApi: builder.mutation({
      query: (body) => ({
        url: "auth",
        method: "POST",
        body,
      }),
      providesTags: ["Auth"],
    }),
    logoutApi: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      providesTags: ["logout"],
    }),
  }),
});

export const { useLoginApiMutation, useLogoutApiMutation, useRegisterApiMutation } =
  userApi;
