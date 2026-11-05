"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {
  const [nationalId, setNationalId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const drivers = useAuthStore((s) => s.drivers);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (): void => {
    setError("");

    if (nationalId.trim() === "" || password.trim() === "") {
      setError("کد ملی و رمز را وارد کنید");
      return;
    }

    const foundDriver = drivers.find(
      (driver) =>
        driver.nationalId === nationalId && driver.password === password
    );

    if (foundDriver) {
      login(foundDriver);
      document.cookie = "token=demo; path=/";
      router.push("/dashboard");
    } else {
      setError("کد ملی یا رمز اشتباه است");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">ورود</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          به سیستم نوبت‌دهی خوش آمدید
        </p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-800 mb-1">کد ملی</label>
            <input
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              type="text"
              inputMode="numeric"
              placeholder="کد ملی خود را وارد کنید"
              className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 mb-1">رمز عبور</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            ورود
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          حساب ندارید؟{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            ثبت‌نام
          </Link>
        </p>
      </div>
    </div>
  );
}