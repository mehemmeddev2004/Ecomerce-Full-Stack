const IS_SERVER = typeof window === "undefined";

export const getToken = (): string | null => {
  if (IS_SERVER) return null;
  return localStorage.getItem("token");
};

export const createHeaders = (includeAuth = true): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const safeJsonParse = async (response: Response): Promise<any> => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("❌ JSON parse error:", error);
    throw new Error("Backend server xətası - JSON cavab gözlənilirdi");
  }
};

export const normalizeToArray = <T>(data: any): T[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") return [data];
  return [];
};

export const handleFetchError = async (response: Response): Promise<never> => {
  const errorData = await response.json().catch(() => ({}));
  const message = errorData.message || `Request failed: ${response.status}`;
  throw new Error(Array.isArray(message) ? message.join(", ") : String(message));
};

export const fetchApi = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    headers: { ...createHeaders(), ...options.headers },
    ...(IS_SERVER && { cache: "no-store" }),
  });

  if (!response.ok) await handleFetchError(response);
  return response.json();
};

