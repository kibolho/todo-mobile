import { GraphQLProvider } from "@/infra/graphql";
import { SessionProvider } from "@/presentation/hooks/use-session";
import { NativeBaseProvider } from "native-base";
import { PropsWithChildren } from "react";

interface Props {
  inset?: any;
}
export const Providers: React.FC<PropsWithChildren<Props>> = ({
  inset,
  children,
}) => {
  return (
    <GraphQLProvider>
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SessionProvider>{children}</SessionProvider>
      </NativeBaseProvider>
    </GraphQLProvider>
  );
};
