import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

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
    getNegocioVentasByFecha: builder.query<Negocio[], { id: string; fecha: string }>({
      query: (sucursal) => `/negocio/${sucursal.id}/total?fecha=${sucursal.fecha}`,
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

export const getNegociosByQuery = async ({ query }: any): Promise<Negocio[]> => {
  return await axios
    .get(`${import.meta.env.VITE_APP_BASE_URL_API}/negocio/all`)
    .then((response) => {
      const negocios = response.data
        .filter((negocio) => {
          return negocio.sucursal.toLowerCase().includes(query.toLowerCase());
        })
        .map((negocio: any) => {
          return {
            value: negocio.id,
            label: negocio.sucursal,
          };
        })
        .slice(0, 4);

      return negocios;
    });
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetNegociosPageableQuery,
  useGetNegociosQuery,
  useGetNegocioQuery,
  useGetNegocioVentasByFechaQuery,
  useAddNegocioMutation,
  useUpdateNegocioMutation,
} = negociosApi;
