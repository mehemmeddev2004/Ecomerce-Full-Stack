import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-semibold">Səhifə tapılmadı</h1>
      <p className="text-gray-600">Axtardığınız məhsul mövcud deyil və ya silinib.</p>
      <Link
        href="/"
        className="mt-2 px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
      >
        Ana Sehifeye Qayit
      </Link>
    </div>
  );
}
