import observability from "@/lib/observability";
import React from "react";
import { Button, Text, View } from "react-native";
import * as Updates from "expo-updates";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const event = error?.message || "global-error-boundary";
    observability.captureException({ event, error, errorInfo });
  }

  restart = async (): Promise<void> => {
    Updates.reloadAsync();
  };

  render() {
    if ((this.state as { hasError: boolean }).hasError) {
      // You can render any custom fallback UI
      return (
        <View>
          <View>
            <Text testID={"reload-error-header"}>Something went wrong 😔</Text>
            <Button
              testID={"reload-error-button"}
              onPress={this.restart}
              title="Refresh"
            />
          </View>
        </View>
      );
    }
    // @ts-ignore
    return this.props.children;
  }
}
export default ErrorBoundary;
