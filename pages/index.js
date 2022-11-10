import { Box } from "@chakra-ui/react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Logo from "../public/images/logo2.png";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <>
      <Box className="logo">
        <Image src={Logo} alt="logo" width={247} height={80} />
      </Box>
      <div>
        <DynamicMap />
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
