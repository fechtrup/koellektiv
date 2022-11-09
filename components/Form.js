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

  const [input, setInput] = useState("");
  const [poster, setPoster] = useState(true);
  const [flyer, setFlyer] = useState(true);

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
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              if (!isError) {
                props.onRequestSave({ input, poster, flyer });
              }
            }}
          >
            <DrawerCloseButton onClick={props.onCancel} />
            <DrawerHeader>Neue Location</DrawerHeader>

            <DrawerBody>
              <FormControl isInvalid={isError} isRequired>
                <Input
                  placeholder="Name der Location"
                  value={input}
                  onChange={(evt) => {
                    setInput(evt.target.value);
                  }}
                />
                {!isError ? (
                  <FormHelperText>
                    Bitte trage den Namen der Location ein
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Dies ist ein Pflichtfeld</FormErrorMessage>
                )}
              </FormControl>

              <FormControl as={SimpleGrid} columns={{ base: 2, lg: 2 }}>
                <FormLabel
                  htmlFor="plakate"
                  mb="5"
                  mt="5"
                  className="switch__label"
                >
                  Plakate
                </FormLabel>
                <Switch
                  id="plakate"
                  colorScheme="teal"
                  size="lg"
                  className="switch"
                  isChecked={poster}
                  mb="5"
                  mt="5"
                  onChange={(evt) => {
                    setPoster(evt.target.checked);
                  }}
                />

                <FormLabel htmlFor="flyer" mb="0" className="switch__label">
                  Flyer
                </FormLabel>
                <Switch
                  id="flyer"
                  colorScheme="teal"
                  size="lg"
                  className="switch"
                  isChecked={flyer}
                  onChange={(evt) => {
                    setFlyer(evt.target.checked);
                  }}
                />
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={props.onCancel}>
                Schließen
              </Button>
              <Button
                bg="black"
                color="white"
                type="submit"
                isDisabled={isError}
              >
                Speichern
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Form;
