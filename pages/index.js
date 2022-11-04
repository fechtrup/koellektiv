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
      <div className="logo">
        <Image src={Logo} alt="logo" />
      </div>
      <div>
        <DynamicMap />
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
