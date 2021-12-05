import React from "react";
import { Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/spinner";

import { BasicLayout } from "../../layout";
import { useGetVentasQuery } from "../../services/api.tiendaropita.ventas";

export const Ventas = () => {
  const { data, isLoading, isSuccess } = useGetVentasQuery();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <BasicLayout>
        <Spinner size="lg" />
      </BasicLayout>
    );

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
