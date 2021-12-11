import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  IconButton,
  ResponsiveValue,
  Spinner,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import { BasicLayout } from "../../../layout";
import { useGetNegocioVentasByFechaQuery } from "../../../services/api.tiendaropita.negocios";
import { InputAutocomplete } from "../../../components/InputAutocomplete";
import { getNegociosByQuery } from "../../../services/api.tiendaropita.negocios";
import "./date-picker.css";

export const SalesSucursal = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [negocioInputValue, setNegocioInputValue] = useState<any>("");

  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetNegocioVentasByFechaQuery({
    id: negocioInputValue.value,
    fecha: format(startDate, "dd-MM-yyyy"),
  });

  const handleNegocioChange = (selectedOption) => {
    setNegocioInputValue(selectedOption);
  };

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="column" justifyContent="space-between" w="800px">
        <Stack alignItems="center" direction="row" justifyContent="flex-start" pb={4} w="100%">
          <IconButton
            aria-label="Go back"
            icon={<ChevronLeftIcon />}
            onClick={() => navigate("/negocios")}
          />
          <Text fontSize="xl" fontWeight={600}>
            Ventas de Sucursal
          </Text>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          position="relative"
          spacing={4}
          w="100%"
        >
          <FormControl alignItems="center" display="flex" w="400px">
            <FormLabel fontWeight={600}>Sucursal: </FormLabel>
            <InputAutocomplete
              api={getNegociosByQuery}
              handleChange={handleNegocioChange}
              inputValue={negocioInputValue}
              name="negocio"
              placeholder="Seleccione una sucursal"
            />
          </FormControl>
          <Stack>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column" w="800px">
        <Stack alignItems="center">
          {isLoading && <Spinner size="lg" textAlign="center" />}
          {isSuccess ? (
            <Grid
              borderRadius="6px"
              borderWidth="2px"
              mt={4}
              pb={4}
              templateColumns="repeat(3, 1fr)"
              w="100%"
            >
              <TableHeaderText pl={8}>ID</TableHeaderText>
              <TableHeaderText>SUCURSAL</TableHeaderText>
              <TableHeaderText>VENTAS</TableHeaderText>

              {data.map((negocio) => (
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
                    <Text textAlign="left">{negocio.ganancia}</Text>
                  </GridItem>
                </React.Fragment>
              ))}
            </Grid>
          ) : (
            <GridItem pt={4}>
              <Text textAlign="center">No hay datos</Text>
            </GridItem>
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
