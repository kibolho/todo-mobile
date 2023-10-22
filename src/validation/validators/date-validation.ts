import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class DateValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return input[this.field] instanceof Date ? null : new InvalidFieldError();
  }
}
