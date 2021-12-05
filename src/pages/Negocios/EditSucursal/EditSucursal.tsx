import React from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useLocation, useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

import { BasicLayout } from "../../../layout";

export const EditSucursal = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = () => {
    console.log("HandleSUbmit");
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
        <Text fontSize="xl" fontWeight={600}>
          Modificar Negocio
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
            <FormLabel fontWeight={600}>ID Sucursal: {state.negocio.id}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Nombre nuevo de Sucursal</FormLabel>
            <Input placeholder={state.negocio.sucursal} />
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" spacing={4} w="60%">
          <Button colorScheme="whatsapp" leftIcon={<EditIcon />} onClick={() => handleSubmit()}>
            Modificar
          </Button>
          <Button variant="filled" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
