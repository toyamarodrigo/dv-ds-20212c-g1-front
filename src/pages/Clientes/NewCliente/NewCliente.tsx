import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { useAddClienteMutation } from "../../../services/api.tiendaropita.clientes";

export const NewCliente = () => {
  const [addCliente] = useAddClienteMutation();
  const initialValue = { nombre: "", apellido: "" };
  const [cliente, setCliente] = useState(initialValue);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await addCliente(cliente)
        .unwrap()
        .then(() => {
          setCliente(initialValue);
          toast({
            title: "Cliente agregado",
            description: "El cliente ha sido agregada correctamente",
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
        description: "Hubo un error al crear el cliente",
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
        <IconButton
          aria-label="Go back"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate("/clientes")}
        />
        <Text fontSize="xl" fontWeight={600}>
          Agregar Cliente
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
            <FormLabel fontWeight={600}>Nombre de cliente</FormLabel>
            <Input isRequired name="nombre" placeholder="Jose..." onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Apellido de cliente</FormLabel>
            <Input isRequired name="apellido" placeholder="Maria..." onChange={handleInputChange} />
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" spacing={4} w="60%">
          <Button colorScheme="whatsapp" leftIcon={<AddIcon />} onClick={() => handleSubmit()}>
            Agregar
          </Button>
          <Button variant="filled" onClick={() => navigate("/clientes")}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
