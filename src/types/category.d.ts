
export type LocalizedText = {
  az: string;
  en: string;
  ru: string;
};

// Məhsul tipi
export type category = {
  id: string;
  name: string | LocalizedText;
  slug: string;
  imageUrl?: string;
  parentId?: string;
};