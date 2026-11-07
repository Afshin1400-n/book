"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { useTurnStore } from "../store/useTurnStore";
import { toJalaali } from "jalaali-js";

const MAX_CAPACITY = 10;

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const addTurn = useTurnStore((s) => s.addTurn);
  const allTurns = useTurnStore((s) => s.turns);

  const router = useRouter();

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

  const myTurns = user?.id
    ? allTurns.filter((t) => t.driverId === user.id)
    : [];

  const isBooked = (time: string) =>
    allTurns.some((t) => t.date === currentDate && t.time === time);

  const isBookedByMe = (time: string) =>
    allTurns.some(
      (t) => t.date === currentDate && t.time === time && t.driverId === user?.id
    );

  const countBooked = (time: string) =>
    allTurns.filter((t) => t.date === currentDate && t.time === time).length;

  const isFull = (time: string) => countBooked(time) >= MAX_CAPACITY;

  const handleTurn = () => {
    if (selectedDate === null || selectedTime === null || !currentDate) return;

    if (isFull(selectedTime)) {
      setError("ظرفیت این زمان پر شده");
      return;
    }

    const alreadyMine = allTurns.some(
      (t) =>
        t.date === currentDate &&
        t.time === selectedTime &&
        t.driverId === user?.id
    );

    if (alreadyMine) {
      setError("شما قبلاً این زمان را رزرو کرده‌اید");
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

  const handleLogout = () => {
    logout();
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <h1 className="text-2xl font-extrabold text-gray-900">داشبورد</h1>

          {/* آمار */}
          <div className="flex gap-2">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-200 text-center">
<              p className="text-sm text-gray-500 mb-1">نوبت‌های امروز</p>
              <p className="text-lg font-extrabold text-blue-600">
                {myTurns.filter((t) => t.date === dates?.today).length}
              </p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-200 text-center">
               <p className="text-sm text-gray-500 mb-1">نوبت‌های امروز</p>
              <p className="text-lg font-extrabold text-gray-900">
                {myTurns.length}
              </p>
            </div>
          </div>

          {/* پروفایل + خروج */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.[0] ?? "؟"}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">
                  {user?.name ?? "کاربر"}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">راننده</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition"
            >
              خروج
            </button>
          </div>
        </div>

        {/* رزرو */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 mb-5">
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">رزرو نوبت</h2>

          <p className="text-sm font-semibold text-gray-600 mb-2">تاریخ</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setSelectedDate(0)}
              className={`p-2 rounded-xl border-2 transition text-center ${
                selectedDate === 0
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <p className="text-xs font-medium text-gray-500">امروز</p>
              <p className="text-base font-extrabold text-gray-900">{dates?.today ?? "—"}</p>
            </button>

            <button
              onClick={() => setSelectedDate(1)}
              className={`p-2 rounded-xl border-2 transition text-center ${
                selectedDate === 1
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <p className="text-xs font-medium text-gray-500">فردا</p>
              <p className="text-base font-extrabold text-gray-900">{dates?.tomorrow ?? "—"}</p>
            </button>

            <button
              onClick={() => setSelectedDate(2)}
              className={`p-2 rounded-xl border-2 transition text-center ${
                selectedDate === 2
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <p className="text-xs font-medium text-gray-500">پس‌فردا</p>
              <p className="text-base font-extrabold text-gray-900">{dates?.after ?? "—"}</p>
            </button>
          </div>

          <p className="text-sm font-semibold text-gray-600 mb-2">ساعت</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {times.map((t) => {
              const booked = isBooked(t);
              const bookedByMe = isBookedByMe(t);
              const full = isFull(t);
              const count = countBooked(t);

              return (
                <button
                  key={t}
                  disabled={bookedByMe || full}
                  onClick={() => setSelectedTime(t)}
                  className={`p-2 rounded-xl border-2 text-sm font-bold transition ${
                    full
                      ? "bg-red-300 border-red-300 text-gray-900 cursor-not-allowed line-through"
                      : bookedByMe
                      ? "bg-green-300 border-green-300 text-gray-900 cursor-not-allowed line-through"
                      : booked
                      ? "bg-yellow-200 border-yellow-200 text-gray-900 hover:bg-yellow-300"
                      : selectedTime === t
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-gray-200 text-gray-900 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {t}
                  <span className="block text-[10px] font-semibold text-gray-600">
                    {count}/{MAX_CAPACITY}
                  </span>
                </button>
              );
            })}
          </div>

          {error && (
            <p className="mt-3 text-red-600 text-sm font-semibold bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleTurn}
            disabled={selectedDate === null || selectedTime === null}
            className={`w-full mt-4 py-2.5 rounded-xl text-base font-extrabold transition ${
              selectedDate !== null && selectedTime !== null
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            ثبت نوبت
          </button>
        </div>

        {/* لیست نوبت‌های من */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">نوبت‌های من</h2>

          <div className="flex flex-col gap-2">
            {myTurns.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                هنوز نوبتی ثبت نکردی
              </p>
            ) : (
              myTurns
                .slice()
                .reverse()
                .map((turn) => (
                  <div
                    key={turn.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl flex items-center justify-center text-xs font-extrabold shadow-sm">
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