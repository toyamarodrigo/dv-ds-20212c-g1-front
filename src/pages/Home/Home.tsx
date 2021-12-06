import React from "react";
import { Grid, Stack, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import { BasicLayout } from "../../layout";

export const Home = () => {
  return (
    <BasicLayout>
      <Text fontFamily="Rubik" fontSize="6xl" fontWeight="bold" position="absolute" top="10%">
        Tienda Ropita
      </Text>
      <Grid gap={6} templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}>
        <EntityContainer bgColor="blue.100" color="black" title="Negocios" to="/negocios" />
        <EntityContainer bgColor="blue.100" color="black" title="Ventas" to="/ventas" />
        <EntityContainer bgColor="blue.100" color="black" title="Clientes" to="/clientes" />
        <EntityContainer bgColor="blue.100" color="black" title="Prendas" to="/prendas" />
      </Grid>
    </BasicLayout>
  );
};

const EntityContainer = ({ bgColor, color, title, to }) => {
  return (
    <Stack
      _hover={{ bgColor: "blue.200" }}
      alignItems="center"
      as={RouterLink}
      bgColor={bgColor}
      borderRadius="6px"
      color={color}
      cursor="pointer"
      direction="row"
      fontFamily="Karla"
      h="60px"
      pl={2}
      shadow="lg"
      spacing={4}
      to={to}
      w="250px"
    >
      <IconButton aria-label={`Ver ${title}`} icon={<SearchIcon />} />
      <Text fontSize="24px" fontWeight="bold">
        {title}
      </Text>
    </Stack>
  );
};
