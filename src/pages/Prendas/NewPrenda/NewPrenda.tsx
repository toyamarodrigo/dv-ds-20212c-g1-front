import React from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";

import { BasicLayout } from "../../../layout";
import { TiposPrenda } from "../utils";

export const NewPrenda = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("HandleSUbmit");
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
        <Text fontSize="xl" fontWeight={600}>
          Agregar Prenda
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
            <FormLabel fontWeight={600}>Nombre</FormLabel>
            <Input isRequired placeholder="Remera Batman..." type="text" />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Precio</FormLabel>
            <Input isRequired placeholder="1699" type="number" />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Tipo</FormLabel>
            <Select isRequired type="number">
              {TiposPrenda.map((tipo, index) => (
                <option key={index} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </Select>
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
