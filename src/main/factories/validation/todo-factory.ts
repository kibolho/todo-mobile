import { ValidationComposite } from "@/main/composites";
import { ValidationBuilder as Builder } from "@/main/builders";

export const makeTodoValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field("title").required().min(3).build(),
  ]);
