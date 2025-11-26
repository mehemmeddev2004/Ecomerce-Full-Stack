"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  id: string;
  name: string;
  price: number | string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  size?: string;
  color?: string;
  image?: string;
  stock?: number;
  specs?: {
    id: number;
    key: string;
    name: string;
    productId: number;
    values: {
      id: number;
      key: string;
      value: string;
      productSpecId: number;
    }[];
  }[];
};

const AddToCartButton: React.FC<Props> = ({ 
  id, 
  name, 
  price, 
  className, 
  children,
  disabled = false,
  size,
  color,
  image,
  stock,
  specs
}) => {
  const { t } = useTranslation();
  const { addItem, items } = useCart();
  const router = useRouter();

  const onClick = () => {
    // Login yoxlaması
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token || user === "undefined" || user === "null") {
      // İstifadəçi login olmayıb - login səhifəsinə yönləndir
      router.push("/login");
      return;
    }

    // Eyni məhsul və ölçü artıq səbətdə varsa, əlavə etmə
    const existingItem = items.find(
      (item) => item.id === id && item.size === size
    );

    if (existingItem) {
      // Məhsul artıq səbətdə var
      return;
    }

    // İstifadəçi login olub - məhsulu səbətə əlavə et
    addItem({
      id,
      name,
      price: typeof price === "string" ? parseFloat(price) : price,
      quantity: 1,
      size,
      color,
      image,
      stock,
      specs
    });
  };

  return (
    <button 
      onClick={onClick} 
      className={className} 
      type="button"
      disabled={disabled}
    >
      {children ?? <span>{t('product.addToCart')}</span>}
    </button>
  );
};

export default AddToCartButton;
