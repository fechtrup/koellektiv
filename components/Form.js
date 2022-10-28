import * as React from "react";
import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

function Form(props) {
  const btnRef = React.useRef();

  //Hook for input field value
  const [name, setName] = useState(" ");

  const handleInput = (event) => {
    setName(event.target.value);
    setInput(event.target.value);
  };

  const logValue = () => {
    const locationName = name;
    console.log(locationName);
  };

  const [input, setInput] = useState("");

  const isError = input === "";

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        onClose={props.onCancel}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={props.onCancel} />
          <DrawerHeader>Neue Location</DrawerHeader>

          <DrawerBody>
            <FormControl isInvalid={isError} isRequired>
              <Input
                placeholder="Name der Location"
                value={input}
                onChange={handleInput}
              />
              {!isError ? (
                <FormHelperText>
                  Bitte trage den Namen der Location ein
                </FormHelperText>
              ) : (
                <FormErrorMessage>Dies ist ein Pflichtfeld</FormErrorMessage>
              )}
            </FormControl>

            {/* <FormControl as={SimpleGrid} columns={{ base: 2, lg: 2 }}>
              <FormLabel htmlFor="plakate" mb="0" class="switch__label">
                Plakate
              </FormLabel>
              <Switch
                id="plakate"
                colorScheme="teal"
                size="lg"
                class="switch"
              />

              <FormLabel htmlFor="flyer" mb="0" class="switch__label">
                Flyer
              </FormLabel>
              <Switch id="flyer" colorScheme="teal" size="lg" class="switch" />
            </FormControl> */}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={props.onCancel}>
              Schließen
            </Button>
            <Button
              bg="black"
              color="white"
              onClick={() => {
                if (isError) {
                  console.log("feld nicht ausgefüllt");
                } else {
                  logValue();
                  props.onSave();
                }
              }}
            >
              Speichern
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Form;
