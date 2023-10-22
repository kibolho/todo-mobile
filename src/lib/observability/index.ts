import { IUser } from "@/domain/models";
import * as Sentry from "sentry-expo";
import { hideSensitiveContent } from "./hideSensitiveContent";

class Observability {
  constructor() {
    if (process.env.NODE_ENV === "production") {
      Sentry.init({
        dsn: "YOUR DSN HERE",
        enableInExpoDevelopment: false,
        debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
      });
    }
  }

  setUser = (user: Partial<IUser>): void => {
    if (process.env.NODE_ENV === "production") {
      Sentry.Native.setUser(hideSensitiveContent(user));
    }
  };

  captureMessage = (title: string, data?: any): void => {
    if (process.env.NODE_ENV === "production") {
      Sentry.Native.addBreadcrumb({
        level: "info",
        type: "user",
        timestamp: new Date().getTime(),
        data: {
          title,
          ...hideSensitiveContent(data),
        },
      });
    }
  };

  captureException = (error: any): void => {
    if (process.env.NODE_ENV === "production") {
      Sentry.Native.captureException(error);
    }
  };
}

export default new Observability();
