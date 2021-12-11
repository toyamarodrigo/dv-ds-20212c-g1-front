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
import { useUpdateItemOfVentaMutation } from "../../../services/api.tiendaropita.ventas";

export const EditItem = () => {
  const initialCantItemsValue = { cantidad: "" };
  const [cantItems, setCantItems] = useState(initialCantItemsValue);
  const [updateItemOfVenta] = useUpdateItemOfVentaMutation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { ventaId, itemId } = useParams();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await updateItemOfVenta({
        ventaId: ventaId,
        itemId: itemId,
        cantidad: cantItems.cantidad,
      })
        .unwrap()
        .then(() => {
          setCantItems(initialCantItemsValue);
          toast({
            title: "Item Modificado",
            description: "El item ha sido modificado correctamente",
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
        description: "Hubo un error al modificar el item",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCantItemsChange = (e) => {
    setCantItems({ cantidad: e });
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
          Modificar Item de Venta
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
            <FormLabel fontWeight={600}>Venta de cliente: {state.venta.razonSocial}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>ID Item: {itemId}</FormLabel>
            <FormLabel fontWeight={600}>Prenda: {state.item.prenda.descripcion}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Cantidad</FormLabel>
            <NumberInput
              defaultValue={state.item.cantidad || 1}
              max={10}
              min={1}
              name="cantidad"
              onChange={handleCantItemsChange}
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
            Modificar
          </Button>
          <Button variant="filled" onClick={() => navigate("/ventas")}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
