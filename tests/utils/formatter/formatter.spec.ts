import * as formatter from "@/utils/formatter";

describe("Testing formatter util", () => {
  describe("limitText", () => {
    it('should add "..." to text when length more than maxLength', () => {
      const limited = formatter.limitText("This is a big text");
      expect(limited).toBe("This is a b...");
    });

    it("should not limit text when length less than maxLength", () => {
      const limited = formatter.limitText("Small text");
      expect(limited).toBe("Small text");
    });
  });

  describe("onlyNumbers", () => {
    it("should returns empty string when text is empty", () => {
      expect(formatter.onlyNumbers("")).toBe("");
    });

    it("should returns empty string when no numbers in text", () => {
      expect(formatter.onlyNumbers("String without number")).toBe("");
    });

    it("should returns only numbers when text has numbers in text", () => {
      expect(formatter.onlyNumbers("123.456.789")).toBe("123456789");
    });

    it("should returns a float number when withDecimal is true", () => {
      expect(formatter.onlyNumbers("12.354,32", true)).toBe("12354.32");
    });
  });

  describe("capitalize", () => {
    it("should returns empty string", () => {
      expect(formatter.capitalize("")).toBe("");
    });

    it("should returns capitalized string", () => {
      expect(formatter.capitalize("lorem")).toBe("Lorem");
    });

    it("should returns original string when isActive false", () => {
      expect(formatter.capitalize("ipsum", false)).toBe("ipsum");
    });
  });

  describe("removeEspecialChars", () => {
    it("should remove special chars from string", () => {
      const result = formatter.removeEspecialChars("Sp4ci@l ch@rs: !@#!@#!@#");
      expect(result).toBe("Sp4cilchrs");
    });
  });

  describe("removeAccents", () => {
    it("should remove accents from string", () => {
      const result = formatter.removeAccents("áêìõú");
      expect(result).toBe("aeiou");
    });
  });

  describe("showHideText", () => {
    it("should be able to show and hide a text", () => {
      const text = "A cool text to hide";
      const hidden = formatter.showHideText(text, false);
      const showing = formatter.showHideText(text, true);

      expect(hidden).toBe("*******************");
      expect(showing).toBe(text);
    });
  });

  describe("getInitials", () => {
    it("should return empty string when name is empty", () => {
      const initials = formatter.getInitials("");
      expect(initials).toBe("");
    });
    it("should be able to get name initials", () => {
      const name = "Lorem Ipsum da Silva";
      const initials = formatter.getInitials(name);
      expect(initials).toBe("LS");
    });

    it("should be able to get name initials when have only one name", () => {
      const name = "José";
      const initials = formatter.getInitials(name);
      expect(initials).toBe("J");
    });
  });
});
