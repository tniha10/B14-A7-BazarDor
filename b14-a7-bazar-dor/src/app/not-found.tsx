import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-emerald-600">৪০৪</p>
      <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}