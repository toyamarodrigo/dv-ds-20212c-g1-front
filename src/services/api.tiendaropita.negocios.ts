import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Negocio, NegocioPageable, Negocios } from "../model/negocio";

// Define a service using a base URL and expected endpoints
export const negociosApi = createApi({
  reducerPath: "negociosApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_BASE_URL_API}` }),
  endpoints: (builder) => ({
    getNegociosPageable: builder.query<NegocioPageable, void>({
      query: () => `/negocio`,
    }),
    getNegocios: builder.query<Negocios, void>({
      query: () => `/negocio/all`,
    }),
    getNegocio: builder.query<Negocio, string>({
      query: (id) => `/negocio/${id}`,
    }),
    addNegocio: builder.mutation<Negocio, Partial<Negocio>>({
      query(body) {
        return {
          url: `/negocio`,
          method: "POST",
          body,
        };
      },
    }),
    updateNegocio: builder.mutation<Negocio, Partial<Negocio>>({
      query(body) {
        return {
          url: `/negocio/${body.id}`,
          method: "PUT",
          body: {
            sucursal: body.sucursal,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetNegociosPageableQuery,
  useGetNegociosQuery,
  useGetNegocioQuery,
  useAddNegocioMutation,
  useUpdateNegocioMutation,
} = negociosApi;
