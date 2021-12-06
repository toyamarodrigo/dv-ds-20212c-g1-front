import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronDownIcon, ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
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

export const Ventas = () => {
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [ventas, setVentas] = useState([]);
  const { data, isLoading, isSuccess } = useGetVentasQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const cancelRef = React.useRef();

  const handleExpandVenta = (venta) => {
    setSelectedVenta(venta);
  };

  useEffect(() => {
    setVentas(data.map((venta) => ({ ...venta, isExpanded: false })));
  }, []);

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="800px">
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
            onClick={() => navigate("/ventas/efectivo")}
          >
            Venta Efectivo 💵
          </Button>
          <Button
            colorScheme="whatsapp"
            leftIcon={<AddIcon />}
            onClick={() => navigate("/ventas/tarjeta")}
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

              {ventas.map((venta) => (
                <React.Fragment key={venta.id}>
                  <GridItem pt={4}>
                    <Text pl={8} textAlign="left">
                      {venta.id}
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
                    <IconButton
                      aria-label="Expand Sucursal"
                      colorScheme="blackAlpha"
                      icon={<ChevronDownIcon />}
                      onClick={() => handleExpandVenta(venta)}
                    />
                  </GridItem>

                  {venta.isExpanded && venta.items.length > 0 ? (
                    venta.cantidadCuotas && (
                      <>
                        <TableHeaderText pl={8}>ID</TableHeaderText>
                        <TableHeaderText>CANTIDAD</TableHeaderText>
                        <TableHeaderText>PRENDA</TableHeaderText>
                        <TableHeaderText>CANT. CUOTAS</TableHeaderText>
                        <TableHeaderText>IMPORTE</TableHeaderText>
                        <TableHeaderText textAlign="center">ACCION</TableHeaderText>
                        <GridItem pt={4}>
                          <Text>aca estoy</Text>
                        </GridItem>
                        <GridItem pt={4}>
                          <Text>aca estoy</Text>
                        </GridItem>
                        <GridItem pt={4}>
                          <Text>aca estoy</Text>
                        </GridItem>
                        <GridItem pt={4}>
                          <Text>aca estoy</Text>
                        </GridItem>
                        <GridItem pt={4}>
                          <Text>aca estoy</Text>
                        </GridItem>
                        <GridItem pt={4}>
                          <Text>aca estoy</Text>
                        </GridItem>
                      </>
                    )
                  ) : (
                    <>
                      <TableHeaderText pl={8}>ID</TableHeaderText>
                      <TableHeaderText>CANTIDAD</TableHeaderText>
                      <TableHeaderText>PRENDA</TableHeaderText>
                      <TableHeaderText />
                      <TableHeaderText>IMPORTE</TableHeaderText>
                      <TableHeaderText textAlign="center">ACCION</TableHeaderText>
                      <GridItem pt={4}>
                        <Text>aca estoy</Text>
                      </GridItem>
                      <GridItem pt={4}>
                        <Text>aca estoy</Text>
                      </GridItem>
                      <GridItem pt={4}>
                        <Text>aca estoy</Text>
                      </GridItem>
                      <GridItem pt={4}>
                        <Text>aca estoy</Text>
                      </GridItem>
                      <GridItem pt={4}>
                        <Text>aca estoy</Text>
                      </GridItem>
                      <GridItem pt={4}>
                        <Text>aca estoy</Text>
                      </GridItem>
                    </>
                  )}
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
    <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar Cliente
          </AlertDialogHeader>

          <AlertDialogBody>
            Esta seguro que desea borrar el cliente{" "}
            <Box as="span" fontWeight={600}>
              {cliente.nombre} {cliente.apellido}
            </Box>
            ?
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
