import { useSession } from "next-auth/react";
import Image from "next/image";
export default function ProfilePage() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <p>You are not logged in! </p>
      </>
    );
  }
  return (
    <>
      <h1>Profile Page</h1>
      <p>{session.user.name}</p>
      <Image
        src={session.user.image}
        height={100}
        width={100}
        alt="user-picture"
      />
    </>
  );
}
