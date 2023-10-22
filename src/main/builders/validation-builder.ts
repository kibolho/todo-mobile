import { FieldValidation } from "@/validation/protocols";
import {
  RequiredFieldValidation,
  EmailValidation,
  LengthValidation,
  MinLengthValidation,
  CompareFieldsValidation,
  WordsValidation,
  NumberValidation,
  DateValidation,
} from "@/validation/validators";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  length(length: number): ValidationBuilder {
    this.validations.push(new LengthValidation(this.fieldName, length));
    return this;
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    );
    return this;
  }

  words(numberOfWords: number): ValidationBuilder {
    this.validations.push(new WordsValidation(this.fieldName, numberOfWords));
    return this;
  }

  number(): ValidationBuilder {
    this.validations.push(new NumberValidation(this.fieldName));
    return this;
  }

  date(): ValidationBuilder {
    this.validations.push(new DateValidation(this.fieldName));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
