import { useSession, signIn, signOut } from "next-auth/react";
import StyledButton from "@/components/Layout/Styled Buttons";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <StyledButton type="blue" onClick={() => signOut()}>
          Sign out
        </StyledButton>
      </>
    );
  }
  return (
    <>
      You are not signed in <br />
      <StyledButton type="orange" onClick={() => signIn()}>
        Sign in
      </StyledButton>
    </>
  );
}
