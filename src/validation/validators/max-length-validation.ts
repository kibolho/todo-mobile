import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class MaxLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly maxLength: number) {}

  validate(input: object): Error {
    return input[this.field] && input[this.field]?.length > this.maxLength
      ? new InvalidFieldError("Maximum length is " + this.maxLength)
      : null;
  }
}
