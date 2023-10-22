import { LoginPage } from "@/presentation/pages";
import React from "react";
import { makeRemoteAuthentication } from "../factories/usecases";
import { makeLoginValidation } from "../factories/validation";

export default function SignIn() {
  return (
    <LoginPage
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
}
