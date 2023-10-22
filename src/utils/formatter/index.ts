/**
 * Add ... to text if pass the length
 * @param text
 * @param maxLength
 */
export function limitText(text: string, maxLength = 12): string {
  return text?.length > maxLength ? text.slice(0, maxLength - 1) + "..." : text;
}

export function onlyNumbers(
  text: string | null = "",
  withDecimal = false
): string {
  if (!text) return "";

  if (withDecimal) {
    return text.replace(/\./g, "").replace(",", ".");
  }

  return text.replace(/[^\d]/g, "");
}

export function capitalize(str: string, isActive = true): string {
  if (!str) return "";
  if (!isActive) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function removeEspecialChars(value: string): string {
  return value.normalize("NFD").replace(/[^a-zA-Zs0-9_.]/g, "");
}

export function removeAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const showHideText = (textToHide: string, show: boolean): string => {
  return show ? textToHide : "*".repeat(textToHide.length);
};

export function getInitials(name: string): string {
  const nameSplit = name.split(" ");
  let nameInitials = "";

  nameSplit.forEach((element: string, index) => {
    const isFirstName = index === 0;
    const isLastName = index === nameSplit.length - 1;
    if (isFirstName || isLastName) {
      nameInitials += element.substring(0, 1).toUpperCase();
    }
  });

  return nameInitials;
}
