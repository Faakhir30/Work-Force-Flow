import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/users/",
  }),
  reducerPath: "api",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerApi: builder.query({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      providesTags: ["Auth"],
    }),
    loginApi: builder.query({
      query: (body) => ({
        url: "auth",
        method: "POST",
        body,
      }),
      providesTags: ["Auth"],
    }),
    logoutApi: builder.query({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginApiQuery,useRegisterApiQuery,useLogoutApiQuery } = userApi;