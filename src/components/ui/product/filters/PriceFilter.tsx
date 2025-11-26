"use client"
import React from 'react';

export interface PriceFilterProps {
  minPrice: number | "";
  maxPrice: number | "";
  onChangeMin: (val: number | "") => void;
  onChangeMax: (val: number | "") => void;
  onApply?: () => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onChangeMin,
  onChangeMax,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">Min Price</label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => {
              const v = e.target.value;
              onChangeMin(v === '' ? '' : Number(v));
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">Max Price</label>
          <input
            type="number"
            placeholder="3000"
            value={maxPrice}
            onChange={(e) => {
              let v = e.target.value;
              // maksimum 3000 yoxlaması
              let num: number | "" = v === '' ? '' : Number(v);
              if (typeof num === "number" && num > 3000) num = 3000;
              onChangeMax(num);
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
