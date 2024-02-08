import { useSession, signIn, signOut } from "next-auth/react";
import StyledButton from "@/components/Design/StyledButtons";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <StyledButton
          aria-label="sign out"
          type="button"
          name="outline"
          onClick={() => signOut()}
        >
          Sign out
        </StyledButton>
      </>
    );
  }
  return (
    <>
      <StyledButton
        aria-label="sign in"
        type="button"
        name="orange"
        onClick={() => signIn()}
      >
        Sign in
      </StyledButton>
    </>
  );
}
