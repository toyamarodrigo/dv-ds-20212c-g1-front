import React from "react";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { BasicLayout } from "../../layout";

export const Ventas = () => {
  const navigate = useNavigate();

  return (
    <BasicLayout>
      <Stack alignItems="center" direction="row" w="800px">
        <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
        <Text fontSize="xl" fontWeight={600}>
          Ventas
        </Text>
      </Stack>
    </BasicLayout>
  );
};
