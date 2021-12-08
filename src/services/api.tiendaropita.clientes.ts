import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

import { Cliente, ClientePageable } from "../model/cliente";

// Define a service using a base URL and expected endpoints
export const clientesApi = createApi({
  reducerPath: "clientesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_BASE_URL_API}` }),
  endpoints: (builder) => ({
    getClientesPageable: builder.query<ClientePageable, void>({
      query: () => `/clientes`,
    }),
    getClientes: builder.query<Cliente[], void>({
      query: () => `/clientes/all`,
    }),
    getCliente: builder.query<Cliente, string>({
      query: (id) => `/clientes/${id}`,
    }),
    addCliente: builder.mutation<Cliente, Partial<Cliente>>({
      query(body) {
        return {
          url: `/clientes`,
          method: "POST",
          body: {
            nombre: body.nombre,
            apellido: body.apellido,
          },
        };
      },
    }),
    updateCliente: builder.mutation<Cliente, Partial<Cliente>>({
      query(body) {
        return {
          url: `/clientes/${body.id}`,
          method: "PUT",
          body: {
            nombre: body.nombre,
            apellido: body.apellido,
          },
        };
      },
    }),
    deleteCliente: builder.mutation<Cliente, void>({
      query(id) {
        return {
          url: `/clientes/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const getClientsByQuery = async ({ query }: any): Promise<Cliente[]> => {
  return await axios
    .get(`${import.meta.env.VITE_APP_BASE_URL_API}/clientes/all`)
    .then((response) => {
      const clientes = response.data
        .filter((cliente) => {
          return cliente.razonSocial.toLowerCase().includes(query.toLowerCase());
        })
        .map((cliente: any) => {
          return {
            value: cliente.id,
            label: cliente.razonSocial,
          };
        })
        .slice(0, 4);

      return clientes;
    });
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetClientesPageableQuery,
  useGetClientesQuery,
  useGetClienteQuery,
  useAddClienteMutation,
  useUpdateClienteMutation,
  useDeleteClienteMutation,
} = clientesApi;
