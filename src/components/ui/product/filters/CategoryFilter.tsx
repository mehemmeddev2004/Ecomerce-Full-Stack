"use client"
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { fetchCategories } from "@/utils/fetchCategories";
import { useTranslation } from "@/contexts/LocaleContext";

export interface CategoryFilterProps {
  checked: boolean[];
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  // New: bubble up selected category IDs when selection changes
  onChangeSelected?: (ids: Array<string | number>) => void;
  // New: allow single select mode (default true)
  singleSelect?: boolean;
}

interface LocalizedText {
  az: string;
  en: string;
  ru: string;
}

interface Category {
  id: string | number;
  name: string | LocalizedText;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  checked,
  setChecked,
  onChangeSelected,
  singleSelect = true,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { locale } = useTranslation();

  // Helper function to get localized category name
  const getLocalizedName = (category: Category): string => {
    if (typeof category.name === 'string') return category.name;
    return category.name[locale] || category.name.az || '';
  };

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  // Ensure checked length matches categories length
  useEffect(() => {
    if (categories.length === 0) return;
    if (checked.length !== categories.length) {
      const next = Array(categories.length).fill(false) as boolean[];
      setChecked(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  const toggleChecked = (idx: number) => {
    setChecked((prev) => {
      let newChecked = [...prev];
      if (singleSelect) {
        newChecked = Array(categories.length).fill(false) as boolean[];
        newChecked[idx] = true;
      } else {
        newChecked[idx] = !newChecked[idx];
      }
      // notify parent with selected category IDs
      if (onChangeSelected) {
        const selectedIds = categories
          .filter((_, i) => newChecked[i])
          .map((c) => c.id);
        onChangeSelected(selectedIds);
      }
      return newChecked;
    });
  };

  return (
    <div className="space-y-2">
      {categories.map((cat, idx) => (
        <div
          key={cat.id}
          className="flex items-center text-sm cursor-pointer p-1 rounded"
          onClick={() => toggleChecked(idx)}
        >
          <div
            className={`w-5 h-5 rounded transition-colors flex items-center justify-center pointer-events-none ${
              checked[idx] ? "bg-black border-none" : "bg-white border-2 border-gray-300"
            }`}
          />
          <span className="ml-2 text-gray-700">{getLocalizedName(cat)}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
