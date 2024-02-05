import { useSession, signIn, signOut } from "next-auth/react";
import StyledButton from "@/components/Layout/Styled Buttons";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <StyledButton type="blue" onClick={() => signOut()}>
          Sign out
        </StyledButton>
      </>
    );
  }
  return (
    <>
      <StyledButton type="orange" onClick={() => signIn()}>
        Sign in
      </StyledButton>
    </>
  );
}
