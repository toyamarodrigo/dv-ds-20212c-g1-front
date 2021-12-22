import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useLocation, useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { useUpdateNegocioMutation } from "../../../services/api.tiendaropita.negocios";

export const EditSucursal = () => {
  const [updateNegocio] = useUpdateNegocioMutation();
  const initialValue = { sucursal: "" };
  const [sucursal, setSucursal] = useState(initialValue);
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();

  const isError = sucursal.sucursal === "";

  const handleSubmit = async () => {
    try {
      if (!isError) {
        await updateNegocio({ id: state.negocio.id, sucursal: sucursal.sucursal })
          .unwrap()
          .then(() => {
            setSucursal(initialValue);
            toast({
              title: "Sucursal modificada",
              description: "La sucursal ha sido modificada correctamente",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            navigate("/negocios");
          });
      } else {
        toast({
          title: "Error",
          description: "Por favor, complete todos los campos",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Hubo un error al modificar la sucursal",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSucursal((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton
          aria-label="Go back"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate("/negocios")}
        />
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
          <FormControl isRequired isInvalid={isError}>
            <FormLabel fontWeight={600}>Nombre nuevo de Sucursal</FormLabel>
            <Input
              name="sucursal"
              placeholder={state.negocio.sucursal}
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" spacing={4} w="60%">
          <Button colorScheme="whatsapp" leftIcon={<EditIcon />} onClick={() => handleSubmit()}>
            Modificar
          </Button>
          <Button variant="filled" onClick={() => navigate("/negocios")}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
