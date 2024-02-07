import ProjectForm from "@/components/ProjectForm";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import InfoSVG from "@/components/Design/SVGs/InfoIcon";
import InfoBanner from "@/components/Design/StyledBanner";

export default function CreatePage() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <ProjectForm />
      ) : (
        <>
          <InfoBanner>
            <InfoSVG />
            <h2>Please Login to create a new project!</h2>
            <LoginButton />
          </InfoBanner>
        </>
      )}
    </>
  );
}
