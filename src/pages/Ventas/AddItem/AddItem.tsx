import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useLocation, useNavigate, useParams } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { InputAutocomplete } from "../../../components/InputAutocomplete";
import { getPrendasByQuery } from "../../../services/api.tiendaropita.prendas";
import { useAddItemToVentaMutation } from "../../../services/api.tiendaropita.ventas";

export const AddItem = () => {
  const initialCantCuotasValue = { cantidad: "1" };
  const [cantCuotas, setCantCuotas] = useState(initialCantCuotasValue);
  const [prendaInputValue, setPrendaInputValue] = useState({ value: "", label: "" });
  const [addItemToVenta] = useAddItemToVentaMutation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { ventaId } = useParams();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await addItemToVenta({
        ventaId: ventaId,
        prendaId: prendaInputValue.value,
        cantidad: cantCuotas.cantidad,
      })
        .unwrap()
        .then(() => {
          setCantCuotas(initialCantCuotasValue);
          toast({
            title: "Item agregado",
            description: "El item ha sido agregado correctamente",
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
        description: "Hubo un error al agregar el item",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handlePrendaChange = (selectedOption) => {
    setPrendaInputValue(selectedOption);
  };

  const handleCantCuotasChange = (e: string) => {
    setCantCuotas({ ...cantCuotas, cantidad: e });
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
          Agregar Item a Venta
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
            <FormLabel fontWeight={600}>ID Venta: {ventaId}</FormLabel>
            <FormLabel fontWeight={600}>Negocio: {state.venta.negocio.sucursal}</FormLabel>
            <FormLabel fontWeight={600}>Venta de cliente: {state.venta.razonSocial}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Prenda</FormLabel>
            <InputAutocomplete
              api={getPrendasByQuery}
              handleChange={handlePrendaChange}
              inputValue={prendaInputValue}
              name="descripcion"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Cantidad</FormLabel>
            <NumberInput
              defaultValue={1}
              max={10}
              min={1}
              name="cantidad"
              onChange={handleCantCuotasChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" spacing={4} w="60%">
          <Button colorScheme="whatsapp" leftIcon={<AddIcon />} onClick={() => handleSubmit()}>
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
