"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [nationalId, setNationalId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const register = useAuthStore((s) => s.register);
  const drivers = useAuthStore((s) => s.drivers);
  const router = useRouter();

  const handleSubmit = (): void => {
    setError("");

    if (
      name.trim() === "" ||
      nationalId.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("همه‌ی فیلدها را پر کنید");
      return;
    }

    if (!/^\d{10}$/.test(nationalId)) {
      setError("کد ملی باید ۱۰ رقم باشد");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمزها یکسان نیستند");
      return;
    }

    if (drivers.some((d) => d.nationalId === nationalId)) {
      setError("این کد ملی قبلاً ثبت شده است");
      return;
    }

    register({
      id: Date.now(),
      name,
      nationalId,
      password,
    });

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">ثبت‌نام</h1>
        <p className="text-sm text-gray-600 text-center mb-6">حساب جدید بسازید</p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-800 mb-1">نام و نام خانوادگی</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="علی رضایی"
              className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 mb-1">کد ملی</label>
            <input
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              type="text"
              inputMode="numeric"
              placeholder="کد ملی را وارد کنید ..."
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

          <div>
            <label className="block text-sm text-gray-800 mb-1">تکرار رمز عبور</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            ثبت‌نام
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          حساب دارید؟{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}