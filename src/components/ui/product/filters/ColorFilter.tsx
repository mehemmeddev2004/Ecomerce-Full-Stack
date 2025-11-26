"use client"
import React from 'react';

export interface ColorOption {
  color: string; // tailwind bg class
  name: string;
}

export interface ColorFilterProps {
  colors?: ColorOption[];
  selectedColor?: string | null; // name of selected color
  onSelectColor: (name: string) => void;
}

const defaultColors: ColorOption[] = [
  { color: "bg-red-500", name: "Red" },
  { color: "bg-blue-500", name: "Blue" },
  { color: "bg-green-500", name: "Green" },
  { color: "bg-yellow-500", name: "Yellow" },
  { color: "bg-purple-500", name: "Purple" },
  { color: "bg-black", name: "Black" },
];

const ColorFilter: React.FC<ColorFilterProps> = ({
  colors = defaultColors,
  selectedColor = null,
  onSelectColor,
}) => {
  return (
    <div className="flex gap-3">
      {colors.map((option) => (
        <button
          key={option.name}
          onClick={() => onSelectColor(option.name)}
          className={`w-8 h-8 ${option.color} rounded-full border-2 transition-colors ${
            selectedColor === option.name ? 'border-black' : 'border-gray-300 hover:border-gray-400'
          }`}
          title={option.name}
          aria-label={`Select ${option.name}`}
        />
      ))}
    </div>
  );
};

export default ColorFilter;
