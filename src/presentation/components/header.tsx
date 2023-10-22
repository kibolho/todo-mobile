import { Authentication } from "@/domain/usecases";
import { useSession } from "@/presentation/hooks/use-session";
import { router } from "expo-router";
import { Box, HStack, Heading, Link, VStack } from "native-base";
import React from "react";

interface Props {
  title?: string;
  description?: string;
  authentication: Authentication;
}

export const Header: React.FC<Props> = ({
  title = "Todo",
  description = "Keep track of your todo list.",
  authentication,
}) => {
  const { setCurrentAccount } = useSession();

  const logout = async () => {
    router.replace("/sign-in");
    await authentication.logout();
    setCurrentAccount(null);
  };

  return (
    <Box py="3">
      <HStack w="100%" justifyContent="space-between" alignItems="start">
        <VStack flex={3}>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            {title}
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            {description}
          </Heading>
        </VStack>
        <Link
          _text={{
            fontSize: "md",
            fontWeight: "200",
          }}
          onPress={logout}
        >
          Logout
        </Link>
      </HStack>
    </Box>
  );
};
