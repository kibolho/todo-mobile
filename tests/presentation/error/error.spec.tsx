import { ErrorBoundary } from "@/presentation/pages";
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import React, { useEffect } from "react";
import * as Updates from "expo-updates";

type SutTypes = {
  screen: RenderResult;
};

const ErrorPage: React.FC = () => {
  useEffect(() => {
    throw new Error();
  }, []);
  return null;
};

const makeSut = (): SutTypes => {
  render(
    <ErrorBoundary>
      <ErrorPage />
    </ErrorBoundary>
  );
  return {
    screen,
  };
};

describe("Error Component", () => {
  test("Should start with initial state", () => {
    makeSut();
    expect(screen.getByTestId("reload-error-header")).toBeTruthy();
    expect(screen.getByTestId("reload-error-button")).toBeTruthy();
  });
  test("Should navigate to home when click reload", async () => {
    makeSut();
    const button = screen.getByTestId("reload-error-button");
    fireEvent(button, "press");
    expect(Updates.reloadAsync).toHaveBeenCalled();
  });
});
