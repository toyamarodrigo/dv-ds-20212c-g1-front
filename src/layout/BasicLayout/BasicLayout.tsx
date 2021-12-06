import React from "react";
import { Stack, Text } from "@chakra-ui/layout";

import { Navbar } from "../../components";

export const BasicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Stack
        alignItems="center"
        h="100vh"
        justifyContent="center"
        position="relative"
        spacing={10}
        w="100vw"
      >
        <Stack alignItems="center" justifyContent="center" spacing={6} textAlign="center">
          {children}
        </Stack>
      </Stack>
    </>
  );
};
