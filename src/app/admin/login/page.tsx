"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { loginApi } from "@/utils/auth-login";

const AdminPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Login funksiyası
  const loginHandler = async () => {
    if (!email || !password) {
      toast.error("Email və şifrə daxil et!");
      return;
    }

    try {
      const data = await loginApi(email, password);

      // ✅ Token və user yoxla
      if (!data || !data.token || !data.user) {
        console.error("❌ Admin Login: Token və ya user tapılmadı:", data);
        toast.error("Giriş məlumatları düzgün gəlmədi!");
        return;
      }

      // ✅ Rol yoxlaması
      if (data.user.role !== "admin") {
        toast.error(`Sizin rolunuz: ${data.user.role}. Yalnız admin daxil ola bilər!`);
        return;
      }

      // ✅ Token və istifadəçi məlumatını yadda saxla
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Giriş uğurlu oldu!");
      router.push("/admin"); // Admin panelinə yönləndir
    } catch (err: any) {
      console.error("❌ Admin Login xətası:", err);
      toast.error(err.message || "Serverlə əlaqə alınmadı!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-blue-100 mb-4">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Admin Girişi
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Yalnız admin istifadəçiləri daxil ola bilər
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5"><div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
              placeholder="Email daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div><div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifrə
            </label>
            <input
              type="password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
              placeholder="Şifrənizi daxil edin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  loginHandler()
                }
              }}
            />
          </div><button
            onClick={loginHandler}
            className="w-full bg-blue-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Giriş et
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

