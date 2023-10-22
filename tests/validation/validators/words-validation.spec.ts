import { InvalidFieldError } from "@/validation/errors";
import { WordsValidation } from "@/validation/validators";

import { faker } from "@faker-js/faker";

const makeSut = (field: string, numberOfWords: number): WordsValidation =>
  new WordsValidation(field, numberOfWords);

const cases = [
  {
    invalidValue: faker.word.noun(1),
    numberOfWords: 2,
  },
  {
    invalidValue: faker.word.noun(2),
    numberOfWords: 3,
  },
];
describe("WordsValidation", () => {
  test.each(cases)(
    "Should return error when value $invalidValue is invalid for $numberOfWords words",
    ({ invalidValue, numberOfWords }) => {
      const field = faker.database.column();
      const sut = makeSut(field, numberOfWords);

      const error = sut.validate({ [field]: invalidValue });

      expect(error).toEqual(new InvalidFieldError());
    }
  );

  test("Should return falsy if value is valid", () => {
    const field = faker.database.column();
    const sut = makeSut(field, 1);

    const error = sut.validate({ [field]: faker.word.noun(1) });

    expect(error).toBeFalsy();
  });

  test("Should return falsy if field does not exists in schema", () => {
    const sut = makeSut("any_field", 1);

    const error = sut.validate({
      invalidField: faker.helpers.rangeToNumber(5),
    });

    expect(error).toBeFalsy();
  });
});
