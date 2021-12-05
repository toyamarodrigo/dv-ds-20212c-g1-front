import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Negocios } from "../pages";
import { Clientes } from "../pages/Clientes";
import { EditCliente } from "../pages/Clientes/EditCliente/EditCliente";
import { NewCliente } from "../pages/Clientes/NewCliente/NewCliente";
import { EditSucursal } from "../pages/Negocios/EditSucursal/EditSucursal";
import { NewSucursal } from "../pages/Negocios/NewSucursal/NewSucursal";
import { Prendas } from "../pages/Prendas";
import { Ventas } from "../pages/Ventas";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Negocios />} path="/negocios" />
        <Route element={<NewSucursal />} path="/negocios/new" />
        <Route element={<EditSucursal />} path="/negocios/edit" />
        <Route element={<Ventas />} path="/ventas" />
        <Route element={<Clientes />} path="/clientes" />
        <Route element={<NewCliente />} path="/clientes/new" />
        <Route element={<EditCliente />} path="/clientes/edit" />
        <Route element={<Prendas />} path="/prendas" />
      </Routes>
    </BrowserRouter>
  );
};
