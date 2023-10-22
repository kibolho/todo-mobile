import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class LengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly length: number) {}

  validate(input: object): Error {
    return !input[this.field] || input[this.field].length === this.length
      ? null
      : new InvalidFieldError();
  }
}
