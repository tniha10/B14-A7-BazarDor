import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#f4f6ef]">
        <div className="grid items-center gap-6 px-6 py-8 sm:px-8 sm:py-10 md:grid-cols-2 lg:px-10 lg:py-9">

          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-[#64748b] sm:text-base"> আজকের বাজারদর</p>
            <h1 className="mt-2 whitespace-nowrap text-2xl font-bold leading-tight tracking-tight text-[#111827] sm:text-3xl lg:text-[42px]">আজকের বাজারের দাম এক নজরে!</h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#64748b] sm:text-base md:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য
              প্রয়োজনীয় পণ্যের আজকের বাজারদর সহজেই দেখে নিন।
            </p>

            {/* CTA Button */}
            <a href="#সব-পণ্য" className="mt-5 inline-flex items-center rounded-md bg-[#16a34a] px-5 py-2.5 text-sm font-semibold text-white">সব পণ্যের দাম দেখুন
              <span className="ml-2">↓</span>
            </a>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image src="/assets/bazar-hero.png" alt="বাজারের প্রয়োজনীয় পণ্য" width={350} height={260} priority className="h-auto w-[210px] object-contain sm:w-[250px] lg:w-[300px]"/>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;