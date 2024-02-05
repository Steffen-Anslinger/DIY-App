import { useSession, signIn, signOut } from "next-auth/react";
import StyledButton from "@/components/Layout/Styled Buttons";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <StyledButton type="button" name="blue" onClick={() => signOut()}>
          Sign out
        </StyledButton>
      </>
    );
  }
  return (
    <>
      <StyledButton type="button" name="orange" onClick={() => signIn()}>
        Sign in
      </StyledButton>
    </>
  );
}
