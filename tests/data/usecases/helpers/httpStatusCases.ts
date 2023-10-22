import { HttpStatusCode } from "@/data/protocols";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";

type IHttpStatusCasesParams = {
  errorForSuccessWithoutBody?: Error | null;
  skip404Error?: boolean;
};

type IHttpStatusCases = Array<{
  code: HttpStatusCode;
  CustomError: Error;
  body: any;
}>;

export const httpStatusCases = ({
  errorForSuccessWithoutBody = new UnexpectedError(),
  skip404Error = false,
}: IHttpStatusCasesParams): IHttpStatusCases => {
  const array = [
    {
      code: HttpStatusCode.badRequest,
      CustomError: new UnexpectedError(),
      body: undefined,
    },
    {
      code: HttpStatusCode.serverError,
      CustomError: new UnexpectedError("title_error"),
      body: {
        title: "title_error",
      },
    },
    {
      code: HttpStatusCode.forbidden,
      CustomError: new AccessDeniedError(),
      body: undefined,
    },
    {
      code: HttpStatusCode.unauthorized,
      CustomError: new AccessDeniedError(),
      body: undefined,
    },
  ];
  if (errorForSuccessWithoutBody !== null) {
    array.push({
      code: HttpStatusCode.ok,
      CustomError: errorForSuccessWithoutBody,
      body: undefined,
    });
  }
  if (skip404Error) {
    return array;
  }
  array.push({
    code: HttpStatusCode.notFound,
    CustomError: new UnexpectedError("title error"),
    body: {
      title: "title",
      message: "error",
    },
  });
  return array;
};
