import { ValidationComposite } from "@/main/composites";
import { fakerWord } from "@/tests/presentation/mocks";
import { FieldValidationSpy } from "@/tests/validation/mocks";

import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessage = faker.word.noun();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.word.noun());

    const error = sut.validate(fieldName, { [fieldName]: fakerWord });

    expect(error).toBe(errorMessage);
  });

  test("Should return error if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);

    const error = sut.validate(fieldName, { [fieldName]: fakerWord });

    expect(error).toBeFalsy();
  });
});
