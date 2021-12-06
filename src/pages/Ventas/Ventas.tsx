import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@chakra-ui/button";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  EditIcon,
} from "@chakra-ui/icons";
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

import { BasicLayout } from "../../layout";
import { useGetVentasQuery } from "../../services/api.tiendaropita.ventas";
import { Venta } from "../../model/venta";

export const Ventas = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [ventas, setVentas] = useState([]);
  const { data, isLoading, isSuccess } = useGetVentasQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const cancelRef = React.useRef();

  const handleExpandVenta = (venta) => {
    setVentas(ventas.map((v) => (v.id === venta.id ? { ...v, isExpanded: !v.isExpanded } : v)));
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  useEffect(() => {
    if (data) setVentas(data.map((venta) => ({ ...venta, isExpanded: false })));
  }, [data]);

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" h="100%" w="800px">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
        <Text fontSize="xl" fontWeight={600}>
          Ventas
        </Text>
      </Stack>
      <Stack direction="column" w="800px">
        <Stack direction="row">
          <Button
            colorScheme="whatsapp"
            leftIcon={<AddIcon />}
            onClick={() => navigate("/ventas/efectivo/new")}
          >
            Venta Efectivo 💵
          </Button>
          <Button
            colorScheme="whatsapp"
            leftIcon={<AddIcon />}
            onClick={() => navigate("/ventas/tarjeta/new")}
          >
            Venta Tarjeta 💳
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
              templateColumns="repeat(6, 1fr)"
              w="100%"
            >
              <TableHeaderText pl={8}>ID</TableHeaderText>
              <TableHeaderText>FECHA</TableHeaderText>
              <TableHeaderText>SUCURSAL</TableHeaderText>
              <TableHeaderText>CLIENTE</TableHeaderText>
              <TableHeaderText>IMPORTE</TableHeaderText>
              <TableHeaderText textAlign="center">ACCION</TableHeaderText>

              {ventas.map((venta: Venta) => (
                <React.Fragment key={venta.id}>
                  <GridItem pt={4}>
                    <Text pl={8} textAlign="left">
                      {venta.cantidadCuotas ? `💳 ${venta.id}` : `💵 ${venta.id}`}
                    </Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{venta.fecha}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{venta.negocio.sucursal}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{venta.cliente.razonSocial}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{venta.importeFinalStr}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <IconButton
                      aria-label="Agregar Item"
                      colorScheme="whatsapp"
                      icon={<AddIcon />}
                      mr={2}
                      onClick={() => navigate(`/ventas/${venta.id}/item/new`, { state: { venta } })}
                    />
                    {venta.items.length > 0 && (
                      <IconButton
                        aria-label="Expand Sucursal"
                        bgColor="gray.500"
                        color="white"
                        icon={!venta.isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        onClick={() => handleExpandVenta(venta)}
                      />
                    )}
                  </GridItem>
                  {venta.items.map((item, index) => {
                    if (venta.isExpanded && venta.items.length > 0) {
                      if (venta.cantidadCuotas) {
                        return (
                          <React.Fragment key={item.id}>
                            {index === 0 && (
                              <>
                                <TableHeaderItemText pl={8}>ID</TableHeaderItemText>
                                <TableHeaderItemText>CANTIDAD</TableHeaderItemText>
                                <TableHeaderItemText>PRENDA</TableHeaderItemText>
                                <TableHeaderItemText textAlign="center">
                                  CANT. CUOTAS
                                </TableHeaderItemText>
                                <TableHeaderItemText textAlign="center">
                                  IMPORTE
                                </TableHeaderItemText>
                                <TableHeaderItemText textAlign="center">ACCION</TableHeaderItemText>
                              </>
                            )}
                            <TableCellItem bgColor="blue.50" pl={8}>
                              {item.id}
                            </TableCellItem>
                            <TableCellItem bgColor="blue.50">{item.cantidad}</TableCellItem>
                            <TableCellItem bgColor="blue.50">
                              {item.prenda.descripcion}
                            </TableCellItem>
                            <TableCellItem bgColor="blue.50" textAlign="center">
                              {venta.cantidadCuotas}
                            </TableCellItem>
                            <TableCellItem bgColor="blue.50" textAlign="center">
                              {venta.importeFinalStr}
                            </TableCellItem>
                            <TableCellItem bgColor="blue.50" textAlign="center">
                              <IconButton
                                aria-label="Edit Negocio"
                                colorScheme="yellow"
                                icon={<EditIcon />}
                                mr={2}
                                onClick={() =>
                                  navigate(`/ventas/${venta.id}/item/${item.id}/edit`, {
                                    state: { venta, item },
                                  })
                                }
                              />
                              <IconButton
                                aria-label="Edit Negocio"
                                colorScheme="red"
                                icon={<FaTrashAlt />}
                                onClick={() => handleDelete(item)}
                              />
                              <DeleteModal
                                cancelRef={cancelRef}
                                isOpen={isOpen}
                                item={selectedItem}
                                onClose={onClose}
                              />
                            </TableCellItem>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment key={item.id}>
                            {index === 0 && (
                              <>
                                <TableHeaderItemText pl={8}>ID</TableHeaderItemText>
                                <TableHeaderItemText>CANTIDAD</TableHeaderItemText>
                                <TableHeaderItemText>PRENDA</TableHeaderItemText>
                                <TableHeaderItemText />
                                <TableHeaderItemText>IMPORTE</TableHeaderItemText>
                                <TableHeaderItemText textAlign="center">ACCION</TableHeaderItemText>
                              </>
                            )}
                            <TableCellItem bgColor="blue.50" pl={8}>
                              {item.id}
                            </TableCellItem>
                            <TableCellItem bgColor="blue.50" textAlign="center">
                              {item.cantidad}
                            </TableCellItem>
                            <TableCellItem bgColor="blue.50">
                              {item.prenda.descripcion}
                            </TableCellItem>
                            <TableCellItem bgColor="blue.50" />
                            <TableCellItem bgColor="blue.50">{venta.importeFinalStr}</TableCellItem>
                            <TableCellItem bgColor="blue.50" textAlign="center">
                              <IconButton
                                aria-label="Edit Negocio"
                                colorScheme="yellow"
                                icon={<EditIcon />}
                                mr={2}
                                onClick={() =>
                                  navigate(`/ventas/${venta.id}/item/${item.id}/edit`, {
                                    state: { venta, item },
                                  })
                                }
                              />
                              <IconButton
                                aria-label="Edit Negocio"
                                colorScheme="red"
                                icon={<FaTrashAlt />}
                                onClick={() => handleDelete(item)}
                              />
                              <DeleteModal
                                cancelRef={cancelRef}
                                isOpen={isOpen}
                                item={selectedItem}
                                onClose={onClose}
                              />
                            </TableCellItem>
                          </React.Fragment>
                        );
                      }
                    }
                  })}
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
  children?: React.ReactNode;
  bgColor?: string;
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

const TableHeaderItemText = ({ textAlign = "left", children, pl }: ITableText) => {
  return (
    <GridItem bgColor="blue.300" mt={4} py={4}>
      <Text color="#ffffff" fontSize="12px" fontWeight={700} pl={pl} textAlign={textAlign}>
        {children}
      </Text>
    </GridItem>
  );
};

const TableCellItem = ({ textAlign = "left", children, pl, bgColor }: ITableText) => {
  return (
    <GridItem bgColor={bgColor} pl={pl} py={4}>
      <Text color="black" textAlign={textAlign}>
        {children}
      </Text>
    </GridItem>
  );
};

const DeleteModal = ({ isOpen, onClose, cancelRef, item }) => {
  if (!item) return null;

  return (
    <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar Cliente
          </AlertDialogHeader>

          <AlertDialogBody>
            Esta seguro que desea borrar el item{" "}
            <Box as="span" fontWeight={600}>
              {item.prenda.descripcion}
            </Box>
            de la prenda?
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
