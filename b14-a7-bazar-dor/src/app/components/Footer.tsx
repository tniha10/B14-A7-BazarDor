export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e4e7dc] bg-[#fafbf8] dark:border-gray-700 dark:bg-gray-800">
      {/* To line up with the Navbar, replace the classes on the next line with the ones your Navbar's inner wrapper uses. */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs leading-5 text-gray-800 dark:text-gray-200 sm:px-6 md:flex-row md:items-center lg:px-8">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}