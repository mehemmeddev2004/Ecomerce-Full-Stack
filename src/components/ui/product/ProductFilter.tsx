"use client"
import React from 'react'
import { useTranslation } from "@/contexts/LocaleContext"
import { SortFilter } from "./filters"
import { CategoryFilter } from "./filters"
import { ColorFilter } from "./filters"
import { PriceFilter } from "./filters"
import type { ProductFilterProps } from "@/types/filters"

const ProductFilter: React.FC<ProductFilterProps> = ({
  handleFilterChange,
  handleFilterToggle,
  openSections,
  toggleSection,
  selectedSort,
  setSelectedSort,
  checked,
  setChecked,
  selectedColor,
  setSelectedColor,
  minPrice,
  maxPrice,
  onChangeMin,
  onChangeMax,
  onApplyPrice,
  onChangeSelectedCategories,
}) => {
  const { t } = useTranslation();
  
  return (
    <div>
      {handleFilterChange && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={handleFilterToggle} />}

      <div
        className={`fixed top-0 right-0  w-[500px] max-[991px]:w-full h-full bg-white shadow-xl overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out ${
          handleFilterChange ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 bg-white px-4 py-4 flex justify-between items-center">
          <div>
            <h2>{t("filter.filterSort")}</h2>
          </div>
          <button
            onClick={handleFilterToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="w-4 h-4">
              <polygon
                points="34.56 2.56 32.44 .44 17.5 15.38 2.56 .44 .44 2.56 15.38 17.5 .44 32.44 2.56 34.56 17.5 19.62 32.44 34.56 34.56 32.44 19.62 17.5 34.56 2.56"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 py-2">
          {(["sort", "category", "color", "price"] as const).map((section) => (
            <div key={section} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleSection(section)}
                className="flex justify-between items-center w-full py-4 text-left cursor-pointer"
              >
                <span className="text-sm font-medium uppercase tracking-wide text-gray-700">{t(`filter.${section}`)}</span>
                <span className="text-xl font-light text-gray-400 transition-transform duration-200">
                  {openSections[section] ? "−" : "+"}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openSections[section] ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <div className="space-y-3">
                  {section === "sort" && (
                    <SortFilter selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
                  )}
                  {section === "category" && (
                    <CategoryFilter checked={checked} setChecked={setChecked} onChangeSelected={onChangeSelectedCategories} />
                  )}
                  {section === "color" && (
                    <ColorFilter selectedColor={selectedColor} onSelectColor={(name) => setSelectedColor(name)} />
                  )}
                  {section === "price" && (
                    <PriceFilter
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      onChangeMin={onChangeMin}
                      onChangeMax={onChangeMax}
                      onApply={onApplyPrice}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
