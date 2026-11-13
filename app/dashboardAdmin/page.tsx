"use client";
import { useState, useEffect } from "react";
import { useTurnStore } from "../store/useTurnStore";

export default function DashboardAdmin() {
  const allTurns = useTurnStore((s) => s.turns);

  const [filterDate, setFilterDate] = useState<string>("");
  const [filterTime, setFilterTime] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");

  useEffect(() => {
    console.log("allTurns:", allTurns);
  }, [allTurns]);

  // ← تاریخ‌های یکتا
  const uniqueDates = Array.from(new Set(allTurns.map((t) => t.date)));

  // ← ساعت‌های یکتا
  const uniqueTimes = Array.from(new Set(allTurns.map((t) => t.time)));

  // ← فیلتر
  const filtered = allTurns.filter((t) => {
    if (filterDate && t.date !== filterDate) return false;
    if (filterTime && t.time !== filterTime) return false;
    if (filterName && !t.driverName.includes(filterName)) return false;
    return true;
  });

  const resetFilters = () => {
    setFilterDate("");
    setFilterTime("");
    setFilterName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">همه نوبت‌ها</h1>

          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-[10px] text-gray-500">تعداد کل</p>
            <p className="text-lg font-extrabold text-blue-600">
              {allTurns.length}
            </p>
          </div>
        </div>

        {/* فیلترها */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold text-gray-900">فیلتر</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline font-semibold"
            >
              پاک کردن
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-900">
            <input
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="جستجوی اسم راننده"
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">همه تاریخ‌ها</option>
              {uniqueDates.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value)}
              className="border border-gray-300 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none
               focus:ring-2 focus:ring-blue-400"
            >
              <option value="">همه ساعت‌ها</option>
              {uniqueTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            {filtered.length} نتیجه از {allTurns.length} نوبت
          </p>
        </div>

        {/* لیست */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
          <div className="flex flex-col gap-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                نوبتی با این فیلتر پیدا نشد
              </p>
            ) : (
              filtered
                .slice()
                .reverse()
                .map((turn) => (
                  <div
                    key={turn.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl flex items-center justify-center text-xs font-extrabold shadow-sm">
                        {turn.time}
                      </div>
                      <div>
                        <p className="text-base font-extrabold text-gray-900">
                          {turn.driverName}
                        </p>
                        <p className="text-xs text-gray-500">بارگیری</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600">
                      {turn.date}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}