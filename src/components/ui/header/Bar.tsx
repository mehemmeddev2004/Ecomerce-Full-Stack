'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories';

interface BarProps {
    onToggle: () => void;
    isOpen: boolean;
}

const Bar: React.FC<BarProps> = ({ onToggle, isOpen }) => {

    const router = useRouter();
    const { data: categories = [] } = useCategories();
    const menuRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [userInitial, setUserInitial] = useState<string>("");
    const [userData, setUserData] = useState<{ email: string; username: string } | null>(null);

    // Load user data from localStorage
    useEffect(() => {
        try {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            
            if (user && token && user !== "undefined" && user !== "null") {
                const parsedUser = JSON.parse(user);
                setUserData(parsedUser);
                setUserInitial(parsedUser.email?.[0]?.toUpperCase() || parsedUser.username?.[0]?.toUpperCase() || "U");
            } else {
                setUserData(null);
                setUserInitial("");
            }
        } catch (err) {
            console.error("User parse error:", err);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUserData(null);
            setUserInitial("");
        }
    }, []);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onToggle();
                setSelectedCategory(null);
            }
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, [isOpen, onToggle]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
       

 
    const selected = categories.find((cat: { id: string; name: string; children: string[] }) => cat.id === selectedCategory);

    return (
        <div>
            <div onClick={onToggle} className="cursor-pointer relative z-50">
                <Image src="/img/bar.svg" alt="Bar" width={20} height={20} />
            </div>
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            <div
                ref={menuRef}
                className={`bg-white w-[300px] max-[768px]:w-[100%] h-full fixed top-0 left-0 z-50 transform transition-transform duration-300 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {selectedCategory === null && (
                    <div className="w-full h-[56px] items-center pl-[20px] pr-[20px] flex justify-between">
                      
                        <h2 className="font-bold text-[30px] uppercase tracking-[1px]">Etor</h2>
                        
                        <div className="flex items-center gap-3">
                            {/* User Icon */}
                            <button
                                onClick={() => {
                                    if (!userData) {
                                        router.push("/login");
                                    } else {
                                        router.push("/account");
                                    }
                                    onToggle();
                                }}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                                aria-label="User account"
                            >
                                {userInitial ? (
                                    <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full text-sm font-medium shadow-sm">
                                        {userInitial}
                                    </span>
                                ) : (
                                    <Image
                                        src="/img/user.svg"
                                        alt="User"
                                        width={20}
                                        height={20}
                                        className="w-[20px] h-[20px]"
                                    />
                                )}
                            </button>
                            
                            <Image src="/img/fa-x.svg" alt="Close" width={16} height={16} onClick={onToggle} className="cursor-pointer" />
                        </div>
                    </div>
                )}

                <div className="w-full pr-[16px] h-full">
                    <div className="w-full bg-white h-full">
                        <div className="w-full pl-[14px] pt-[10px]">
                            {selectedCategory === null ? (
                                <ul className="flex flex-col gap-y-3 px-1 py-2">
                                    {categories.map((item: { id: string; name: string; slug: string; children: string[] }) => (
                                        <li key={item.id} className="w-full">
                                            <Link 
                                                href={`/products?category=${item.slug}`}
                                                onClick={() => {
                                                    onToggle();
                                                    setSelectedCategory(null);
                                                }}
                                                className="flex items-center justify-between w-full"
                                            >
                                                <span className='text-[18px] pt-[3px] text-[#1a1a1a] hover:text-black transition-colors'>{item.name}</span>
                                                <Image
                                                    src="/img/right.svg"
                                                    alt="Arrow"
                                                    width={14}
                                                    height={14}
                                                    className="rotate-[-90deg]"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between h-[40px] gap-2 px-1 py-2">
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className="text-gray-500 hover:text-black text-lg"
                                            aria-label="Back"
                                        >
                                            <Image
                                                src="/img/right.svg"
                                                alt="Arrow"
                                                width={10}
                                                height={10}
                                                className="rotate-[90deg]"
                                            />

                                        </button>
                                        <h3 className="text-lg font-semibold">{selected?.name}</h3>
                                        <Image src="/img/fa-x.svg" alt="Close" width={16} height={16} onClick={onToggle} />

                                    </div>
                                    <ul className="flex flex-col gap-y-2">
                                        {selected?.children.map((child: string, idx: number) => (
                                            <li
                                                key={idx}
                                                className="text-gray-700 hover:text-black cursor-pointer"
                                            >
                                                {child}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bar;
