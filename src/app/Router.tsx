import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Negocios } from "../pages";
import { Clientes } from "../pages/Clientes";
import { EditCliente } from "../pages/Clientes/EditCliente/EditCliente";
import { NewCliente } from "../pages/Clientes/NewCliente/NewCliente";
import { EditSucursal } from "../pages/Negocios/EditSucursal/EditSucursal";
import { NewSucursal } from "../pages/Negocios/NewSucursal/NewSucursal";
import { Prendas } from "../pages/Prendas";
import { EditPrenda } from "../pages/Prendas/EditPrenda/EditPrenda";
import { NewPrenda } from "../pages/Prendas/NewPrenda/NewPrenda";
import { Ventas } from "../pages/Ventas";
import { AddItem } from "../pages/Ventas/AddItem/AddItem";
import { EditItem } from "../pages/Ventas/EditItem/EditItem";
import { NewVentaEfectivo } from "../pages/Ventas/NewVentaEfectivo/NewVentaEfectivo";
import { NewVentaTarjeta } from "../pages/Ventas/NewVentaTarjeta/NewVentaTarjeta";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Negocios />} path="/negocios" />
        <Route element={<NewSucursal />} path="/negocios/new" />
        <Route element={<EditSucursal />} path="/negocios/edit" />
        <Route element={<Ventas />} path="/ventas" />
        <Route element={<NewVentaEfectivo />} path="/ventas/efectivo/new" />
        <Route element={<NewVentaTarjeta />} path="/ventas/tarjeta/new" />
        <Route element={<AddItem />} path="/ventas/:ventaId/item/new" />
        <Route element={<EditItem />} path="/ventas/:ventaId/item/:itemId/edit" />
        <Route element={<Clientes />} path="/clientes" />
        <Route element={<NewCliente />} path="/clientes/new" />
        <Route element={<EditCliente />} path="/clientes/edit" />
        <Route element={<Prendas />} path="/prendas" />
        <Route element={<NewPrenda />} path="/prendas/new" />
        <Route element={<EditPrenda />} path="/prendas/edit" />
        <Route element={<Prendas />} path="/prendas" />
      </Routes>
    </BrowserRouter>
  );
};
