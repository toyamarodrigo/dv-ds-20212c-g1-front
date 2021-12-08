import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useLocation, useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { useUpdateClienteMutation } from "../../../services/api.tiendaropita.clientes";

export const EditCliente = () => {
  const [updateCliente] = useUpdateClienteMutation();
  const initialValue = { nombre: "", apellido: "" };
  const [cliente, setCliente] = useState(initialValue);
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useLocation();

  const handleSubmit = async () => {
    try {
      await updateCliente({
        id: state.cliente.id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
      })
        .unwrap()
        .then(() => {
          setCliente(initialValue);
          toast({
            title: "Cliente modificado",
            description: "El cliente ha sido modificado correctamente",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          navigate("/clientes");
        });
    } catch {
      toast({
        title: "Error",
        description: "Hubo un error al modificar el cliente",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCliente((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
        <Text fontSize="xl" fontWeight={600}>
          Modificar Cliente
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
            <FormLabel fontWeight={600}>ID Cliente: {state.cliente.id}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Nombre nuevo de Cliente</FormLabel>
            <Input name="nombre" placeholder={state.cliente.nombre} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Apellido nuevo de Cliente</FormLabel>
            <Input
              name="apellido"
              placeholder={state.cliente.apellido}
              onChange={handleInputChange}
            />
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
