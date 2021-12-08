import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import { useLocation, useNavigate } from "react-router";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../../layout";
import { TiposPrenda } from "../utils";
import { useUpdatePrendaMutation } from "../../../services/api.tiendaropita.prendas";

export const EditPrenda = () => {
  const initialValue = { descripcion: "", tipo: "", precioBase: "" };
  const [prenda, setPrenda] = useState(initialValue);
  const navigate = useNavigate();
  const [updatePrenda] = useUpdatePrendaMutation();
  const { state } = useLocation();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await updatePrenda(prenda)
        .unwrap()
        .then(() => {
          setPrenda(initialValue);
          toast({
            title: "Prenda modificada",
            description: "La prenda ha sido modificada correctamente",
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
        description: "Hubo un error al modificar la prenda",
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

  useEffect(() => {
    setPrenda({ ...state.prenda });
  }, [state]);

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="100%">
        <IconButton
          aria-label="Go back"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate("/prendas")}
        />
        <Text fontSize="xl" fontWeight={600}>
          Modificar Prenda
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
            <FormLabel fontWeight={600}>ID Prenda: {state.prenda.id}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Nombre nuevo de Prenda</FormLabel>
            <Input
              isRequired
              name="descripcion"
              placeholder={state.prenda.descripcion}
              value={prenda.descripcion}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Precio nuevo de Prenda</FormLabel>
            <Input
              isRequired
              name="precioBase"
              placeholder={state.prenda.precioBase}
              value={prenda.precioBase}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={600}>Tipo nuevo de Prenda</FormLabel>
            <Select
              isRequired
              name="tipo"
              placeholder="Seleccionar tipo de prenda"
              type="text"
              value={prenda.tipo}
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
          <Button colorScheme="whatsapp" leftIcon={<EditIcon />} onClick={() => handleSubmit()}>
            Modificar
          </Button>
          <Button variant="filled" onClick={() => navigate("/prendas")}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </BasicLayout>
  );
};
