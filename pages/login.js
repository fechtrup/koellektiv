import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../public/images/logo2.png";
import {
  Input,
  FormControl,
  Button,
  Flex,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const [email, setEmail] = useState("");
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <div className="logo">
        <Image src={Logo} alt="Logo" />
      </div>
      <Flex>
        <Flex flex="2" justify="center" align="center">
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              supabaseClient.auth
                .signInWithOtp({
                  email,
                  options: { emailRedirectTo: "http://koellektiv.vercel.app/" },
                })
                .then(() => {
                  <p>Success</p>;
                })
                .catch(() => {});
            }}
          >
            <Flex
              gap={4}
              align="flex-end"
              justify="flex-start"
              direction="column"
            >
              <p>
                Logge dich jetzt in unser köllektives Planungstool ein, <br />
                um beim Plakatieren und Flyer verteilen mitzuhelfen.
              </p>
              <Input
                placeholder="Email"
                size="lg"
                type="email"
                name="email"
                w={390}
                mt={5}
                value={email}
                onChange={(evt) => {
                  setEmail(evt.target.value);
                }}
              />
              <Button
                type="submit"
                size="lg"
                color="#fff"
                backgroundColor="#000"
              >
                Login
              </Button>
            </Flex>
          </form>
        </Flex>
        <Box flex="3">
          <div className="loginImg"></div>
        </Box>
      </Flex>
    </>
  );
}
