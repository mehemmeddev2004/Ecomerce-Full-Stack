import { Dispatch, SetStateAction } from 'react'

export interface ProductFilterProps {
  handleFilterChange: boolean
  handleFilterToggle: () => void
  openSections: Record<string, boolean>
  toggleSection: (key: string) => void
  selectedSort: string
  setSelectedSort: (val: string) => void
  checked: boolean[]
  setChecked: Dispatch<SetStateAction<boolean[]>>
  selectedColor: string | null
  setSelectedColor: (name: string | null) => void
  minPrice: number | ""
  maxPrice: number | ""
  onChangeMin: (val: number | "") => void
  onChangeMax: (val: number | "") => void
  onApplyPrice: () => void
  onChangeSelectedCategories?: (ids: Array<string | number>) => void
}

export interface PriceRange {
  min: number | ""
  max: number | ""
}

export interface FilterState {
  categories: Array<string | number>
  colors: string[]
  priceRange: PriceRange
  sort: string
}
