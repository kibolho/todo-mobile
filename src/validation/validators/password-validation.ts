import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class PasswordValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    const passwordRegex =
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return !input[this.field] || passwordRegex.test(input[this.field])
      ? null
      : new InvalidFieldError(`Password is too weak, use: 
        At least one digit (0-9)
        At least one special character
        No newline characters
        At least one uppercase letter (A-Z)
        At least one lowercase letter (a-z)`);
  }
}
