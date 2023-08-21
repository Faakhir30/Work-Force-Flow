import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookie from "js-cookie";
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
    photoApi: builder.mutation({
      query: (uid) => ({
        url: `photo/${uid}`,
      }),
    }),
    profieApi: builder.query({
      query: () => ({ url: "profile" }),
    }),
    allusersApi: builder.query({
      query: () => ({ url: "all" }),
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

export const {
  useProfieApiQuery,
  useLoginApiMutation,
  useLogoutApiMutation,
  useRegisterApiMutation,
  useAllusersApiQuery,
  usePhotoApiMutation
} = userApi;
