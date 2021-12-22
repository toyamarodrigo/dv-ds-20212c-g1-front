import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { useAddVentaTarjetaMutation } from "../../../services/api.tiendaropita.ventas";
import { getClientsByQuery } from "../../../services/api.tiendaropita.clientes";
import { InputAutocomplete } from "../../../components/InputAutocomplete";
import { getNegociosByQuery } from "../../../services/api.tiendaropita.negocios";

export const NewVentaTarjeta = () => {
  const [clienteInputValue, setClienteInputValue] = useState<any>("");
  const [negocioInputValue, setNegocioInputValue] = useState<any>("");
  const initialCantCuotasValue = { cantidadCuotas: "1" };
  const [cantCuotas, setCantCuotas] = useState(initialCantCuotasValue);
  const [addVentaTarjeta, { isLoading }] = useAddVentaTarjetaMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await addVentaTarjeta({
        clienteId: clienteInputValue.value,
        sucursalId: negocioInputValue.value,
        cantidadCuotas: cantCuotas.cantidadCuotas,
      })
        .unwrap()
        .then(() => {
          setClienteInputValue("");
          setNegocioInputValue("");
          toast({
            title: "Venta tarjeta agregada",
            description: "La venta tarjeta ha sido agregada correctamente",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          navigate("/ventas");
        });
    } catch {
      toast({
        title: "Error",
        description: "Hubo un error al agregar la venta tarjeta",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleClienteChange = (selectedOption) => {
    setClienteInputValue(selectedOption);
  };

  const handleNegocioChange = (selectedOption) => {
    setNegocioInputValue(selectedOption);
  };

  const handleCantidadCuotas = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantCuotas({ ...cantCuotas, [e.target.name]: e.target.value });
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton
          aria-label="Go back"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate("/ventas")}
        />
        <Text fontSize="xl" fontWeight={600}>
          Agregar Venta Tarjeta
        </Text>
      </Stack>
      <Stack
        alignItems="center"
        as="form"
        direction="column"
        h="450px"
        justifyContent="center"
        px={4}
        py={8}
        shadow="xl"
        spacing={10}
        w="600px"
      >
        <Stack spacing={4} w="60%">
          <FormControl>
            <FormLabel fontWeight={600}>Cliente</FormLabel>
            <InputAutocomplete
              api={getClientsByQuery}
              handleChange={handleClienteChange}
              inputValue={clienteInputValue}
              name="cliente"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Sucursal</FormLabel>
            <InputAutocomplete
              api={getNegociosByQuery}
              handleChange={handleNegocioChange}
              inputValue={negocioInputValue}
              name="negocio"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Cantidad de cuotas</FormLabel>
            <Input
              name="cantidadCuotas"
              placeholder="4..."
              type="number"
              onChange={handleCantidadCuotas}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" spacing={4} w="60%">
          <Button
            colorScheme="whatsapp"
            isLoading={isLoading}
            leftIcon={<AddIcon />}
            onClick={() => handleSubmit()}
          >
            Agregar
          </Button>
          <Button variant="filled" onClick={() => navigate("/ventas")}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
