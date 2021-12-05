import React, { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import { useColorMode } from "@chakra-ui/color-mode";
import { HStack, Link, Stack, Text, VStack } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnMenuRef = useRef();
  const Links = [
    { page: "/", name: "Home" },
    // { page: "/about", name: "About" },
    // { page: "/contact", name: "Contact" },
  ];

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      position="absolute"
      px={{ base: 10, sm: 20, lg: 20, xl: 30 }}
      py={4}
      w="100%"
      zIndex="1"
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        maxW={{ base: "100%", xl: "1152px" }}
        w="100%"
      >
        <Stack alignItems="center" direction="row">
          <HStack
            as={"nav"}
            className="nav-links"
            color="white"
            display={{ base: "none", md: "flex" }}
            spacing={10}
          >
            {Links.map((link, index) => (
              <Link key={index} as={RouterLink} to={`${link.page}`}>
                <Button
                  bgColor="transparent"
                  color={colorMode === "dark" ? "white" : "black"}
                  cursor="pointer"
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </HStack>
        </Stack>

        <HStack display={{ base: "none", md: "flex" }}>
          <IconButton
            isRound
            aria-label="Toggle color mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            padding={0}
            onClick={toggleColorMode}
          />
        </HStack>

        <IconButton
          ref={btnMenuRef}
          aria-label={"Open Menu"}
          backgroundColor="transparent"
          display={{ md: "none" }}
          icon={!isOpen && <HamburgerIcon h={8} w={8} />}
          size={"md"}
          onClick={onOpen}
        />
      </Stack>

      <Drawer finalFocusRef={btnMenuRef} isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={colorMode === "dark" ? "white" : "black"} />
          <DrawerHeader
            color={colorMode === "dark" ? "white" : "black"}
            marginBottom={6}
            marginLeft={2}
          >
            Menu
          </DrawerHeader>
          <DrawerBody>
            <Stack marginLeft={4} spacing={6}>
              <VStack
                alignItems="flex-start"
                color={colorMode === "dark" ? "white" : "black"}
                spacing={6}
              >
                {Links.map((link, index) => (
                  <Link key={index} to={`${link.page}`}>
                    <Text color={colorMode === "dark" ? "white" : "black"} cursor="pointer">
                      {link.name}
                    </Text>
                  </Link>
                ))}
              </VStack>
              <VStack alignItems="flex-start">
                <IconButton
                  isRound
                  aria-label="Toggle color mode"
                  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                  padding={0}
                  onClick={toggleColorMode}
                />
              </VStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}
