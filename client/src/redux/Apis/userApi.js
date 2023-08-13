import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookie from "js-cookie"
export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/users/`,
    prepareHeaders: (headers, { getState }) => {
      // Get the JWT token from cookies
      const token = cookie.get("jwt");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
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
    profieApi:builder.query({
      query:()=>({url:"profile", cookies:cookie.get('jwt')}),

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

export const {useProfieApiQuery, useLoginApiMutation, useLogoutApiMutation, useRegisterApiMutation } =
  userApi;
