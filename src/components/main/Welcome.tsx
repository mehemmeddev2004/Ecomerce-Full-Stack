"use client"

import Image from "next/image"
import TextType from "../ui/motion/TextType"
import { useTranslation } from "@/hooks/useTranslation"
import Link from "next/link"

const Welcome = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative w-full aspect-video overflow-hidden h-[97vh]">
      <Image 
        src="/img/Kampaniya.png" 
        alt="Arxa plan" 
        fill 
        className="object-cover" 
        priority
        quality={85}
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-4 sm:left-6 md:left-8 lg:left-10 z-10">
       <Link href={'/products'}>
        <TextType
          text={["Etor"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white"
        />
        <p className="text-xs sm:text-sm md:text-base text-white mt-2 sm:mt-3">
          {t('welcome.greeting')}
        </p>
        <button className="border-white border-2 font-bold text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 mt-3 sm:mt-4 md:mt-5 rounded hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm md:text-base">
          {t('welcome.exploreProducts')}
        </button>
       </Link>
      </div>
    </div>
  )
}

export default Welcome
