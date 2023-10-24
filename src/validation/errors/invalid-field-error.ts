export class InvalidFieldError extends Error {
  constructor(msg = "Invalid Value") {
    super(msg);
  }
}
