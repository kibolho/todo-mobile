import { LoginPage } from "@/presentation/pages";
import {
  ValidationStub,
  fakeEmail,
  fakePassword,
} from "@/tests/presentation/mocks";

import { Providers } from "@/presentation/providers/providers";
import { act, fireEvent, render, screen } from "@testing-library/react-native";

type SutTypes = {};

type SutParams = {
  validationError?: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  render(
    <Providers inset={inset}>
      <LoginPage validation={validationStub} />
    </Providers>
  );
  return {};
};

const simulateValidSubmit = async (
  email = fakeEmail,
  password = fakePassword
): Promise<void> => {
  act(() => {
    const submit = screen.getByTestId("submit-login");
    fireEvent.press(submit);
  });
};

describe("Login Component", () => {
  test("Should start with initial state", () => {
    makeSut();
    expect(screen.getByTestId("email-input").children).toEqual([]);
    expect(screen.getByTestId("password-input").children).toEqual([]);
  });

  test("Should navigate after login", () => {
    makeSut();
    simulateValidSubmit();
    expect(screen.getByTestId("email-input").children).toEqual([]);
    expect(screen.getByTestId("password-input").children).toEqual([]);
  });
});
