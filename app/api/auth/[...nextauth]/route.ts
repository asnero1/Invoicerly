// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: "dummy-github-client-id",
      clientSecret: "dummy-github-client-secret",
    }),
    GoogleProvider({
      clientId: "dummy-google-client-id",
      clientSecret: "dummy-google-client-secret",
    }),
  ],
  secret: "dummy-nextauth-secret",
})

export { handler as GET, handler as POST }
