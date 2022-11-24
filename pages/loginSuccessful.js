import Image from "next/image";
import Logo from "../public/images/logo2.png";
import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import Success from "../public/images/success-small.gif";

export default function loginSuccessful() {
  return (
    <>
      <div className="logo">
        <Image src={Logo} alt="Logo" />
      </div>
      <Flex
        direction={{ base: "column-reverse", md: "column-reverse", lg: "row" }}
      >
        <Flex flex="2" justify="center" align="center">
          <Flex
            gap={4}
            align="center"
            justify="flex-start"
            direction="column"
            m={20}
          >
            <Image
              src={Success}
              width={120}
              height={120}
              alt="login erfolgreich"
            />
            <Heading>Super, das hat geklappt</Heading>
            <Text>
              Bitte schaue in deinem Emailpostfach nach. Du
              <br /> bekommst gleich eine Email mit deinem Login-Link
            </Text>
          </Flex>
        </Flex>
        <Box flex="3">
          <div className="loginImg"></div>
        </Box>
      </Flex>
    </>
  );
}
