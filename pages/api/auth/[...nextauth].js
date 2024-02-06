import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "newfishes",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        return {
          id: 1,
          name: "Craftify Buddy",
          email: "new@fishes.com",
          image: "https://avatars.githubusercontent.com/u/41701911?s=200&v=4",
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
