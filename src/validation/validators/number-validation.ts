import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class NumberValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    const numberRegex = /^\d+$/;
    return !input[this.field] || numberRegex.test(input[this.field])
      ? null
      : new InvalidFieldError();
  }
}
