export interface FormatterUtils {
  limitText: (text: string, maxLength: number) => string;
  onlyNumbers: (text?: string | null, withDecimal?: boolean) => string;
  capitalize: (str: string, isActive?: boolean) => string;
  removeEspecialChars: (value: string) => string;
  removeAccents: (value: string) => string;
  showHideText: (textToHide: string, show: boolean) => string;

  toPlural: (
    value: any[] | number,
    singularWord: string,
    pluralWord: string
  ) => string;

  toPluralWithQuantity: (
    value: any[] | number,
    singularWord: string,
    pluralWord: string,
    stringToBeReplacedByQuantity?: string | undefined
  ) => string;

  getInitials: (name: string) => string;
  removeInitialFinalSpaces: (text?: string | undefined) => string;
  formatCardholderName: (string?: string | undefined) => string;
}
