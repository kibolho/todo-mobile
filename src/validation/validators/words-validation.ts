import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class WordsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly numberOfWords: number) {}

  validate(input: object): Error {
    const words = input[this.field]?.split(" ")?.filter((w) => !!w);
    return !input[this.field] || words.length >= this.numberOfWords
      ? null
      : new InvalidFieldError();
  }
}
