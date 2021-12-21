import React from "react";
import { Stack } from "@chakra-ui/layout";

import { Navbar } from "../../components";

export const BasicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Stack
        alignItems="center"
        h="100%"
        justifyContent="center"
        minH="90vh"
        minW="100%"
        position="relative"
        spacing={10}
      >
        <Stack alignItems="center" justifyContent="center" spacing={6} textAlign="center">
          {children}
        </Stack>
      </Stack>
    </>
  );
};
