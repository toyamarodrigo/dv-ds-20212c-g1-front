import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ItemBody, Venta, VentaPageable } from "../model/venta";

import { VentaBody } from "./../model/venta";

// Define a service using a base URL and expected endpoints
export const ventasApi = createApi({
  reducerPath: "ventasApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_BASE_URL_API}` }),
  endpoints: (builder) => ({
    getVentasPageable: builder.query<VentaPageable, void>({
      query: () => `/ventas`,
    }),
    getVentas: builder.query<Venta[], void>({
      query: () => `/ventas/all`,
    }),
    getVenta: builder.query<Venta, string>({
      query: (id) => `/ventas/${id}`,
    }),
    addVentaEfectivo: builder.mutation<VentaBody, Partial<VentaBody>>({
      query(body) {
        return {
          url: `/ventas/efectivo`,
          method: "POST",
          body: {
            clienteId: body.clienteId,
            sucursalId: body.sucursalId,
          },
        };
      },
    }),
    addVentaTarjeta: builder.mutation<VentaBody, Partial<VentaBody>>({
      query(body) {
        return {
          url: `/ventas/tarjeta`,
          method: "POST",
          body: {
            clienteId: body.clienteId,
            sucursalId: body.sucursalId,
            cantidadCuotas: body.cantidadCuotas,
          },
        };
      },
    }),
    addItemToVenta: builder.mutation<Venta, Partial<ItemBody>>({
      query(body) {
        return {
          url: `/ventas/${body.ventaId}/items`,
          method: "POST",
          body: {
            cantidad: body.cantidad,
            prendaId: body.prendaId,
          },
        };
      },
    }),
    updateItemOfVenta: builder.mutation<Venta, Partial<ItemBody>>({
      query(body) {
        return {
          url: `/ventas/${body.ventaId}/items/${body.itemId}`,
          method: "PUT",
          body: {
            cantidad: body.cantidad,
          },
        };
      },
    }),
    deleteItemFromVenta: builder.mutation<Venta, void>({
      query(id) {
        return {
          url: `/ventas/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetVentasPageableQuery,
  useGetVentasQuery,
  useGetVentaQuery,
  useAddVentaEfectivoMutation,
  useAddVentaTarjetaMutation,
  useAddItemToVentaMutation,
  useUpdateItemOfVentaMutation,
  useDeleteItemFromVentaMutation,
} = ventasApi;
