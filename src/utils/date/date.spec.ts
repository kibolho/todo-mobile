import { formatDate } from "./index";

describe("date", () => {
  test("formats date string", () => {
    const date = new Date(2023, 2, 10, 3, 27);
    const formatted = formatDate(date);

    expect(formatted).toBe("March 10, 2023 - 3h27m AM");
  });

  test("formats date string with PM", () => {
    const date = new Date(2023, 2, 10, 15, 42);
    const formatted = formatDate(date);

    expect(formatted).toBe("March 10, 2023 - 3h42m PM");
  });

  test("formats single digit minute", () => {
    const date = new Date(2023, 2, 10, 11, 5);
    const formatted = formatDate(date);

    expect(formatted).toBe("March 10, 2023 - 11h05m AM");
  });

  test("formats single digit hour", () => {
    const date = new Date(2023, 2, 10, 5, 42);
    const formatted = formatDate(date);

    expect(formatted).toBe("March 10, 2023 - 5h42m AM");
  });
});
