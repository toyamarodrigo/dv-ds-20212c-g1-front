import React from "react";
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

import { BasicLayout } from "../../../layout";

export const EditItem = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { ventaId, itemId } = useParams();

  console.log("state :>> ", state);
  console.log("ventaId :>> ", ventaId);
  console.log("itemId :>> ", itemId);

  const handleSubmit = () => {
    console.log("HandleSUbmit");
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
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>ID Item: {itemId}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Cantidad</FormLabel>
            <NumberInput defaultValue={1} max={10} min={1}>
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
