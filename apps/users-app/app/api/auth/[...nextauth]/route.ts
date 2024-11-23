import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";
// Used for React components or files that contain JSX (JavaScript XML) syntax.
const handler = NextAuth(authOptions)
export {handler as GET ,handler as POST}