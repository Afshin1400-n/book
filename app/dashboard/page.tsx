"use client";
import { useAuthStore } from "../store/useAuthStore";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">داشبورد</h1>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
              {user?.name?.[0] ?? "؟"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {user?.name ?? "کاربر"}
              </p>
              <p className="text-xs text-gray-500 leading-tight">راننده</p>
            </div>
          </div>
        </div>

        {/* آمار */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">نوبت‌های من</p>
            <p className="text-2xl font-bold text-gray-900">۳</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">امروز</p>
            <p className="text-2xl font-bold text-gray-900">۱</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">این هفته</p>
            <p className="text-2xl font-bold text-gray-900">۲</p>
          </div>
        </div>

        {/* رزرو */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <h2 className="text-base font-bold text-gray-900 mb-3">رزرو نوبت</h2>

          <p className="text-sm text-gray-500 mb-2">تاریخ</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button className="p-2 rounded-lg border border-blue-500 bg-blue-50 text-blue-700 transition text-center">
              <p className="text-xs">امروز</p>
              <p className="text-base font-bold">۱۲</p>
            </button>
            <button className="p-2 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-center">
              <p className="text-xs text-gray-500">فردا</p>
              <p className="text-base font-bold text-gray-900">۱۳</p>
            </button>
            <button className="p-2 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-center">
              <p className="text-xs text-gray-500">پس‌فردا</p>
              <p className="text-base font-bold text-gray-900">۱۴</p>
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-2">ساعت</p>
          <div className="grid grid-cols-4 gap-2">
            {["۸-۹", "۹-۱۰", "۱۰-۱۱", "۱۱-۱۲", "۱۲-۱۳", "۱۳-۱۴", "۱۴-۱۵", "۱۵-۱۶"].map(
              (t, i) => (
                <button
                  key={t}
                  className={`p-2 rounded-lg border text-sm font-medium transition ${
                    i === 2
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-900 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-base font-medium transition">
            ثبت نوبت
          </button>
        </div>

        {/* لیست */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-base font-bold text-gray-900 mb-3">نوبت‌های ثبت‌شده</h2>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">
                  ۱۰:۳۰
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name ?? "راننده"}</p>
                  <p className="text-xs text-gray-500">بارگیری</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">۱۲ آبان</span>
            </div>

            <div className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">
                  ۱۴:۰۰
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name ?? "راننده"}</p>
                  <p className="text-xs text-gray-500">بارگیری</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">۱۳ آبان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}