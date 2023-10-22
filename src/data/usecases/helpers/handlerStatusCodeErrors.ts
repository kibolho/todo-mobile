import { IRemoteError } from "@/data/models";

import { HttpResponse, HttpStatusCode } from "@/data/protocols";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import Observability from "@/lib/observability";

export const handlerStatusCodeErrors = (
  httpResponse: HttpResponse<IRemoteError | any>
): never => {
  switch (httpResponse.statusCode) {
    case HttpStatusCode.unauthorized:
    case HttpStatusCode.forbidden:
      throw new AccessDeniedError();
    default: {
      Observability.captureException({
        name: "handlerStatusCodeErrors",
        httpResponse,
      });
      const title = httpResponse.body?.title as string | undefined;
      const message = httpResponse.body?.message as string | undefined;
      let fullMessage: string | undefined = title ?? message;
      if (
        !!httpResponse.body &&
        "title" in httpResponse.body &&
        "message" in httpResponse.body
      ) {
        fullMessage = `${title} ${message}`;
      }
      throw new UnexpectedError(fullMessage);
    }
  }
};
