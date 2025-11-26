export enum ProductTab {
  DESCRIPTION = 'Description',
  SIZING = 'Sizing',
  SHIPPING = 'Shipping',
  RETURNS = 'Returns'
}

export enum ProductSpecKey {
  COLOR = 'color',
  SIZE = 'size'
}

export enum BadgePosition {
  TOP_LEFT = 'top-2 left-2',
  TOP_RIGHT = 'top-2 right-2'
}

export enum BadgeType {
  NEW = 'new',
  DISCOUNT = 'discount'
}

export const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
  blue: '#0000FF',
  green: '#00FF00',
  yellow: '#FFFF00',
  purple: '#A855F7',
  pink: '#EC4899',
  gray: '#6B7280',
  grey: '#6B7280',
  brown: '#92400E',
  beige: '#D4C5B9',
  navy: '#1E3A8A',
  orange: '#F97316',
}

export const PRODUCT_CONSTANTS = {
  MAX_COLORS_DISPLAY: 4,
  DEFAULT_COLOR: '#f3f4f6',
  PRICE_SUFFIX: 'AZN',
  LATEST_DAYS: 7,
  DISCOUNT_PRECISION: 2
} as const

export const BADGE_STYLES = {
  [BadgeType.NEW]: 'bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded',
  [BadgeType.DISCOUNT]: 'bg-black text-white text-xs font-semibold px-2 py-1 rounded'
} as const
