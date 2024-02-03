import ProjectForm from "@/components/ProjectForm";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import InfoSVG from "@/public/assets/InfoIcon";
import StyledBanner from "@/components/Layout/StyledBanner";

export default function CreatePage() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <ProjectForm />
      ) : (
        <>
          <StyledBanner type="information">
            <InfoSVG />
            <h2>Please Login to create a new project!</h2><LoginButton />
          </StyledBanner>
          
        </>
      )}
    </>
  );
}
