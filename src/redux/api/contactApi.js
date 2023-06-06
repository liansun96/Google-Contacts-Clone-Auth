import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: ({token,num}) => ({
        url: `/contact?page=${num}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    getSingleContact: builder.query({
      query: ({ id, token }) => ({
        url: `contact/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ token, contact }) => ({
        url: "/contact",
        method: "POST",
        body: contact,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({token , newContact})=>({
        url : `/contact/${newContact.id}`,
        method : 'PATCH',
        body : newContact,
        headers : { authorization : `Bearer ${token}`},
      }),
      invalidatesTags:['contact']
    }),
    deleteContact: builder.mutation({
      query: ({ id,token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        body: id,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useGetSingleContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
