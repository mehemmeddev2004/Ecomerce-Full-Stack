

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { ToastContainer, toast } from "react-toastify";
import { registerApi } from "@/utils/auth-register";
import { loginApi } from "@/utils/auth-login";
import { useTranslation } from "@/hooks/useTranslation";

const AuthPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("user");

const loginHandler = async () => {
  if (!email || !password) return toast.error(t("auth.enterEmailPassword"));
  try {
    const data = await loginApi(email, password);
    
    // Token və user yoxla
    if (!data || !data.token || !data.user) {
      console.error("❌ Token və ya user tapılmadı:", data);
      return toast.error("Giriş məlumatları düzgün gəlmədi");
    }
    
    if (data.user.role !== "admin") return toast.error(t("pages.onlyAdminCanLogin"));
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    toast.success(t("auth.loginSuccess"));
    router.push("/");
  } catch (err: any) {
    console.error("❌ Login xətası:", err);
    toast.error(err.message || t("pages.serverConnectionFailed"));
  }
};

// Register
const registerHandler = async () => {
  if (!username || !email || !password) return toast.error(t("auth.fillAllFields"));
  try {
    const data = await registerApi(email, password, username, username, role);
    
    // Token və user yoxla
    if (!data || !data.token || !data.user) {
      console.error("❌ Register: Token və ya user tapılmadı:", data);
      return toast.error("Qeydiyyat məlumatları düzgün gəlmədi");
    }
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    toast.success(t("auth.registerSuccess"));
    router.push("/");
    setIsRegister(false);
  } catch (err: any) {
    console.error("❌ Register xətası:", err);
    toast.error(err.message || t("pages.serverConnectionFailed"));
  }
};
  return (
    <div className="flex h-[80vh] items-center justify-center p-4 bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isRegister ? t("common.register") : t("common.login")}
          </h2>
          <p className="text-gray-600">
            {isRegister ? t("pages.createNewAccount") : t("pages.loginToAccount")}
          </p>
        </div>

        <div className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pages.name")}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder={t("pages.enterName")}
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              
           
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("auth.email")}</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder={t("pages.enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("auth.password")}</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder={t("pages.enterPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="text-[#7e7e7edd] text-[10px] hover:underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? t("pages.alreadyHaveAccount") : t("pages.noAccount")}
            </button>
          </div>

          <button
            onClick={isRegister ? registerHandler : loginHandler}
            className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isRegister ? t("common.register") : t("common.login")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
