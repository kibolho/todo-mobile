export class UnexpectedError extends Error {
  object?: any;
  constructor(
    msg = "Something wrong happened. Please try again soon.",
    object = {}
  ) {
    super(msg);
    this.name = "UnexpectedError";
    this.object = object;
  }
}
