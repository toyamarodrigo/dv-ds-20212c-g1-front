import React, { useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { TiposPrenda } from "../utils";
import { useAddPrendaMutation } from "../../../services/api.tiendaropita.prendas";

export const NewPrenda = () => {
  const initialValue = { descripcion: "", tipo: "", precioBase: "" };
  const [prenda, setPrenda] = useState(initialValue);
  const navigate = useNavigate();
  const [addPrenda] = useAddPrendaMutation();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await addPrenda(prenda)
        .unwrap()
        .then(() => {
          setPrenda(initialValue);
          toast({
            title: "Prenda agregada",
            description: "La prenda ha sido agregada correctamente",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          navigate("/prendas");
        });
    } catch {
      toast({
        title: "Error",
        description: "Hubo un error al crear la prenda",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrenda({ ...prenda, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrenda({ ...prenda, [e.target.name]: e.target.value });
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton
          aria-label="Go back"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate("/prendas")}
        />
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
            <Input
              isRequired
              name="descripcion"
              placeholder="Remera Batman..."
              type="text"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Precio</FormLabel>
            <Input
              isRequired
              name="precioBase"
              placeholder="1699"
              type="number"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Tipo</FormLabel>
            <Select
              isRequired
              name="tipo"
              placeholder="Seleccionar tipo de prenda"
              type="text"
              onChange={handleSelectChange}
            >
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
          <Button variant="filled" onClick={() => navigate("/prendas")}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
