import { LoginPage } from "@/presentation/pages";
import React from "react";
import { makeLoginValidation } from "../factories/validation";

export default function SignIn() {
  return <LoginPage validation={makeLoginValidation()} />;
}
