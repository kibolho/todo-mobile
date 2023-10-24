import { RegisterPage } from "@/presentation/pages";
import React from "react";
import { makeLoginValidation } from "../factories/validation";

export default function SignUp() {
  return <RegisterPage validation={makeLoginValidation()} />;
}
