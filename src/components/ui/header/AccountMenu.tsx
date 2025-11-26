"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface AccountMenuProps {
  userInitial: string;
  userData: { email: string; username: string } | null;
  setUserBoxOpen: (val: boolean) => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  userInitial,
  userData,
  setUserBoxOpen,
}) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setUserBoxOpen]);

  if (!userData) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute  right-0 w-72 bg-white border border-gray-200 shadow-xl rounded-lg p-0 z-50 overflow-hidden"
    >
      {/* User Info Section */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full text-sm font-medium">
            {userInitial}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{userData.username}</p>
            <p className="text-gray-600 truncate text-sm">{userData.email}</p>
          </div>
        </div>
      </div>

      <div className="p-2 flex  gap-1">
        <button
          onClick={() => {
            setUserBoxOpen(false);
            localStorage.removeItem("user");
            router.push("/login");
          }}
          className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Hesabdan çıx
        </button>
        <button
          onClick={() => router.push("/account")}
          className="w-full px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 flex items-center justify-end gap-2"
        >
          <img src="/img/user.svg" alt="" className="w-[15px] h-[15px]" /> Hesabim
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
