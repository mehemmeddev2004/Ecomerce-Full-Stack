import { TranslatedField } from "@/types/product";

export function parseField(field: string | TranslatedField | undefined): string | TranslatedField {
  if (!field) return "";
  if (typeof field === "object") return field;
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      if (typeof parsed === "object" && (parsed.az || parsed.en || parsed.ru)) {
        return parsed as TranslatedField;
      }
    } catch {}
    return field;
  }
  return "";
}

export function getTranslated(
  field: string | TranslatedField | undefined,
  locale: "az" | "en" | "ru"
): string {
  if (!field) return "";
  const parsedField = parseField(field);
  if (typeof parsedField === "string") return parsedField;
  return parsedField[locale] || parsedField.az || parsedField.en || parsedField.ru || "";
}

export function isTranslatedField(field: any): field is TranslatedField {
  return typeof field === "object" && field !== null && 
    (field.az !== undefined || field.en !== undefined || field.ru !== undefined);
}
