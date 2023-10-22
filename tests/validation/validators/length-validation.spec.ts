import { InvalidFieldError } from "@/validation/errors";
import { LengthValidation } from "@/validation/validators";

import { faker } from "@faker-js/faker";

const makeSut = (field: string, length: number): LengthValidation =>
  new LengthValidation(field, length);

const cases = [
  {
    invalidValue: faker.helpers.rangeToNumber(1),
    length: 2,
  },
  {
    invalidValue: faker.helpers.rangeToNumber(10),
    length: 5,
  },
];
describe("LengthValidation", () => {
  test.each(cases)(
    "Should return error when value $invalidValue is $invalid for length",
    ({ invalidValue, length }) => {
      const field = faker.database.column();
      const sut = makeSut(field, length);

      const error = sut.validate({ [field]: invalidValue });

      expect(error).toEqual(new InvalidFieldError());
    }
  );

  test("Should return falsy if value is valid", () => {
    const field = faker.database.column();
    const sut = makeSut(field, 10);
    const error = sut.validate({ [field]: faker.word.noun(10) });

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
