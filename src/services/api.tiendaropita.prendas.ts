import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Prenda, PrendaPageable } from "../model/prenda";

// Define a service using a base URL and expected endpoints
export const prendasApi = createApi({
  reducerPath: "prendasApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_BASE_URL_API}` }),
  endpoints: (builder) => ({
    getPrendasPageable: builder.query<PrendaPageable, void>({
      query: () => `/prendas`,
    }),
    getPrendas: builder.query<Prenda[], void>({
      query: () => `/prendas/all`,
    }),
    getPrenda: builder.query<Prenda, string>({
      query: (id) => `/prendas/${id}`,
    }),
    addPrenda: builder.mutation<Prenda, Partial<Prenda>>({
      query(body) {
        return {
          url: `/prendas`,
          method: "POST",
          body: {
            descripcion: body.descripcion,
            tipo: body.tipo,
            precioBase: body.precioBase,
          },
        };
      },
    }),
    updatePrenda: builder.mutation<Prenda, Partial<Prenda>>({
      query(body) {
        return {
          url: `/prendas/${body.id}`,
          method: "PUT",
          body: {
            descripcion: body.descripcion,
            precioBase: body.precioBase,
            tipo: body.tipo,
          },
        };
      },
    }),
    deletePrenda: builder.mutation<Prenda, void>({
      query(id) {
        return {
          url: `/prendas/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPrendasPageableQuery,
  useGetPrendasQuery,
  useGetPrendaQuery,
  useAddPrendaMutation,
  useUpdatePrendaMutation,
  useDeletePrendaMutation,
} = prendasApi;
