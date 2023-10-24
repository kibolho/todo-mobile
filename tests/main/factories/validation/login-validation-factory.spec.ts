import { makeLoginValidation } from "@/main/factories/validation";
import { ValidationComposite } from "@/main/composites";
import {
  EmailValidation,
  MinLengthValidation,
  PasswordValidation,
  RequiredFieldValidation,
} from "@/validation/validators";
import { MaxLengthValidation } from "@/validation/validators/max-length-validation";

describe("LoginValidationFactory", () => {
  test("Should make ValidationComposite with correct validations", () => {
    const composite = makeLoginValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation("email"),
        new EmailValidation("email"),
        new RequiredFieldValidation("password"),
        new MinLengthValidation("password", 8),
        new MaxLengthValidation("password", 50),
        new PasswordValidation("password"),
      ])
    );
  });
});
