import ProjectForm from "@/components/ProjectForm";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import StyledInfoMessage from "@/components/Layout/FormStyles/StyledInfoMessage";
import InfoSVG from "@/public/assets/InfoIcon";

export default function CreatePage() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <ProjectForm />
      ) : (
        <>
          <StyledInfoMessage>
            <InfoSVG />
            <h2>Please Login to create a new project!</h2>
          </StyledInfoMessage>
          <LoginButton />
        </>
      )}
    </>
  );
}
