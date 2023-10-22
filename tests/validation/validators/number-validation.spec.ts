import { InvalidFieldError } from "@/validation/errors";
import { NumberValidation } from "@/validation/validators";

import { faker } from "@faker-js/faker";

const makeSut = (field: string): NumberValidation =>
  new NumberValidation(field);

const cases = [
  {
    invalidValue: faker.word.sample({ length: 10 }).toString(),
  },
  {
    invalidValue: faker.word.sample({ length: 20 }).toString(),
  },
];
describe("NumberValidation", () => {
  test.each(cases)(
    "Should return error when value $invalidValue is invalid",
    ({ invalidValue }) => {
      const field = faker.database.column();
      const sut = makeSut(field);

      const error = sut.validate({ [field]: invalidValue });

      expect(error).toEqual(new InvalidFieldError());
    }
  );

  test("Should return falsy if value is valid", () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.number.int({ min: 5 }) });

    expect(error).toBeFalsy();
  });

  test("Should return falsy if field does not exists in schema", () => {
    const sut = makeSut("any_field");

    const error = sut.validate({
      invalidField: faker.helpers.rangeToNumber(5),
    });

    expect(error).toBeFalsy();
  });
});
