import { getUserData } from "@/lib/auth/get-user-data";
import { Header } from "./Header";

export default async function HeaderServer() {
  const user = await getUserData();
  return <Header user={user} />;
}
