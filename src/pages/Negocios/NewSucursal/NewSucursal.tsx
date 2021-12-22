import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { useAddNegocioMutation } from "../../../services/api.tiendaropita.negocios";

export const NewSucursal = () => {
  const navigate = useNavigate();
  const [addNegocio] = useAddNegocioMutation();
  const initialValue = { sucursal: "" };
  const [sucursal, setSucursal] = useState(initialValue);
  const toast = useToast();

  const isError = sucursal.sucursal === "";

  const handleSubmit = async () => {
    try {
      if (!isError) {
        await addNegocio(sucursal)
          .unwrap()
          .then(() => {
            setSucursal(initialValue);
            toast({
              title: "Sucursal agregada",
              description: "La sucursal ha sido agregada correctamente",
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
        description: "Hubo un error al crear la sucursal",
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
          Agregar Sucursal
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
        <Stack as="form" spacing={4} w="60%">
          <FormControl isRequired isInvalid={isError}>
            <FormLabel fontWeight={600} htmlFor="sucursal">
              Nombre de Sucursal
            </FormLabel>
            <Input
              isRequired 
              id="sucursal"
              name="sucursal"
              placeholder="Carrefour..."
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" spacing={4} w="60%">
          <Button colorScheme="whatsapp" leftIcon={<AddIcon />} onClick={() => handleSubmit()}>
            Agregar
          </Button>
          <Button variant="filled" onClick={() => navigate("/negocios")}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
