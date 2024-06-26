import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookie from "js-cookie";
export const ticketApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/tickets/`,
    prepareHeaders: (headers, { getState }) => {
      // Get the JWT token from cookies
      const token = cookie.get("jwt");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "ticketApi",
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    allTickets: builder.mutation({
      query: () => ({
        url: "/all",
      }),
    }),
    updateTicket: builder.mutation({
      query:({tid,status}) =>({
        url:`/${tid}`,
        method:"PUT",
        body:{status}
      })
    })
  }),
});

export const { useCreateTicketMutation, useAllTicketsMutation, useUpdateTicketMutation } = ticketApi;
