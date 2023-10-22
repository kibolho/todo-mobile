import { getCircularReplacer } from "./circularReplacer";

const BEARER_PATTERN =
  /\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g;
const CREDENTIAL_PATTERN = /[0-9a-fA-F]{36}/g;
const FINGERPRINT_PATTERN =
  /([0-9a-fA-F]{61}|[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{8})/g;

function getExpressions(): RegExp[] {
  return [BEARER_PATTERN, CREDENTIAL_PATTERN, FINGERPRINT_PATTERN];
}

export const hideSensitiveContent = (content: any): any => {
  if (!content || content?.length === 0) return {};

  const expressions = getExpressions();
  let parsedContent = JSON.stringify(content, getCircularReplacer());

  if (!parsedContent) {
    return {};
  }

  for (const expression of expressions) {
    parsedContent = parsedContent.replace(expression, " ******");
  }

  return JSON.parse(parsedContent);
};
