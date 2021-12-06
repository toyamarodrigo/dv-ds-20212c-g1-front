import React from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

import { BasicLayout } from "../../../layout";

export const NewVentaTarjeta = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("HandleSUbmit");
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
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
            <FormLabel fontWeight={600}>ID Cliente</FormLabel>
            <Input placeholder="Jose..." type="text" />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>ID Sucursal</FormLabel>
            <Input placeholder="Maria..." type="text" />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Cantidad de cuotas</FormLabel>
            <Input placeholder="4..." type="number" />
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" spacing={4} w="60%">
          <Button colorScheme="whatsapp" leftIcon={<AddIcon />} onClick={() => handleSubmit()}>
            Agregar
          </Button>
          <Button variant="filled" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
