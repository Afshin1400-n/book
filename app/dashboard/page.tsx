"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useTurnStore } from "../store/useTurnStore";
import { toJalaali } from "jalaali-js";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const addTurn = useTurnStore((s) => s.addTurn);
  const turns = useTurnStore((s) => s.turns);

  const [error, setError] = useState<string>("");
  const [dates, setDates] = useState<{
    today: string;
    tomorrow: string;
    after: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const format = (d: Date) => {
      const j = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
      return `${j.jy}/${j.jm}/${j.jd}`;
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const after = new Date(today);
    after.setDate(today.getDate() + 2);

    setDates({
      today: format(today),
      tomorrow: format(tomorrow),
      after: format(after),
    });
  }, []);

  const times = ["۸-۹", "۹-۱۰", "۱۰-۱۱", "۱۱-۱۲", "۱۲-۱۳", "۱۳-۱۴", "۱۴-۱۵", "۱۵-۱۶"];

  const currentDate =
    selectedDate === 0
      ? dates?.today
      : selectedDate === 1
      ? dates?.tomorrow
      : dates?.after;

  const isBooked = (time: string) =>
    turns.some((t) => t.date === currentDate && t.time === time);

  const handleTurn = () => {
    if (selectedDate === null || selectedTime === null || !currentDate) return;

    const exists = turns.some(
      (t) => t.date === currentDate && t.time === selectedTime
    );

    if (exists) {
      setError("این زمان قبلاً رزرو شده");
      return;
    }

    setError("");

    addTurn({
      id: Date.now(),
      driverId: user?.id ?? 0,
      driverName: user?.name ?? "",
      date: currentDate,
      time: selectedTime,
    });
  };

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
            <p className="text-2xl font-bold text-gray-900">
              {turns.filter((t) => t.driverId === user?.id).length}
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">امروز</p>
            <p className="text-2xl font-bold text-gray-900">
              {turns.filter((t) => t.date === dates?.today).length}
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">کل</p>
            <p className="text-2xl font-bold text-gray-900">{turns.length}</p>
          </div>
        </div>

        {/* رزرو */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <h2 className="text-base font-bold text-gray-900 mb-3">رزرو نوبت</h2>

          <p className="text-sm text-gray-500 mb-2">تاریخ</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              onClick={() => setSelectedDate(0)}
              className={`p-2 rounded-lg border transition text-center ${
                selectedDate === 0
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <p className="text-xs text-gray-500">امروز</p>
              <p className="text-base font-bold text-gray-900">{dates?.today ?? "—"}</p>
            </button>

            <button
              onClick={() => setSelectedDate(1)}
              className={`p-2 rounded-lg border transition text-center ${
                selectedDate === 1
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <p className="text-xs text-gray-500">فردا</p>
              <p className="text-base font-bold text-gray-900">{dates?.tomorrow ?? "—"}</p>
            </button>

            <button
              onClick={() => setSelectedDate(2)}
              className={`p-2 rounded-lg border transition text-center ${
                selectedDate === 2
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <p className="text-xs text-gray-500">پس‌فردا</p>
              <p className="text-base font-bold text-gray-900">{dates?.after ?? "—"}</p>
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-2">ساعت</p>
          <div className="grid grid-cols-4 gap-2">
            {times.map((t) => {
              const booked = isBooked(t);

              return (
                <button
                  key={t}
                  disabled={booked}
                  onClick={() => setSelectedTime(t)}
                  className={`p-2 rounded-lg border text-sm font-medium transition ${
                    booked
                      ? "bg-green-300 text-gray-900 cursor-not-allowed line-through"
                      : selectedTime === t
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-900 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {error && (
            <p className="mt-3 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleTurn}
            disabled={selectedDate === null || selectedTime === null}
            className={`w-full mt-4 py-2 rounded-lg text-base font-medium transition ${
              selectedDate !== null && selectedTime !== null
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            ثبت نوبت
          </button>
        </div>

        {/* لیست نوبت‌ها */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-base font-bold text-gray-900 mb-3">نوبت‌های ثبت‌شده</h2>

          <div className="flex flex-col gap-2">
            {turns.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                هنوز نوبتی ثبت نشده
              </p>
            ) : (
              turns
                .slice()
                .reverse()
                .map((turn) => (
                  <div
                    key={turn.id}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">
                        {turn.time}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {turn.driverName}
                        </p>
                        <p className="text-xs text-gray-500">بارگیری</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{turn.date}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}