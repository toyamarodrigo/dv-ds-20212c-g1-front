import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
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
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";

import { BasicLayout } from "../../layout";
import {
  useDeletePrendaMutation,
  useGetPrendasQuery,
} from "../../services/api.tiendaropita.prendas";
import { Prenda } from "../../model/prenda";

export const Prendas = () => {
  const [selectedPrenda, setSelectedPrenda] = useState(null);
  const { data, isLoading, isSuccess, refetch } = useGetPrendasQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const cancelRef = React.useRef();

  const handleOpenDialog = (prenda: Prenda) => {
    setSelectedPrenda(prenda);
    onOpen();
  };

  useEffect(() => {
    refetch();
  }, [refetch, selectedPrenda]);

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="800px">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate("/")} />
        <Text fontSize="xl" fontWeight={600}>
          Prendas
        </Text>
      </Stack>
      <Stack direction="column" w="800px">
        <Stack direction="row">
          <Button
            colorScheme="whatsapp"
            leftIcon={<AddIcon />}
            onClick={() => navigate("/prendas/new")}
          >
            Agregar Prenda
          </Button>
        </Stack>
        <Stack alignItems="center">
          {isLoading && <Spinner size="lg" textAlign="center" />}
          {isSuccess && (
            <Grid
              borderRadius="6px"
              borderWidth="2px"
              mt={4}
              pb={4}
              templateColumns="repeat(5, 1fr)"
              w="100%"
            >
              <TableHeaderText pl={8}>ID</TableHeaderText>
              <TableHeaderText>DESCRIPCION</TableHeaderText>
              <TableHeaderText>TIPO</TableHeaderText>
              <TableHeaderText textAlign="center">PRECIO</TableHeaderText>
              <TableHeaderText textAlign="center">ACCION</TableHeaderText>

              {data.map((prenda) => (
                <React.Fragment key={prenda.id}>
                  <GridItem pt={4}>
                    <Text pl={8} textAlign="left">
                      {prenda.id}
                    </Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{prenda.descripcion}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{prenda.tipo}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="center">{prenda.precioBase}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <IconButton
                      aria-label="Edit Negocio"
                      colorScheme="yellow"
                      icon={<EditIcon />}
                      mr={2}
                      onClick={() => navigate(`/prendas/edit`, { state: { prenda } })}
                    />
                    <IconButton
                      aria-label="Edit Negocio"
                      colorScheme="red"
                      icon={<FaTrashAlt />}
                      onClick={() => handleOpenDialog(prenda)}
                    />
                  </GridItem>
                </React.Fragment>
              ))}
              <DeleteModal
                cancelRef={cancelRef}
                isOpen={isOpen}
                prenda={selectedPrenda}
                setPrenda={setSelectedPrenda}
                onClose={onClose}
              />
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

const DeleteModal = ({ isOpen, onClose, cancelRef, prenda, setPrenda }) => {
  const [deletePrenda] = useDeletePrendaMutation();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deletePrenda(prenda.id)
        .unwrap()
        .then(() => {
          setPrenda(null);
          toast({
            title: "Prenda borrada",
            description: "La prenda ha sido borrado correctamente",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          onClose();
        });
    } catch {
      toast({
        title: "Error",
        description: "Hubo un error al borrar la prenda",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (!prenda) return null;

  return (
    <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar Prenda
          </AlertDialogHeader>

          <AlertDialogBody>
            Esta seguro que desea borrar la prenda{" "}
            <Box as="span" fontWeight={600}>
              {prenda.descripcion}
            </Box>
            ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
