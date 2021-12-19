import { Text } from "@chakra-ui/react";
import React from "react";

import { BasicLayout } from "../../layout";

export const NotFound = () => {
  return (
    <BasicLayout>
      <Text fontFamily="Rubik" fontSize="6xl" fontWeight="bold" position="absolute" top="10%">
        404: Pagina no encontrada
      </Text>
    </BasicLayout>
  );
};
