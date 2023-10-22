import { Providers } from "@/presentation/providers/providers";
import { Slot } from "expo-router";

export default function Root() {
  return (
    <Providers>
      <Slot />
    </Providers>
  );
}
