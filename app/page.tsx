"use client"
import Link from "next/link";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <span className="inline-block bg-blue-100 text-blue-700 text-lg font-semibold px-3 py-1 rounded-full mb-6">
            سیستم نوبت‌دهی آنلاین بارگیری
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          شرکت تولیدی صنعتی فولادیار کوروش
        </h1>
        <p className="text-gray-600 max-w-lg mb-8">
          رزرو نوبت آنلاین، سریع و آسان. همین حالا نوبت خود را رزرو کنید.
        </p>
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition"
        >
          رزرو نوبت
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="font-bold text-gray-800 mb-2">سریع</h2>
          <p className="text-sm text-gray-600">در چند ثانیه نوبت بگیرید</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="font-bold text-gray-800 mb-2">آسان</h2>
          <p className="text-sm text-gray-600">رابط کاربری ساده و روان</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="font-bold text-gray-800 mb-2">مطمئن</h2>
          <p className="text-sm text-gray-600">مدیریت دقیق نوبت‌ها</p>
        </div>
      </section>
    </div>
  );
}