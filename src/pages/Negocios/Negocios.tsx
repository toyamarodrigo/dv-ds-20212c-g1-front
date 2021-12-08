import React, { useEffect } from "react";
import { Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { ResponsiveValue } from "@chakra-ui/styled-system";
import { Spinner } from "@chakra-ui/spinner";

import { BasicLayout } from "../../layout";
import { useGetNegociosPageableQuery } from "../../services/api.tiendaropita.negocios";

export const Negocios = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, refetch } = useGetNegociosPageableQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="800px">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate("/")} />
        <Text fontSize="xl" fontWeight={600}>
          Negocios
        </Text>
      </Stack>
      <Stack direction="column" w="800px">
        <Stack direction="row">
          <Button
            colorScheme="whatsapp"
            leftIcon={<AddIcon />}
            onClick={() => navigate("/negocios/new")}
          >
            Agregar Sucursal
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
              templateColumns="repeat(4, 1fr)"
              w="100%"
            >
              <TableHeaderText pl={8}>ID</TableHeaderText>
              <TableHeaderText>SUCURSAL</TableHeaderText>
              <TableHeaderText>VENTAS TOTALES</TableHeaderText>
              <TableHeaderText textAlign="center">ACCION</TableHeaderText>

              {data.content.map((negocio) => (
                <React.Fragment key={negocio.id}>
                  <GridItem pt={4}>
                    <Text pl={8} textAlign="left">
                      {negocio.id}
                    </Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{negocio.sucursal}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <Text textAlign="left">{negocio.importeTotal}</Text>
                  </GridItem>
                  <GridItem pt={4}>
                    <IconButton
                      aria-label="Edit Negocio"
                      colorScheme="yellow"
                      icon={<EditIcon />}
                      onClick={() => navigate(`/negocios/edit`, { state: { negocio } })}
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
