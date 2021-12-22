import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { InputAutocomplete } from "../../../components/InputAutocomplete";
import { getClientsByQuery } from "../../../services/api.tiendaropita.clientes";
import { getNegociosByQuery } from "../../../services/api.tiendaropita.negocios";
import { useAddVentaEfectivoMutation } from "../../../services/api.tiendaropita.ventas";

export const NewVentaEfectivo = () => {
  const [clienteInputValue, setClienteInputValue] = useState<any>("");
  const [negocioInputValue, setNegocioInputValue] = useState<any>("");
  const [addVentaEfectivo, { isLoading }] = useAddVentaEfectivoMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await addVentaEfectivo({
        clienteId: clienteInputValue.value,
        sucursalId: negocioInputValue.value,
      })
        .unwrap()
        .then(() => {
          setClienteInputValue("");
          setNegocioInputValue("");
          toast({
            title: "Item agregado",
            description: "La venta efectivo ha sido agregada correctamente",
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
        description: "Hubo un error al agregar la venta efectivo",
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

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton
          aria-label="Go back"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate("/ventas")}
        />
        <Text fontSize="xl" fontWeight={600}>
          Agregar Venta Efectivo
        </Text>
      </Stack>
      <Stack
        alignItems="center"
        as="form"
        direction="column"
        h="300px"
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
