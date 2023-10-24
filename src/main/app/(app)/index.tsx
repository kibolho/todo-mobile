import { useSession } from "@/presentation/hooks/use-session";
import { Redirect } from "expo-router";

export default function Page() {
  const { session } = useSession();
  if (!session) return <></>;
  return <Redirect href={"(app)/home"} />;
}
