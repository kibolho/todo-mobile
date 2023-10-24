import { useSession } from "@/presentation/hooks/use-session";
import { Redirect, Slot } from "expo-router";
import { HStack, Heading, Spinner } from "native-base";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  if (isLoading) {
    return (
      <HStack safeArea mt={4} space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="emerald.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
