"use client"
import Link from "next/link"
import { Instagram, Facebook, Phone, MapPin } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-black text-white min-h-[400px]">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Section */}
            <div className="flex flex-col gap-5 lg:col-span-1">
              <div>
                <h2 className="font-bold text-3xl lg:text-4xl tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  ETOR
                </h2>
              </div>
              <div>
                <p className="text-slate-300 font-light leading-relaxed text-sm lg:text-base">
                  {t("footer.brandDescription")}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-100 font-semibold text-lg tracking-wide uppercase text-sm">{t("footer.contactInfo")}</h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  <a href="tel:+994506486024" className="text-sm lg:text-base">
                    +994 050 648 60 24
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm lg:text-base">12 Ələsgər Ələkbərov Küçəsi, Bakı</span>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-100 font-semibold text-lg tracking-wide uppercase text-sm">{t("footer.followUs")}</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
                    <span className="text-sm lg:text-base">Instagram</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Facebook className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm lg:text-base">Facebook</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-100 font-semibold text-lg tracking-wide uppercase text-sm">{t("footer.quickLinks")}</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base">
                    {t("footer.aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base">
                    {t("footer.collections")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base">
                    {t("footer.contact")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-slate-800">
              <div className="aspect-video lg:aspect-[21/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12159.177850178274!2d49.79992799415671!3d40.36908158552193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dc414e86b6d%3A0xa3bbcc2931635009!2zMTIgxo9syZlzZ8mZciDGj2zJmWtiyZlyb3YgS8O8w6fJmXNpLCBCYWvEsQ!5e0!3m2!1str!2saz!4v1760019299098!5m2!1str!2saz"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} ETOR. {t("footer.allRightsReserved")}.
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  {t("footer.privacyPolicy")}
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  {t("footer.termsOfService")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
