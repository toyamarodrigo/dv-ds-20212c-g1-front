import React, { useState } from "react";
import { Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { FaTrashAlt } from "react-icons/fa";
import { ResponsiveValue } from "@chakra-ui/styled-system";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";

import { BasicLayout } from "../../layout";
import { useGetClientesQuery } from "../../services/api.tiendaropita.clientes";
import { Cliente } from "../../model/cliente";

export const Clientes = () => {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const { data, isLoading, isSuccess } = useGetClientesQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const cancelRef = React.useRef();

  const handleDelete = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    onOpen();
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="800px">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
        <Text fontSize="xl" fontWeight={600}>
          Clientes
        </Text>
      </Stack>
      <Stack direction="column" w="800px">
        <Stack direction="row">
          <Button
            colorScheme="whatsapp"
            leftIcon={<AddIcon />}
            onClick={() => navigate("/clientes/new")}
          >
            Agregar Cliente
          </Button>
        </Stack>
        <Stack>
          {isSuccess && (
            <Grid
              borderRadius="6px"
              borderWidth="2px"
              mt={4}
              pb={4}
              templateColumns="repeat(4, 1fr)"
            >
              <TableHeaderText pl={8}>ID</TableHeaderText>
              <TableHeaderText>NOMBRE</TableHeaderText>
              <TableHeaderText>APELLIDO</TableHeaderText>
              <TableHeaderText textAlign="center">ACCION</TableHeaderText>

              {data.map((cliente) => (
                <React.Fragment key={cliente.id}>
                  <GridItem pt={4}>
                    <Text pl={8} textAlign="left">
                      {cliente.id}
                    </Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{cliente.nombre}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{cliente.apellido}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <IconButton
                      aria-label="Edit Negocio"
                      colorScheme="yellow"
                      icon={<EditIcon />}
                      mr={2}
                      onClick={() => navigate(`/clientes/edit`, { state: { cliente } })}
                    />
                    <IconButton
                      aria-label="Edit Negocio"
                      colorScheme="red"
                      icon={<FaTrashAlt />}
                      onClick={() => handleDelete(cliente)}
                    />
                    <DeleteModal
                      cancelRef={cancelRef}
                      cliente={selectedCliente}
                      isOpen={isOpen}
                      onClose={onClose}
                    />
                  </GridItem>
                </React.Fragment>
              ))}
            </Grid>
          )}
        </Stack>
      </Stack>
    </BasicLayout>
  );
};

interface ITableText {
  textAlign?: ResponsiveValue<CanvasTextAlign>;
  pl?: number;
  children: React.ReactNode;
}

const TableHeaderText = ({ textAlign = "left", children, pl }: ITableText) => {
  return (
    <GridItem bgColor="gray.200" py={4}>
      <Text color="#4A556B" fontSize="12px" fontWeight={700} pl={pl} textAlign={textAlign}>
        {children}
      </Text>
    </GridItem>
  );
};

const DeleteModal = ({ isOpen, onClose, cancelRef, cliente }) => {
  if (!cliente) return null;

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar Cliente
          </AlertDialogHeader>

          <AlertDialogBody>
            Esta seguro que desea borrar el cliente {cliente.nombre} {cliente.apellido}?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={onClose}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
